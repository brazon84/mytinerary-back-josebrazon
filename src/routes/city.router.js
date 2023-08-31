import { getAll, create, getOne, addItineraryToCity, addActivityToCity, remove, update } from '../controllers/city.controllers.js';
import express  from 'express';

const cityRouter = express.Router();

cityRouter.route('/')
    .get(getAll)
    .post(create);

cityRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);
    // Ruta para agregar un itinerario a una ciudad
cityRouter.post('/:cityId/add-itinerary/:itineraryId', addItineraryToCity);

// Ruta para agregar una actividad a una ciudad
cityRouter.post('/:cityId/add-activity/:activityId', addActivityToCity);

export default cityRouter;