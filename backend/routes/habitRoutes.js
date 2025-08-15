const express = require('express');
const router = express.Router();
const { getHabits, createHabit } = require('../controllers/habitController');

router.route('/').get(getHabits).post(createHabit);

module.exports = router;