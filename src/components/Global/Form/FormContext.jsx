// FormContext.js
import { createContext, useContext } from 'react';

const FormContext = createContext();

export function useFormContext() {
  return useContext(FormContext);
}

export function FormProvider({ formValues, handleInputChange, children }) {


  return (
    <FormContext.Provider value={{ formValues, handleInputChange }}>
        {children}
    </FormContext.Provider>
  );
}
