# AI Usage Documentation

AI was integral to this project in two key ways:
1.  **AI as a Development Assistant**: I used Gemini throughout the development process to accelerate coding, debug issues, and implement best practices.
2.  **AI as a Core In-App Feature**: The application's main purpose is to use the Gemini API to generate personalized study plans for users.

---

### Part 1: AI as a Development Assistant

Here are some examples of prompts used during development:

**Prompt 1: Generating a Secure JWT Secret**
* **Prompt**: "Feels like there is some issue with jwt secret key as i have kept it averylongandrandomsecretstring"
* **Context**: I needed a cryptographically secure secret for signing JSON Web Tokens instead of a predictable string.
* **Result**: Gemini explained why a random string is better and provided a `node` command (`crypto.randomBytes`) to generate a secure, hexadecimal string, which I then used in my `.env` file.

**Prompt 2: Debugging a 404 Error**
* **Prompt**: "why i am still getting the same axios error 404"
* **Context**: My frontend was unable to connect to a backend endpoint, even though the code looked correct.
* **Result**: Gemini guided me to use the browser's "Network" tab to find the exact URL being requested. This helped me identify a subtle mismatch between my frontend environment variable and the backend route configuration, allowing me to fix the bug.

**Prompt 3: Designing a Professional UI**
* **Prompt**: "this looks like a very simple todo list... kindly design a premium and formal ui as this website is for a fourth year engineering student"
* **Context**: I was unsatisfied with the initial UI and needed a more professional design.
* **Result**: Gemini provided a complete CSS stylesheet and updated JSX for a "SaaS-style" dark-mode UI, and then a polished light-mode UI, including a professional color palette, typography, and layout rules that significantly elevated the project's look and feel.

**Prompt 4: Generating a Mongoose Schema**
* **Prompt**: "Generate a Mongoose schema for a 'HabitLog' for a Node.js application..."
* **Context**: During the initial idea phase, I needed to quickly create the database structure for tracking habits.
* **Result**: Gemini provided a complete Mongoose schema with correct data types, enums, and required fields, which served as the foundation for the backend models.

---

### Part 2: In-App AI Feature - The Study Planner

The core feature of this application is a call to the Gemini API to generate a personalized study plan.

**Engineered Prompt:**
The following prompt is sent to the `gemini-1.5-pro-latest` model. It is carefully engineered to request a specific JSON structure for reliable parsing on the backend.

```text
You are an expert career coach for software engineers. A user provides you with their details. Your task is to generate a detailed, week-by-week study plan to help them achieve their goal.
The plan must be structured, realistic, and tailored to their inputs.
Return ONLY a single, valid JSON object with a key "plan". "plan" must be an array of objects.
Each object in the array represents a week and must have two keys: "week" (a string, e.g., "Week 1: Foundations") and "tasks" (an array of strings, with each string being a specific, actionable task).
Do not include any introductory text, explanations, or markdown formatting.

USER INPUTS:
- Skill Level: "${skillLevel}"
- Weekly Time Commitment: "${timeCommitment} hours"
- Primary Goal: "${primaryGoal}"
- Key Focus Areas: "${focusAreas}"
- Number of Weeks to Prepare: "${numberOfWeeks}"