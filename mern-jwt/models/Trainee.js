import { Schema, model } from 'mongoose';

// Create Schema
const TraineeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

const Trainee = model('trainee', TraineeSchema);

export default Trainee;
