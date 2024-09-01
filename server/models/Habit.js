const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  categories: [String],
  completionStatus: [{
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;