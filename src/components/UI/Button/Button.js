import React from 'react';

import './Button.css';

const Button = ({
  className = '',
  color = 'primary',
  onClick,
  children,
  ...props
}) => (
  <button data-testid="button-id" className={`custom-btn ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;
