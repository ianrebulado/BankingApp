// InputField.js
import React from 'react';

function InputField({ type, name, placeholder, message }) {
  const { formState, handleInputChange } = useFormContext();

  const handleChange = (e) => {
    handleInputChange(name, e.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formState[name] || ''}
        onChange={handleChange}
      />
      <span className="error">{message}</span>
    </div>
  );
}

export default InputField;
