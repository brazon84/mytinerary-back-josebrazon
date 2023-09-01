import catchError from '../utils/catchError.js';
import Activity from '../models/Activity.js'



const getAll = catchError(async (req, res) => {
    const activities = await Activity.find();
    return res.json(activities);
});
const create = catchError(async (req, res) => {
    const {  comment, cityID } = req.body;
    const activities = await Activity.create({  comment, cityID });
    return res.status(201).json(activities);
});
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const activities = await Activity.findById(id);
    return res.json(activities);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    return res.sendStatus(204);
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { comment, cityID } = req.body;
    const activities = await City.findByIdAndUpdate(id, { comment, cityID }, { returnDocument: 'after' },)
    return res.json(activities);
})

export { getAll, create, getOne, remove, update }