# Application Architecture

This project is a full-stack MERN application designed to be scalable and maintainable.

---

### Tech Stack

* **Frontend**: React (with Vite), using functional components and hooks.
* **Backend**: Node.js with the Express.js framework.
* **Database**: MongoDB (via the Atlas cloud service), with Mongoose as the ODM.
* **Authentication**: JSON Web Tokens (JWT).
* **Deployment**: The backend is deployed on Render, and the frontend is on Vercel.

---

### Project Structure

The repository is organized into two main folders, `/frontend` and `/backend`, to maintain a clean separation of concerns.

/
├── backend/
│   ├── config/         // Database connection
│   ├── controllers/    // Handles request logic
│   ├── middleware/     // Auth and error handling
│   ├── models/         // Mongoose schemas
│   └── routes/         // API route definitions
└── frontend/
├── src/
│   ├── components/ // Reusable UI components
│   ├── pages/      // Main page components (Dashboard, Login)
│   └── services/   // API call logic (auth, ai, plans)
└── .env.production // Environment variables for deployment


---

### Database Schema

Two main collections are used in the database:

**1. `User` Collection**
Stores user authentication information.
* `name`: (String, required)
* `email`: (String, required, unique)
* `password`: (String, required, hashed with bcryptjs)

**2. `StudyPlan` Collection**
Stores the plans generated for each user.
* `user`: (ObjectId, ref: 'User', required)
* `userInput`: (Object) - Stores the inputs the user provided.
* `generatedPlan`: (Array of Objects) - The main plan from the AI.
    * `week`: (String)
    * `tasks`: (Array of Objects)
        * `task`: (String)
        * `is_completed`: (Boolean)
* `totalStudyHours`: (Number) - The simple calculated field.

---

### Application Flow

1.  A user registers or logs in via the React frontend.
2.  The backend authenticates the user and returns a JWT.
3.  The frontend stores the JWT and includes it in the header of all future API requests.
4.  The user fills out the "Generate Plan" form on the Dashboard.
5.  The frontend sends the form data to a protected backend endpoint (`/api/ai/generate-plan`).
6.  The Express backend uses middleware to verify the JWT.
7.  The `aiController` builds a prompt and makes a call to the Gemini API.
8.  The AI response is parsed, formatted, and saved as a new `StudyPlan` document in MongoDB.
9.  The saved plan is returned to the frontend, where it is displayed to the user.