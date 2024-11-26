import { delay, getRandomNumberArray } from '../utils/index.js'
import { getDiscoverMovies, getMovieDetail } from '../api/tmdb.js'
import MovieDetail from '../model/MovieDetail.js'
import dbConn from '../db/connection.js'

dbConn()

async function discoverMovies() {
    console.time('discoverMovies')

    const yearStartEnd = [1970, 2024];

    const years = Array(yearStartEnd[1] - yearStartEnd[0]).fill(0).reduce((value, idx) => {
        return [...value, value[value.length - 1] + 1]
    }, [yearStartEnd[0]])

    // TMDB에 존재하는 영화 장르 19개
    const movieGenres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]

    // DB 작업에 대한 간단한 통계 수집
    let mongo_success = 0;
    let mongo_failed = 0;

    let reqCnt = 0;

    const discoveredMovieIds = [];

    for (let year of years) {
        console.log(`개봉연도: ${year}`)

        try {
            // 첫번째 요청으로 id 목록과 나머지 검색 페이지 수를 알아낸다.
            const discoverList = await getDiscoverMovies(1, year)

            if (discoverList.results) {
                discoveredMovieIds.push(discoverList.results.map(movie => movie.id))
            }

            const totalPages = discoverList.total_pages;

            // 7개의 페이지를 더 요청한다. 한 페이지에 20개씩, 최대 160개의 목록을 가져온다.
            const rndPages = getRandomNumberArray(totalPages, 3, 1)

            rndPages.forEach(async (pageNum) => {
                const list = await getDiscoverMovies(pageNum, year)
                if (list.results) {
                    discoveredMovieIds.push(...list.results.map(movie => movie.id))
                }
            })
        } catch (e) {
            console.error(`요청 실패 ${e}`)
        }

        reqCnt++;

        // TMDB API 문서에 따르면, 초당 50번 정도의 요청을 초과하면 429 상태 코드를 반환한다고 한다.
        // 안전하게 40번 요청 시 1초 쉬어준다.

        if (reqCnt >= 40) {
            await delay(1000);
            reqCnt = 0;
        }
    }

    console.log('discoveredMovieIds 개수: ', discoveredMovieIds.length)
    reqCnt = 0; // 초기화

    while (discoveredMovieIds.length > 0) {
        const promises = discoveredMovieIds.splice(0, 40).map(async (val, idx) => {
            try {
                const newMovieDetail = new MovieDetail(await getMovieDetail(val));
                await newMovieDetail.save();
            } catch (e) {

            }
        })

        await Promise.all(promises);
        await delay(1000);
    }

    console.timeEnd('discoverMovies')
    console.log(`DB 작업 통계 ${mongo_success}개 성공, ${mongo_failed}개 실패`)

    //discoveredMovies 배열의 list 배열을 순회하면서 /movie/{movie_id} API로 요청한 다음 응답 값을 DB에 저장한다.
}

discoverMovies()
