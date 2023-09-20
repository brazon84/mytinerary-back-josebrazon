import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcrypt'


const usersSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
       unique:true,
    },
    password: {
        type: String,
        required: true
    },
    photourl:{
        type: String,   
    },
    country:{
        type:String,
     
    }
});

usersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

usersSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password; 
    return userObject;
};

const Users = mongoose.model('Users', usersSchema);

export default Users;
