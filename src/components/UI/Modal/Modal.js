import React from 'react';
import Button from '../Button/Button';
import './Modal.css';

const Modal = ({
  show,
  onClose,
  title,
  children,
  primaryActionLabel,
  secendoryActionLabel,
  onPrimaryActionClick,
  onSeconderyActionClick,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button onClick={onSeconderyActionClick}>
            {secendoryActionLabel}
          </Button>
          <Button onClick={onPrimaryActionClick}>{primaryActionLabel}</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
