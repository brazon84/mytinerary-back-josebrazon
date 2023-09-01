import mongoose from "mongoose";
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  
  comment: {
    type: String,
    default:""
  },
  

});

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
