import { getAll, getItineraty, getActivity, create, getOne, remove, update } from '../controllers/city.controllers.js';
import express from 'express';

const cityRouter = express.Router();

cityRouter.route('/')
    .get(getAll)
    .post(create);

cityRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

cityRouter.route('/:cityId/:itineratyID')
    .get(getItineraty);

cityRouter.route('/:cityId/:itineratyID/:activityID')
    .get(getActivity);





export default cityRouter;