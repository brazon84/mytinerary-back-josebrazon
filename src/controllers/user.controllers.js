import catchError from '../utils/catchError.js';
import Users from './../models/Users.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validateUserData from '../utils/joiUser.js';



const getAll = catchError(async (req, res) => {
    const user = await Users.find();
    return res.json(user);
});
const create = catchError(async (req, res) => {
    validateUserData(req, res)
    const users = await Users.create(req.body);
    return res.status(201).json(users);
});
const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const users = await Users.findById(id);
    if (!users) return res.sendStatus(404)
    return res.json(users);
});
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Users.destroy({ where: { id } });
    return res.sendStatus(204);
});
const update = catchError(async (req, res) => {
    const { id } = req.params;
    delete req.body.password;
    const result = await Users.update(req.body, {
        where: { id },
        returning: true,
    });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });
    const valuePassword = await bcrypt.compare(password, user.password);
    if (!valuePassword)
        return res.status(401).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    return res.json({ user, token });
});

export { getAll, create, getOne, remove, update, login }

