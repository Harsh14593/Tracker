import axios from 'axios';

const HABITS_API_URL = 'http://localhost:5000/api/habits/';
const LOGS_API_URL = 'http://localhost:5000/api/habitlogs/';

// Helper function to get the token from localStorage and create an authorization header.
// This keeps our code clean and avoids repetition.
const createAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { headers: { Authorization: `Bearer ${user.token}` } };
  } else {
    return {};
  }
};

/**
 * Fetches a paginated and filtered list of habits for the logged-in user.
 * @param {number} page - The page number for pagination.
 * @param {boolean} activeFilter - A boolean to filter for active habits.
 * @returns {Promise} Axios promise with the habits data.
 */
const getHabits = async (page = 1, activeFilter = true) => {
  const config = {
    params: {
      page: page,
      limit: 5, // You can adjust the page size here
      active: activeFilter,
    },
    ...createAuthHeader()
  };
  const response = await axios.get(HABITS_API_URL, config);
  return response.data;
};

/**
 * Creates a new habit for the logged-in user.
 * @param {object} habitData - The data for the new habit (e.g., { name: 'New Habit' }).
 * @returns {Promise} Axios promise with the newly created habit.
 */
const createHabit = async (habitData) => {
  const response = await axios.post(HABITS_API_URL, habitData, createAuthHeader());
  return response.data;
};

/**
 * Updates an existing habit.
 * @param {string} id - The ID of the habit to update.
 * @param {object} habitData - The updated data for the habit.
 * @returns {Promise} Axios promise with the updated habit.
 */
const updateHabit = async (id, habitData) => {
  const response = await axios.put(HABITS_API_URL + id, habitData, createAuthHeader());
  return response.data;
};


/**
 * Deletes a habit for the logged-in user.
 * @param {string} id - The ID of the habit to delete.
 * @returns {Promise} Axios promise with the ID of the deleted habit.
 */
const deleteHabit = async (id) => {
  const response = await axios.delete(HABITS_API_URL + id, createAuthHeader());
  return response.data;
};

/**
 * Creates a new daily log for a specific habit.
 * @param {object} logData - The data for the new log entry.
 * @returns {Promise} Axios promise with the newly created log.
 */
const createHabitLog = async (logData) => {
  const response = await axios.post(LOGS_API_URL, logData, createAuthHeader());
  return response.data;
};

const habitService = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  createHabitLog,
};

export default habitService;