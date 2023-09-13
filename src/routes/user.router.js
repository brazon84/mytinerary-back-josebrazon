import { getAll, create, getOne, remove, update, login } from '../controllers/user.controllers.js'
import express from 'express'
import verifyJWT from '../utils/verifyJWT.js'

const userRouter = express.Router();

userRouter.route('/')
    .get(verifyJWT,  getAll)
    .post(create);

    userRouter.route('/login')
    .post( login);

userRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

export default userRouter;