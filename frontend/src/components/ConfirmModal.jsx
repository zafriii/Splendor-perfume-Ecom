import React from 'react';
import './confirmModal.css';

const ConfirmModal = ({ show, message, onConfirm, onCancel, confirming }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button 
            onClick={onConfirm} 
            disabled={confirming}
            className={confirming ? 'loading' : ''}
          >
            {confirming ? 'Confirming...' : 'Yes'}
          </button>
          <button onClick={onCancel} disabled={confirming}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
