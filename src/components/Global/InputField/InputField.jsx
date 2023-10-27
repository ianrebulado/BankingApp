import React from 'react';
import { useFormContext } from '../Form/FormContext';

function InputField({ type, name, placeholder, message }) {
  const { formValues, handleInputChange } = useFormContext();


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
        value={formValues[name] || ''}
        onChange={handleChange}
      />
      <span className="error">{message}</span>
    </div>
  );
}

export default InputField;
