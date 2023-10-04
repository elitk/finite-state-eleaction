import React from 'react';

import './Button.css';

const Button = ({
  className = '',
  color = 'primary',
  onClick,
  children,
  ...props
}) => (
  <button className={`custom-btn ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;
