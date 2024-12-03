import dotenv from 'dotenv'

dotenv.config()

export async function getMovieInfoByIMDbId(imdb_id) {
    const URL = `http://www.omdbapi.com/?i=${imdb_id}&apikey=${process.env.OMDB_API_KEY}`;

    return await fetch(
        URL,
        {
            headers: {
                "Accept": "application/json",
            }
        }
    ).then(resolve => resolve.json());
}
