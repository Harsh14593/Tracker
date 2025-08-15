const express = require('express');
const router = express.Router();
const { updateTaskStatus, deleteStudyPlan } = require('../controllers/studyPlanController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:planId').delete(protect, deleteStudyPlan);
router.route('/:planId/tasks/:taskId').patch(protect, updateTaskStatus);

module.exports = router;