import React from 'react';

function StudyPlanSkeleton() {
  return (
    <div>
      <div className="habit-card" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '20px' }}>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-line"></div>
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="habit-card">
          <div style={{ padding: '20px' }}>
            <div className="skeleton skeleton-line" style={{ width: '50%', height: '28px', marginBottom: '20px' }}></div>
            <div className="skeleton skeleton-line" style={{ marginBottom: '20px' }}></div>
            <div className="skeleton skeleton-line skeleton-line-short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudyPlanSkeleton;