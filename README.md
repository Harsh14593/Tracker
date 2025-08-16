# AI Study Planner 🚀

An intelligent, full-stack web application designed to help students and aspiring software engineers generate personalized study roadmaps using AI. Users provide their goals, skill level, and timeline, and the application leverages the Gemini API to create a detailed, week-by-week study plan.

---

## Live Demo

https://tracker-6gi6w5i6s-hrash-jhas-projects.vercel.app/

---

## Key Features

* **🤖 AI-Powered Plan Generation**: Core feature uses the Gemini API to create dynamic, personalized study plans.
* **👤 User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
* **✅ Full CRUD Functionality**: Users can Create plans, Read them, Update tasks by checking them off, and Delete their plans.
* **📊 Interactive Dashboard**: A polished UI to generate plans and track progress.
* **📈 Sticky Progress Bar**: Provides a constant, at-a-glance overview of the user's overall progress.
* **✨ Polished User Experience**: Features like loading skeletons and a completion modal enhance the user experience.
* **📂 Export Plan**: Users can download their generated plan as a `.txt` file.
* **📝 Task Filtering**: Filter tasks within the plan by "All", "Completed", or "Incomplete".

---

## Tech Stack

* **Frontend**:
    * React (with Vite)
    * React Router for navigation
    * Axios for API calls
    * CSS3 for styling
* **Backend**:
    * Node.js
    * Express.js
    * MongoDB with Mongoose
    * JSON Web Tokens (JWT) for authentication
    * Google Generative AI SDK for the AI feature
* **Deployment**:
    * Backend on Render
    * Frontend on Vercel

---

## Local Setup and Installation

Follow these steps to run the project locally on your machine.

### Prerequisites

* Node.js (v18 or later)
* npm
* Git
* A MongoDB Atlas account
* A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone repository link
    cd repo-name
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `/backend` directory and add the following variables:
    ```
    MONGO_URI="mongodb+srv://harshjha14593:hhGb7xtNcmReSSQn@habittrackercluster.odscodz.mongodb.net/?retryWrites=true&w=majority&appName=HabitTrackerCluster"
    JWT_SECRET=averylongandrandomsecretstring
    GEMINI_API_KEY=AIzaSyA8l-yR746chGpJksgdUZSCiivISP_g2CI
    ```
    Start the backend server:
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

3.  **Frontend Setup:**
    Open a new terminal window.
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env.development` file in the `/frontend` directory and add the following variable:
    ```
    VITE_API_URL=http://localhost:5000
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

---
