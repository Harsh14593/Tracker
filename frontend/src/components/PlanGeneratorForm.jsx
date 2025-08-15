import { useState } from 'react';
import aiService from '../services/aiService';

function PlanGeneratorForm({ onPlanGenerated }) {
  const [formData, setFormData] = useState({
    skillLevel: 'Beginner',
    timeCommitment: 10,
    primaryGoal: 'Internship Prep',
    focusAreas: 'Data Structures & Algorithms, React, Node.js',
    targetDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    aiService.generatePlan(formData)
      .then(generatedPlan => {
        onPlanGenerated(generatedPlan);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to generate plan. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="habit-card">
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <div className="auth-header" style={{ marginBottom: '32px' }}>
          <h1>Create Your Personalized Study Plan</h1>
          <p>Fill out the details below, and our AI will craft a weekly roadmap for you.</p>
        </div>
        
        {/* Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="form-group">
            <label>Current Skill Level</label>
            <select name="skillLevel" value={formData.skillLevel} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
            </select>
          </div>
          <div className="form-group">
            <label>Primary Goal</label>
            <select name="primaryGoal" value={formData.primaryGoal} onChange={handleChange}>
              <option>Internship Prep</option>
              <option>Full-Time Job Prep</option>
            </select>
          </div>
          <div className="form-group">
            <label>Weekly Time Commitment (Hours)</label>
            <input type="number" name="timeCommitment" value={formData.timeCommitment} onChange={handleChange} min="1" required />
          </div>
          <div className="form-group">
            <label>Target Date</label>
            <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Key Focus Areas (comma-separated)</label>
            <input type="text" name="focusAreas" value={formData.focusAreas} onChange={handleChange} placeholder="e.g., System Design, React, AWS" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }} disabled={isLoading}>
          {isLoading ? 'Generating Plan...' : 'Generate My Plan'}
        </button>
        {error && <p style={{ color: 'var(--danger-color)', marginTop: '16px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default PlanGeneratorForm;