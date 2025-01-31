// ConfirmationModal.jsx
import React from 'react';
import Modal from 'react-modal';
import './ConfirmationModal.css';

Modal.setAppElement('#root'); // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const ConfirmationModal = ({isOpen, onClose, onConfirm, message}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <p>{message}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
