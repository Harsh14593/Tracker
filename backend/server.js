const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/plans', require('./routes/studyPlanRoutes')); // MOVED TO HERE

// Simple test route for the root URL
app.get('/', (req, res) => {
  res.send('AI Study Planner API is running...');
});

// Use the custom error handler
// This MUST be the last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});