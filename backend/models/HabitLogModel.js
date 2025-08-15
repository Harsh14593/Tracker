const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Habit',
  },
  log_date: {
    type: Date,
    required: true,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
  effort_level: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    required: true,
  },
  entry_notes: {
    type: String,
  },
  consistency_score: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HabitLog', habitLogSchema);