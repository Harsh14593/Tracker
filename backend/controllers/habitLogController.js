const HabitLog = require('../models/HabitLogModel');

// @desc    Create a new habit log
// @route   POST /api/habitlogs
const createHabitLog = async (req, res) => {
  const { habit, log_date, is_completed, effort_level, entry_notes } = req.body;

  // --- Consistency Score Logic ---
  let score = 0;
  if (is_completed) {
    // Find the log for the same habit from the previous day
    const yesterday = new Date(log_date);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const previousLog = await HabitLog.findOne({
      habit: habit,
      log_date: {
        $gte: new Date(yesterday.setHours(0, 0, 0, 0)),
        $lt: new Date(yesterday.setHours(23, 59, 59, 999))
      }
    });

    if (previousLog && previousLog.is_completed) {
      score = previousLog.consistency_score + 1;
    } else {
      score = 1; // Start a new streak
    }
  }

  const habitLog = await HabitLog.create({
    habit,
    log_date,
    is_completed,
    effort_level,
    entry_notes,
    consistency_score: score,
  });

  res.status(201).json(habitLog);
};

// @desc    Get all logs for a specific habit
// @route   GET /api/habitlogs/:habitId
const getHabitLogs = async (req, res) => {
  const logs = await HabitLog.find({ habit: req.params.habitId }).sort({ log_date: -1 });
  res.status(200).json(logs);
};

module.exports = {
  createHabitLog,
  getHabitLogs,
};