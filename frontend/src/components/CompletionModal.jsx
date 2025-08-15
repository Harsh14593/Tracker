import React from 'react';

function CompletionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h1>🎉 Congratulations! 🎉</h1>
        <p>You've completed all the tasks in your study plan. You're well on your way to success!</p>
        <button className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CompletionModal;