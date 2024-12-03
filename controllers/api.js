import { 
    searchMovies, 
    getPopularMovies, 
    getTrendingMovies, 
    getNowPlayingMovies, 
    getMovieDetail 
} from '../api/tmdb.js';

export const searchMoviesController = async (req, res) => {
    try {
        const list = await searchMovies(req.query);
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPopularMoviesController = async (req, res) => {
    try {
        const list = await getPopularMovies(req.query.page);
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTrendingMoviesController = async (req, res) => {
    try {
        const list = await getTrendingMovies(req.query.time_window);
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNowPlayingMoviesController = async (req, res) => {
    try {
        const list = await getNowPlayingMovies(req.query.page);
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMovieDetailController = async (req, res) => {
    try {
        const movie_id = req.query.movie_id;
        const detail = await getMovieDetail(movie_id);
        res.json(detail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
