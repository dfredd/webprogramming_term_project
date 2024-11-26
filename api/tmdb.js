import dotenv from 'dotenv'

dotenv.config()

export async function getDiscoverMovies(page, primary_release_year = '', with_genres = '') {
    const URL = `https://api.themoviedb.org/3/discover/movie?&language=en-US&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres}&vote_count.gte=${1000}`;

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
        `https://api.themoviedb.org/3/movie/${movie_id}`,
        {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        }
    ).then(resolve => resolve.json()))
}
