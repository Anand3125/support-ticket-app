import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '10px 16px',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
};

export default Button;
