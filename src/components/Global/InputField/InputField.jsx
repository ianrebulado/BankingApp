import { useEffect, useState } from "react";
import { useFormContext } from "../Form/FormContext";

function InputField({ type, label, name, placeholder, message }) {
  const { formValues, handleInputChange } = useFormContext();

  const handleChange = (e) => {
    handleInputChange(name, e.target.value);
  };

  return (
    <div className="inputField">
      <label className="input-label" htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formValues[name] || ""}
        onChange={handleChange}
      />
      <span className={message ? "error" : "" }>{message}</span>
    </div>
  );
}

export default InputField;
