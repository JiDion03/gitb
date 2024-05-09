import React from 'react';

const TextInput = ({ label, value, name, onChange, placeholder }) => {
  return (
    <div className="text-input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
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
