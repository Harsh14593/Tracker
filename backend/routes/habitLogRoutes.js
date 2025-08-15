const express = require('express');
const router = express.Router();
const { createHabitLog, getHabitLogs } = require('../controllers/habitLogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createHabitLog);
router.route('/:habitId').get(protect, getHabitLogs);

module.exports = router;