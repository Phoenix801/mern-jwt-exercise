import { Schema, model } from 'mongoose';

// Create Schema
const ExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  days: {
    type: [Number],
    required: true
  },
  phone: {
    type: Number,
  }
});

const Exercise = model('exercise', ExerciseSchema);

export default Exercise;
