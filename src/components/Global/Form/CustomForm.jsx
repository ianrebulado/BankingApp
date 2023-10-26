import { FormProvider } from './FormContext';
import InputField from './InputField';

export default function CustomForm({ inputs }) {
  return (
    <FormProvider>
      {inputs.map((input, index) => (
        <InputField
          key={index}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          status={input.status}
          message={input.message}
        />
      ))}
    </FormProvider>
  );
}