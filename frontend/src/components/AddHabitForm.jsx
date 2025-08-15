import { useState } from 'react';
import habitService from '../services/habitService';

function AddHabitForm({ onHabitCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a habit name');
      return;
    }

    habitService.createHabit({ name })
      .then(newHabit => {
        onHabitCreated(newHabit); // Notify the parent component
        setName(''); // Clear the input field
      })
      .catch(error => {
        console.error("Error creating habit:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Habit</h3>
      <input
        type="text"
        placeholder="e.g., Drink water"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default AddHabitForm;