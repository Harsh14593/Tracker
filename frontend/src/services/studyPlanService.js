import axios from 'axios';

const API_URL = 'http://localhost:5000/api/plans/';

// Helper to get the auth token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  }
  return {};
};

/**
 * Updates the completion status of a single task.
 * @param {string} planId - The ID of the study plan.
 * @param {string} taskId - The ID of the task to update.
 * @param {boolean} is_completed - The new completion status.
 * @returns {Promise} Axios promise with the updated task.
 */
const updateTaskStatus = async (planId, taskId, is_completed) => {
  const response = await axios.patch(
    `${API_URL}${planId}/tasks/${taskId}`,
    { is_completed },
    getAuthHeader()
  );
  return response.data;
};

/**
 * Deletes an entire study plan.
 * @param {string} planId - The ID of the study plan to delete.
 * @returns {Promise} Axios promise with the confirmation.
 */
const deletePlan = async (planId) => {
  const response = await axios.delete(API_URL + planId, getAuthHeader());
  return response.data;
};

const studyPlanService = {
  updateTaskStatus,
  deletePlan,
};

export default studyPlanService;