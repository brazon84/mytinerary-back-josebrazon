import { getAll, create, getOne, remove, update} from '../controllers/itineraty.controllers.js';
import express  from 'express';

const itineratyRouter = express.Router();

itineratyRouter.route('/')
    .get(getAll)
    .post(create);

   
itineratyRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

export default itineratyRouter;