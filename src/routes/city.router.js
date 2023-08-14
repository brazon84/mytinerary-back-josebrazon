import { getAll, create, getOne, remove, update } from '../controllers/city.controllers.js';
import express  from 'express';

const cityRouter = express.Router();

cityRouter.route('/')
    .get(getAll)
    .post(create);

cityRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

export default cityRouter;