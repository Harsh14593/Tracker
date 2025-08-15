import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import PlanGeneratorForm from '../components/PlanGeneratorForm';
import StudyPlanDisplay from '../components/StudyPlanDisplay';
import StudyPlanSkeleton from '../components/StudyPlanSkeleton';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // State to hold the generated study plan object
  const [studyPlan, setStudyPlan] = useState(null);
  
  // State to manage the loading skeleton display
  const [isLoading, setIsLoading] = useState(false);

  // Effect to protect the route and ensure a user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  // Handler for logging out the user
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  return (
    <div className="page-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}</h1>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </header>
      
      <main>
        {/* This is the core conditional rendering logic */}
        {isLoading ? (
          // 1. If loading, show the skeleton placeholder
          <StudyPlanSkeleton />
        ) : !studyPlan ? (
          // 2. If not loading and no plan exists, show the generator form
          <PlanGeneratorForm 
            onPlanGenerated={setStudyPlan} 
            setIsLoading={setIsLoading} 
          />
        ) : (
          // 3. If not loading and a plan exists, show the plan display
          <StudyPlanDisplay 
            plan={studyPlan} 
            onReset={() => setStudyPlan(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard;