import dotenv from 'dotenv'

dotenv.config()

// 원래 Node.js 환경에서 fetch API를 제공하지 않기 때문에 node-fetch나 axios 라이브러리를 사용해야 한다.
// 그러나 Node.js 18버전부터 지원하기 시작했고 21버전에서 Stable로 변경되어 아래와 같이 브라우저와 유사하게 사용할 수 있다.

export async function getDiscoverMovies(page, primary_release_year = '', with_genres = '') {
    const params = new URLSearchParams();

    params.append('language', 'ko-KR');
    params.append('page', page);
    if (primary_release_year !== '') {
        params.append('primary_release_year', primary_release_year)
    }
    if (with_genres !== '') {
        params.append('with_genres', with_genres)
    }
    params.append('vote_count.gte', 1000);

    const URL = `${process.env.TMDB_API_BASE_URL}/discover/movie?&${params}`;

    return await (fetch(
        URL,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}

export async function getMovieDetail(movie_id) {
    return await (fetch(
        `${process.env.TMDB_API_BASE_URL}/movie/${movie_id}?language=ko-KR&append_to_response=credits`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}

export async function searchMovies(query, page = 1) {
    const qs = new URLSearchParams({ query, page, language: 'ko-KR' })
    return await (fetch(
        `${process.env.TMDB_API_BASE_URL}/search/movie?${qs}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}

export async function getPopularMovies(page = 1) {
    const qs = new URLSearchParams({ page, language: 'ko-KR' })
    return await (fetch(
        `${process.env.TMDB_API_BASE_URL}/movie/popular?${qs}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}

export async function getTrendingMovies(time_window = 'day') {
    return await (fetch(
        `${process.env.TMDB_API_BASE_URL}/trending/movie/${time_window}?language=ko-KR`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}  

export async function getNowPlayingMovies(page = 1) {
    const qs = new URLSearchParams({ page, language: 'ko-KR' })
    return await (fetch(
        `${process.env.TMDB_API_BASE_URL}/movie/now_playing?${qs}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}
