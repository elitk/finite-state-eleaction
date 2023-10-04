import React from 'react';
import Button from '../Button/Button';
import './Modal.css';

const Modal = ({
  show,
  onClose,
  title,
  children,
  primaryActionClassName,
  secendoryActionClassName,
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
          <div className="close-icon" onClick={onClose}>
            &times;
          </div>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button
            className={secendoryActionClassName}
            onClick={onSeconderyActionClick}
          >
            {secendoryActionLabel}
          </Button>
          <Button
            className={primaryActionClassName}
            onClick={onPrimaryActionClick}
          >
            {primaryActionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
