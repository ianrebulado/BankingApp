// FormContext.js
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [formState, setFormState] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    //add submission logic
  };

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  return (
    <FormContext.Provider value={{ formState, handleInputChange, handleSubmit }}>
      <form onSubmit={handleSubmit}>
        {children}
        <button type="submit">Submit</button>
      </form>
    </FormContext.Provider>
  );
}
