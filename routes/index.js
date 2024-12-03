import express from 'express';
import { renderIndex, renderDetail, renderSearchList } from '../controllers/index.js';

const RootRouter = express.Router();

RootRouter.get('/', renderIndex);
RootRouter.get('/detail', renderDetail);
RootRouter.get('/search', renderSearchList);

export default RootRouter;
