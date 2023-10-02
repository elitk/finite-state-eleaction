import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children, footerContent }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footerContent}</div>
      </div>
    </div>
  );
}

export default Modal;
