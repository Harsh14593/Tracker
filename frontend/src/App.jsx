import { useState, useEffect } from 'react';
import habitService from './services/habitService';
import AddHabitForm from './components/AddHabitForm'; // Import the form

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    habitService.getHabits()
      .then(initialHabits => {
        setHabits(initialHabits);
      })
      .catch(error => {
        console.error("There was an error fetching the habits:", error);
      });
  }, []);

  // This function will be called by the form component
  const handleHabitCreated = (newHabit) => {
    setHabits([...habits, newHabit]); // Add the new habit to the existing list
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <AddHabitForm onHabitCreated={handleHabitCreated} /> {/* Add the form here */}

      <h2>My Habits</h2>
      {habits.length > 0 ? (
        <ul>
          {habits.map(habit => (
            <li key={habit._id}>{habit.name}</li>
          ))}
        </ul>
      ) : (
        <p>No habits yet. Add one below!</p>
      )}
    </div>
  );
}

export default App;