import City from '../models/City.js'
import Itineraty from '../models/Itineraty.js';
import Activity from '../models/Activity.js';
import catchError from '../utils/catchError.js';


const getAll = catchError(async (req, res) => {
    const cities = await City.find().populate('itineraries').populate({path:'itineraries', populate: 'activities'});
    return res.json(cities);
});
const create = catchError(async (req, res) => {
    const { city, url, country, description, itineratyID, } = req.body;
    const cities = await City.create({ city, url, country, description, itineratyID });
    const itineratyId = await Itineraty.findById(itineratyID);
    itineratyId.cityID.push(cities);
    await itineratyId.save();
    return res.status(201).json(cities);
});
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const cities = await City.findById(id);
    return res.json(cities);
});
const addItineraryToCity = catchError(async (req, res) => {
    const { cityId, itineratyId } = req.params;
    const city = await City.findById(cityId);
    const itineraty = await Itineraty.findById(itineratyId);
    if (!city || !itineraty) {
        return res.status(404).json();
    }
    city.itineraries.push(itineraty);
    await city.save();
    return res.status(200).json();

});

const addActivityToCity = catchError(async (req, res) => {
    const { cityId, activityId } = req.params;
    const city = await City.findById(cityId);
    const activity = await Activity.findById(activityId);
    if (!city || !activity) {
        return res.status(404).json();
    }
    city.activities.push(activity);
    await city.save();
    return res.status(200).json();

});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    return res.sendStatus(204);
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { city, url, country, description, itineratyID } = req.body;
    const cities = await City.findByIdAndUpdate(id, { city, url, country, description, itineratyID }, { returnDocument: 'after' },)
    return res.json(cities);
})

export { getAll, create, getOne, addItineraryToCity, addActivityToCity, remove, update }