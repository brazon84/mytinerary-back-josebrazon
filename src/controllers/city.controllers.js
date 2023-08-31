import City from '../models/City.js'
import Itineraty from '../models/Itineraty.js';
import catchError from '../utils/catchError.js';


const getAll = catchError(async (req, res) => {
    const cities = await City.find().populate('itineratyID').populate({path:'itineratyID', populate: 'activityID'});
    return res.json(cities);
});

const getItineraty = catchError(async (req, res) => {
    const { cityId } = req.params;
    const city = await City.findById(cityId).populate('itineratyID');
    
    if (!city) {
        return res.status(404).json();
    }
    return res.status(200).json(city.itineratyID);
});

const getActivity = catchError(async (req, res) => {
    const { cityId } = req.params;
    const city = await City.findById(cityId).populate('activityID');
    
    if (!city) {
        return res.status(404).json();
    }
    return res.status(200).json(city.activityID);
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

export { getAll, getItineraty, getActivity, create, getOne,  remove, update }