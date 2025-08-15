import { useState } from 'react';
import habitService from '../services/habitService';

function AddHabitForm({ onHabitCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    habitService.createHabit({ name })
      .then(newHabit => {
        onHabitCreated(newHabit);
        setName('');
      })
      .catch(error => console.error("Error creating habit:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-habit-form-content">
      <input
        type="text"
        placeholder="Enter a new habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn-primary">Add Habit</button>
    </form>
  );
}

export default AddHabitForm;