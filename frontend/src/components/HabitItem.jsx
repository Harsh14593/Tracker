import { useState } from 'react';
import habitService from '../services/habitService';

function HabitItem({ habit, onDelete }) {
  const [log, setLog] = useState({ is_completed: false, effort_level: 'Moderate' });
  const [lastLogResult, setLastLogResult] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setLog(prevLog => ({ ...prevLog, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmitLog = (e) => {
    e.preventDefault();
    const logData = { habit: habit._id, log_date: new Date(), ...log };
    
    habitService.createHabitLog(logData)
      .then(response => {
        setLastLogResult(`Logged! New Score: ${response.consistency_score}`);
        setTimeout(() => setLastLogResult(''), 3000);
      })
      .catch(error => {
        setLastLogResult('Error: Habit may have already been logged today.');
        setTimeout(() => setLastLogResult(''), 3000);
        console.error(error);
      });
  };

  return (
    <li className="habit-card">
      <div className="habit-card-header">
        <h3>{habit.name}</h3>
        <button onClick={() => onDelete(habit._id)} className="btn-danger">Delete</button>
      </div>
      <form onSubmit={handleSubmitLog} className="log-form">
        <label>
          <input 
            type="checkbox" 
            name="is_completed"
            checked={log.is_completed}
            onChange={handleChange}
          />
          Completed
        </label>
        <select name="effort_level" value={log.effort_level} onChange={handleChange}>
          <option>Easy</option>
          <option>Moderate</option>
          <option>Challenging</option>
        </select>
        <button type="submit" className="btn-primary">Log</button>
      </form>
      {lastLogResult && <p style={{ padding: '16px', paddingTop: 0, color: 'var(--accent-primary)' }}>{lastLogResult}</p>}
    </li>
  );
}

export default HabitItem;