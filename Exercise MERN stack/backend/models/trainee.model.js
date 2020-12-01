const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const traineeSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = Trainee;