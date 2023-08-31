import mongoose from "mongoose";
const { Schema } = mongoose;

const citySchema = new Schema({
    city: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itineratyID: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Itineraty'
    }],
   
});

const city =mongoose.model('City', citySchema);

export default city