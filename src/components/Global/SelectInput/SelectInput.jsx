import { useFormContext } from "../Form/FormContext";

function SelectInput({ label, name, placeholder, options }) {
  const { formValues, handleInputChange } = useFormContext();

  const handleChange = (e) => {
    handleInputChange(name, e.target.value);
  };

  return (
    <div className="select-input">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        value={formValues[name] || ""}
        onChange={handleChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
