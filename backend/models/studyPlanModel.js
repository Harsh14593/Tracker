const mongoose = require('mongoose');

// This defines the structure for a single task within a week
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  is_completed: {
    type: Boolean,
    default: false,
  },
});

// This defines the structure for a single week in the plan
const weeklyPlanSchema = new mongoose.Schema({
  week: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const studyPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  userInput: {
    skillLevel: String,
    timeCommitment: Number,
    primaryGoal: String,
    focusAreas: String,
    targetDate: Date,
  },
  generatedPlan: [weeklyPlanSchema],
  totalStudyHours: { // The simple, safe calculated field
    type: Number,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);