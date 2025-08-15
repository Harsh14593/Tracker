const StudyPlan = require('../models/studyPlanModel');

// @desc    Update a task's completion status
// @route   PATCH /api/plans/:planId/tasks/:taskId
const updateTaskStatus = async (req, res) => {
  const { planId, taskId } = req.params;
  const { is_completed } = req.body;

  try {
    const plan = await StudyPlan.findOne({ _id: planId, user: req.user.id });

    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    let taskToUpdate = null;
    // Find the specific task within the nested arrays
    for (const week of plan.generatedPlan) {
      taskToUpdate = week.tasks.id(taskId);
      if (taskToUpdate) break;
    }

    if (!taskToUpdate) {
      return res.status(404).json({ message: 'Task not found' });
    }

    taskToUpdate.is_completed = is_completed;
    await plan.save();
    
    res.status(200).json(taskToUpdate);

  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a study plan
// @route   DELETE /api/plans/:planId
const deleteStudyPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await StudyPlan.findOne({ _id: planId, user: req.user.id });

    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    await StudyPlan.findByIdAndDelete(planId);
    
    res.status(200).json({ id: planId, message: 'Study plan deleted successfully' });

  } catch (error) {
    console.error("Error deleting study plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { updateTaskStatus, deleteStudyPlan };