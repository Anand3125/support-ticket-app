import React from 'react';

type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        width: '100%',
        marginBottom: '12px'
      }}
    />
  );
};

export default Input;
