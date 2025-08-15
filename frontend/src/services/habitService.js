import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habits/';

// Function to get all habits from the backend
const getHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Function to create a new habit
const createHabit = async (habitData) => {
  const response = await axios.post(API_URL, habitData);
  return response.data;
};

const habitService = {
  getHabits,
  createHabit,
};

export default habitService;