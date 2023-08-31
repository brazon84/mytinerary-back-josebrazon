import catchError from '../utils/catchError.js';
import Itineraty from '../models/Itineraty.js'
import City from '../models/City.js';
import Activity from '../models/Activity.js';

const getAll = catchError(async (req, res) => {
    const itineraries = await Itineraty.find().populate(['cityID', 'activityID']);
    return res.json(itineraries);
});
const create = catchError(async (req, res) => {
    const { userName, photoUser, price, duration, cityID, activityID} = req.body;
    const itineraries = await Itineraty.create({ userName, photoUser, price, duration, cityID, activityID });
    const cityId = await City.findById(cityID);
    cityId.itineratyID.push(itineraries);
    await cityId.save();
    const activityId = await Activity.findById(activityID);
    activityId.itineratyID.push(itineraries);
    await activityId.save()
    return res.status(201).json(itineraries);
});
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const itineraries = await Itineraty.findById(id);
    return res.json(itineraries);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Itineraty.findByIdAndDelete(id);
    return res.sendStatus(204);
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { userName, photoUser, price, duration, cityID, activityID } = req.body;
    const itineraries = await Itineraty.findByIdAndUpdate(id, { userName, photoUser, price, duration,cityID, activityID }, { returnDocument: 'after' },)
    return res.json(itineraries);
})

export { getAll, create, getOne, remove, update }