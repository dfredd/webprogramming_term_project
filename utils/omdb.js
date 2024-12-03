/**
 * IMDb, Rotten Tomatoes, Metacritic 평점에 대한 정규화 및 가중치가 적용된 평점 평균 값을 반환하는 함수.
 * @param {*} ratings OMDB API의 Ratings 배열
 * @returns 각 평점 Source에 대하여 가중치가 적용된 평점 평균 값.
 */
export function normalizeRatings(ratings) {
    let totalWeight = 0;
    let weightedSum = 0;

    ratings.forEach(rating => {
        let value = 0;
        let weight = 1;

        if (rating.Source === "Internet Movie Database") {
            // IMDb 평점은 10점 만점이므로 그대로 사용
            value = parseFloat(rating.Value.split('/')[0]);
            weight = 1;
        } else if (rating.Source === "Rotten Tomatoes") {
            // Rotten Tomatoes 평점은 퍼센트이므로 10점 만점으로 변환
            value = parseFloat(rating.Value.replace('%', '')) / 10;
            weight = 0.5;
        } else if (rating.Source === "Metacritic") {
            // Metacritic 평점은 100점 만점이므로 10점 만점으로 변환
            value = parseFloat(rating.Value.split('/')[0]) / 10;
            weight = 0.5;
        }

        if (!isNaN(value)) {
            weightedSum += value * weight;
            totalWeight += weight;
        }
    });

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
}
