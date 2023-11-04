import React, { useState } from "react";

import { Button, Modal, InputField, FormProvider } from "../../../components/";
import {
  depositFormInputs,
  initialDepositFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateDepositForm,
} from "../../../lib/utils/validations";

export default function DepositForm({ usersData, setShowModal, setShowToast }) {
  const [inputState, setInputState] = useState(depositFormInputs);
  const [formState, setFormState] = useState(initialDepositFormState);

  function handleSubmit(e) {
    e.preventDefault();

    let isValidForm = false;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateDepositForm(
      inputState,
      setInputState,
      formState,
      usersData
    );

    if (isValidForm) {
      deposit(formState);

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
      <Modal title={"Make a Deposit"}>
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
            <Button type={"submit"} text={"Deposit"} />
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
