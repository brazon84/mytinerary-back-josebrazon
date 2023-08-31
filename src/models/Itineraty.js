import mongoose, { trusted } from "mongoose";
const { Schema } = mongoose;


const itineratySchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    photoUser: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    duration: {
        type: Number,
        required: true
    },
    activityID: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Activity',
    }],
    cityID: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'City', 
    }]
});

const Itineraty = mongoose.model('Itineraty', itineratySchema);

export default Itineraty;
