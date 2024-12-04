import express from 'express';
import { 
    searchMoviesController,
    getPopularMoviesController,
    getTrendingMoviesController,
    getNowPlayingMoviesController,
    getMovieDetailController,
    getMovieRatePredictionController,
} from '../controllers/api.js';

const ApiRouter = express.Router();

ApiRouter.get('/search', searchMoviesController);
ApiRouter.get('/popular', getPopularMoviesController)
ApiRouter.get('/trending', getTrendingMoviesController)
ApiRouter.get('/now_playing', getNowPlayingMoviesController)
ApiRouter.get('/detail', getMovieDetailController);
ApiRouter.get('/predict', getMovieRatePredictionController);

export default ApiRouter;
