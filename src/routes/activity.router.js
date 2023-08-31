import { getAll, create, getOne, remove, update } from '../controllers/activity.controllers.js';
import express  from 'express';


const activityRouter = express.Router();

activityRouter.route('/')
    .get(getAll)
    .post(create);

activityRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

export default activityRouter;