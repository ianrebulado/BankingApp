import { useState, useEffect } from "react";
import { Button, Modal, InputField } from "../../../components/";
import { FormProvider } from "../../../components/Global/Form/FormContext";
import usersModel from "../../../lib/constants/usersModel";
import { createUser } from "../../../lib/utils/users";
import {
  createUserFormInputs,
  initialCreateUserFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateSignUpForm,
} from "../../../lib/utils/validations";

export default function CreateUserForm({ setShowModal, setShowToast }) {
  const [inputState, setInputState] = useState(createUserFormInputs);
  const [formState, setFormState] = useState(initialCreateUserFormState);

  function handleSubmit(e) {
    e.preventDefault();
    let isValidForm = false;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateSignUpForm(
      inputState,
      setInputState,
      formState,
      usersModel
    );

    if (isValidForm) {
      createUser(formState);

      setShowToast(true);
      setShowModal(false);
    } else {
      console.log("Form is not valid");
    }
  }

  function handleCancel() {
    setShowModal(false);
  }

  function handleInputChange(name, value) {
    setFormState({ ...formState, [name]: value });
  }

  return (
    <>
      <Modal title={"Create User"}>
        <FormProvider
          formValues={formState}
          handleInputChange={handleInputChange}
        >
          <form onSubmit={handleSubmit}>
            {inputState.map(
              ({ type, label, name, placeholder, message }, index) => (
                <InputField
                  key={index}
                  type={type}
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  message={message}
                />
              )
            )}
            <Button type={"submit"} text={"Create User"} />
            <Button
              type={"button"}
              text={"Cancel"}
              handleClick={handleCancel}
              secondary
            />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
