import { useState, useEffect, useMemo } from 'react';
import studyPlanService from '../services/studyPlanService';
import ProgressBar from './ProgressBar';
import CompletionModal from './CompletionModal';

function StudyPlanDisplay({ plan, onReset }) {
  // Local state to manage the plan for instant UI updates
  const [currentPlan, setCurrentPlan] = useState(plan);
  // State to manage the active task filter
  const [filter, setFilter] = useState('All');
  // State to control the visibility of the completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // useMemo efficiently calculates the progress percentage only when the plan changes.
  const progress = useMemo(() => {
    const allTasks = currentPlan.generatedPlan.flatMap(week => week.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(task => task.is_completed).length;
    return (completedTasks / allTasks.length) * 100;
  }, [currentPlan]);

  // This effect syncs the local state if a new plan is passed via props.
  useEffect(() => {
    setCurrentPlan(plan);
  }, [plan]);

  // This effect checks if the plan has been completed to trigger the modal.
  useEffect(() => {
    if (progress === 100 && currentPlan.generatedPlan.flatMap(w => w.tasks).length > 0) {
      setShowCompletionModal(true);
    }
  }, [progress, currentPlan]);

  // Handler for toggling a task's completion status.
  const handleTaskToggle = (weekIndex, taskIndex) => {
    const newPlan = JSON.parse(JSON.stringify(currentPlan));
    const task = newPlan.generatedPlan[weekIndex].tasks[taskIndex];
    const newStatus = !task.is_completed;

    studyPlanService.updateTaskStatus(newPlan._id, task._id, newStatus)
      .then(() => {
        task.is_completed = newStatus;
        setCurrentPlan(newPlan);
      })
      .catch(error => console.error("Failed to update task", error));
  };

  // Handler for deleting the entire study plan.
  const handleDeletePlan = () => {
    if (window.confirm("Are you sure you want to delete this entire plan?")) {
      studyPlanService.deletePlan(currentPlan._id)
        .then(() => onReset())
        .catch(error => console.error("Failed to delete plan", error));
    }
  };

  // Handler for exporting the plan as a text file.
  const handleExport = () => {
    let content = `AI Study Plan for: ${plan.userInput.primaryGoal}\n`;
    content += `Focusing on: ${plan.userInput.focusAreas}\n`;
    content += `========================================\n\n`;
    content += `Total Estimated Study Time: ${plan.totalStudyHours} hours\n\n`;

    plan.generatedPlan.forEach(week => {
      content += `${week.week}\n-------------------\n`;
      week.tasks.forEach(task => {
        content += `- ${task.task}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'My-AI-Study-Plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="habit-card" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ margin: 0 }}>Your AI-Generated Roadmap</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Total Estimated Study Time: <strong>{currentPlan.totalStudyHours} hours</strong></p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleExport} className="btn-secondary">Export</button>
              <button onClick={onReset} className="btn-secondary">Create New</button>
              <button onClick={handleDeletePlan} className="btn-danger">Delete</button>
            </div>
          </div>
          <div>
            <label style={{fontWeight: 500}}>Overall Progress</label>
            <ProgressBar value={progress} />
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setFilter('All')} className={filter === 'All' ? 'btn-primary' : 'btn-secondary'}>All Tasks</button>
        <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'btn-primary' : 'btn-secondary'}>Completed</button>
        <button onClick={() => setFilter('Incomplete')} className={filter === 'Incomplete' ? 'btn-primary' : 'btn-secondary'}>Incomplete</button>
      </div>

      {currentPlan.generatedPlan.map((week, weekIndex) => {
        const filteredTasks = week.tasks.filter(task => {
          if (filter === 'Completed') return task.is_completed;
          if (filter === 'Incomplete') return !task.is_completed;
          return true;
        });
        return (
          <div key={week._id || weekIndex} className="habit-card">
            <details open={weekIndex < 2}>
              <summary style={{ padding: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '1.25rem' }}>
                {week.week}
              </summary>
              {filteredTasks.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: '0 20px 20px 20px', borderTop: '1px solid var(--border-color)' }}>
                  {filteredTasks.map((task) => (
                    <li key={task._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: task.is_completed ? 'line-through' : 'none', color: task.is_completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                        <input 
                          type="checkbox"
                          checked={task.is_completed}
                          onChange={() => handleTaskToggle(weekIndex, currentPlan.generatedPlan[weekIndex].tasks.findIndex(t => t._id === task._id))}
                        />
                        <span>{task.task}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{padding: '0 20px 20px 20px', color: 'var(--text-secondary)'}}>No {filter.toLowerCase()} tasks this week.</p>
              )}
            </details>
          </div>
        );
      })}
      
      <CompletionModal isOpen={showCompletionModal} onClose={() => setShowCompletionModal(false)} />
    </div>
  );
}

export default StudyPlanDisplay;