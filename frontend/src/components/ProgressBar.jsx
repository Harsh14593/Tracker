import React from 'react';

function ProgressBar({ value }) {
  const progress = Math.round(value);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
        {progress > 10 && `${progress}%`}
      </div>
    </div>
  );
}

export default ProgressBar;