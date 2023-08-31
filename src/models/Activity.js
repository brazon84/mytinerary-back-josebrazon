import mongoose from "mongoose";
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  likes: {
    type: Number,
    default: 0,
  },
  hashtag: [
   String
  ],
  images: [String],
  comment: {
    type: String,
    default:""
  },
  

});

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
