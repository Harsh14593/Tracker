const Habit = require('../models/HabitModel');

// @desc    Get all habits
// @route   GET /api/habits
// Replace the old getHabits function with this one
const getHabits = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = req.query.active === 'true' ? { isActive: true } : {};
  const total = await Habit.countDocuments(filter);
  const habits = await Habit.find(filter).skip(skip).limit(limit);

  res.status(200).json({
    habits,
    page,
    totalPages: Math.ceil(total / limit),
  });
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
    user: req.user.id,
  });

  res.status(201).json(habit);
};
// ... after createHabit function

// @desc    Update a habit
// @route   PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }
  const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedHabit);
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
const deleteHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  if (!habit) {
    res.status(404);
    throw new Error('Habit not found');
  }
  await Habit.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
};

// At the bottom, export the new functions
module.exports = {
  getHabits,
  createHabit,
  updateHabit, 
  deleteHabit, 
};