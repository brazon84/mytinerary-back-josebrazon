import City from '../models/city.js'
import catchError from '../utils/catchError.js';

const getAll = catchError(async (req, res) => {
    const cities = await City.find();
    return res.json(cities);
});
const create = catchError(async (req, res) => {
    const { city, url, country, description } = req.body;
    const cities = await City.create({ city, url, country, description });
    return res.status(201).json(cities);
});
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const cities = await City.findById(id);
    return res.json(cities);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await City.findByIdAndRemove(id);
    return res.sendStatus(204);
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { city, url, country, description } = req.body;
    const cities = await City.findByIdAndUpdate(id, { city, url, country, description }, {new:true},)
    return res.json(cities);
})

export { getAll, create, getOne, remove, update }