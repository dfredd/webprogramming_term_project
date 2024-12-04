// TMDB API 데이터에 OMDB API에서 제공하는 평점을 추가합니다.

import dbConn from '../db/connection.js'
import { MovieDetail, MovieTestDetail } from "../model/MovieDetail.js";
import { getMovieInfoByIMDbId } from '../services/omdb.js';
import { normalizeRatings } from '../utils/omdb.js';
import { delay } from '../utils/index.js';

async function enrichMovieData() {
    dbConn();
    const trains = await MovieDetail.find({}); // 모델 훈련용 데이터셋
    const tests = await MovieTestDetail.find({}); // 모델 테스트용 데이터셋

    let updatedDocumentCnt = 0;

    for(const [idx, t_movie] of trains.entries()) {
        if (idx % 50 === 0) {
            delay(1000);
        }
        const omdb = await getMovieInfoByIMDbId(t_movie.imdb_id);
        const rating = normalizeRatings(omdb.Ratings);
        const updateResult = await MovieDetail.updateOne(
            {
                imdb_id: omdb.imdbID
            },
            {
                omdb_rate: rating
            }
        )

        if (updateResult.acknowledged && updateResult.modifiedCount > 0) {
            console.log(`${rating} - ${omdb.Title}`)
            updatedDocumentCnt++;
        }
    }
}

enrichMovieData();