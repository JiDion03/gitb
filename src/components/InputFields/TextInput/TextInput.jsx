import React from 'react';
import './TextInput.less';

const TextInput = ({ label, value, name, onChange, placeholder, type = "text" }) => {
  return (
    <div className="text-input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="text-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
