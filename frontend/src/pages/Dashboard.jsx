import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import PlanGeneratorForm from '../components/PlanGeneratorForm';
import StudyPlanDisplay from '../components/StudyPlanDisplay';

function Dashboard() {
  const navigate = useNavigate();
  const [studyPlan, setStudyPlan] = useState(null); // State to hold the generated plan
  const user = JSON.parse(localStorage.getItem('user'));

  // Simple effect to ensure user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  return (
    <div className="page-container">
      <header className="dashboard-header">
        <h1>AI Study Planner</h1>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </header>
      
      <main>
        {/* Conditionally render the form or the display */}
        {!studyPlan ? (
          <PlanGeneratorForm onPlanGenerated={setStudyPlan} />
        ) : (
          <StudyPlanDisplay plan={studyPlan} onReset={() => setStudyPlan(null)} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;