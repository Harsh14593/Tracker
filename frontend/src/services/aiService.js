import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai/';

// Helper to get the auth token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  }
  return {};
};

/**
 * Sends user input to the backend to generate a new study plan.
 * @param {object} planData - The user's form input.
 * @returns {Promise} Axios promise with the newly generated plan.
 */
const generatePlan = async (planData) => {
  const response = await axios.post(API_URL + 'generate-plan', planData, getAuthHeader());
  return response.data;
};

const aiService = {
  generatePlan,
};

export default aiService;