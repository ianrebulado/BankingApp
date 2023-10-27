https://github.com/ianrebulado/BankingApp/pull/21/conflict?name=src%252Fcomponents%252FGlobal%252FInputField%252FInputField.jsx&ancestor_oid=97592fd7ee3647ebe1511c1efa6735ba7046a0a8&base_oid=e86d4eab5bab0b0aadcb51712d3794535eec836f&head_oid=d6e5cf0f15798887c545d8b42ae8c71d67ba4b66import React from 'react';
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
