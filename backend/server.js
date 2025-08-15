// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// At the top with other imports
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// ... rest of your server.js code

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Set up middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in request bodies
// ... after app.use(express.json())
app.use('/api/habits', require('./routes/habitRoutes'));

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.send('Gamified Habit Tracker API is running!');
});

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});