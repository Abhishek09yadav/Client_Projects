import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, user, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Are you sure you want to remove {user.name}?</h3>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={() => onConfirm(user.email)}>
                        Yes
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
