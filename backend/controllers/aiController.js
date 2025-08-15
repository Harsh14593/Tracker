// --- THIS IS THE MOCKED VERSION OF THE AI CONTROLLER ---

const StudyPlan = require('../models/studyPlanModel');
const dayjs = require('dayjs');

const generateStudyPlan = async (req, res) => {
  const { skillLevel, timeCommitment, primaryGoal, focusAreas, targetDate } = req.body;

  // 1. The Simple Calculated Field (still works)
  const today = dayjs();
  const endDate = dayjs(targetDate);
  const numberOfWeeks = endDate.diff(today, 'week') || 4; // Default to 4 weeks if date is invalid
  const totalStudyHours = numberOfWeeks * timeCommitment;

  try {
    // 2. MOCK AI RESPONSE
    // Instead of calling the Google API, we create a realistic, pre-written response.
    console.log("--- USING MOCKED AI RESPONSE ---");
    const mockApiResponse = {
      plan: [
        {
          week: "Week 1: Foundations of JavaScript & DSA",
          tasks: [
            "Review JavaScript data types, scope, and closures.",
            "Complete 5 beginner algorithm challenges on arrays and strings.",
            "Set up your local development environment with Node.js and VS Code."
          ]
        },
        {
          week: "Week 2: Deep Dive into React",
          tasks: [
            "Learn about JSX, components, state, and props.",
            "Understand the component lifecycle and key hooks like useEffect and useState.",
            "Build a simple multi-component application (e.g., a to-do list)."
          ]
        },
        {
          week: "Week 3: Backend with Node.js & Express",
          tasks: [
            "Set up a basic Express server and understand middleware.",
            "Create RESTful API endpoints for GET and POST requests.",
            "Connect your server to your MongoDB database with Mongoose."
          ]
        },
        {
            week: "Week 4: Full-Stack Integration & Review",
            tasks: [
              "Connect your React frontend to your Node.js backend.",
              "Review key concepts of Data Structures.",
              "Practice a mock behavioral interview."
            ]
        }
      ]
    };
    
    // 3. Simulate API delay to make it feel real
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // 4. Format and Save to Database (same as before)
    const formattedPlan = mockApiResponse.plan.map(week => ({
      week: week.week,
      tasks: week.tasks.map(taskString => ({ task: taskString, is_completed: false }))
    }));

    const newStudyPlan = await StudyPlan.create({
      user: req.user.id,
      userInput: { skillLevel, timeCommitment, primaryGoal, focusAreas, targetDate },
      generatedPlan: formattedPlan,
      totalStudyHours,
    });

    res.status(201).json(newStudyPlan);

  } catch (error) {
    console.error("Error in mocked plan generation:", error);
    res.status(500).json({ message: "Failed to generate study plan." });
  }
};

module.exports = { generateStudyPlan };