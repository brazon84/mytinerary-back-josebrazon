import express from "express";
import cityRouter from "./city.router.js";
import itineratyRouter from "./itineraty.router.js";
import activityRouter from "./activity.router.js";

const router = express.Router();


router.use('/cities', cityRouter);
router.use('/itineraries', itineratyRouter)
router.use('/activities', activityRouter)


export default router;