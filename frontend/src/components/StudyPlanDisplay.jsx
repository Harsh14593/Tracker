import React from 'react';

function StudyPlanDisplay({ plan, onReset }) {
  // We can add state later to track checked boxes
  return (
    <div>
      <div className="habit-card" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>Your AI-Generated Roadmap</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Total Estimated Study Time: <strong>{plan.totalStudyHours} hours</strong></p>
            </div>
            <button onClick={onReset} className="btn-secondary">Create a New Plan</button>
          </div>
        </div>
      </div>

      {plan.generatedPlan.map((week, index) => (
        <div key={index} className="habit-card">
          <details open={index === 0}>
            <summary style={{ padding: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '1.25rem' }}>
              {week.week}
            </summary>
            <ul style={{ listStyleType: 'none', padding: '0 20px 20px 20px', borderTop: '1px solid var(--border-color)' }}>
              {week.tasks.map((task, taskIndex) => (
                <li key={taskIndex} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" />
                    <span>{task.task}</span>
                  </label>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}

export default StudyPlanDisplay;