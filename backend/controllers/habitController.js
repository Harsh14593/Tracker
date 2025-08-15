const Habit = require('../models/HabitModel');

// @desc    Get all habits
// @route   GET /api/habits
const getHabits = async (req, res) => {
  const habits = await Habit.find(); // Fetches all habits from the DB
  res.status(200).json(habits);
};

// @desc    Create a new habit
// @route   POST /api/habits
const createHabit = async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const habit = await Habit.create({
    name: req.body.name,
    description: req.body.description,
  });

  res.status(201).json(habit);
};

module.exports = {
  getHabits,
  createHabit,
};