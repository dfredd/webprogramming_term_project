import { getMovieRatePrediction } from '../services/index.js';
import { 
    getMovieDetail, 
    searchMovies 
} from '../services/tmdb.js'

export const renderIndex = async (req, res) => {
    res.render('index');
};

export const renderDetail = async (req, res) => {
    const movie_id = req.query.movie_id;
    const detail = await getMovieDetail(movie_id);

    let predicted_rating = 0;

    try {
        predicted_rating = parseFloat(await getMovieRatePrediction(detail.runtime, detail.revenue))
        if (isNaN(predicted_rating)) {
            predicted_rating = 0;
        } else {
            predicted_rating = predicted_rating.toFixed(2);
        }
    } catch(err) {
        console.error('평점 예측 중 오류 발생: ', err)
    }
    // detail을 DB에 저장해야 함.

    const dnw = detail.credits?.crew?.filter(c => ['Directing', 'Writing'].includes(c.department));

    res.render(
        'detail',
        {
            detail, 
            predicted_rating,
            directors_and_writers: dnw?.splice(0, 6) || [],
            actors: detail.credits?.cast?.filter(c => c.known_for_department === 'Acting') || [],
            credits: detail.credits,
        }
    );
};

export const renderSearchList = async (req, res) => {
    const query = req.query;
    const searchResult = await searchMovies(query.query, query.page)

    res.render('search_list', { query: query.query, movies: searchResult });
};
