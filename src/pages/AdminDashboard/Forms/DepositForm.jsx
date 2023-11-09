import React, { useState } from "react";

import { Button, Modal, InputField, FormProvider } from "../../../components/";
import {
  depositFormInputs,
  initialDepositFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateTransactionForm,
} from "../../../lib/utils/validations";
import { deposit } from "../../../lib/utils/transactions";
import { filterUsersByName } from "../../../lib/utils/users";

export default function DepositForm({ usersData, setAccountState }) {
  const [inputState, setInputState] = useState(depositFormInputs);
  const [formState, setFormState] = useState(initialDepositFormState);

  function handleSubmit(e) {
    e.preventDefault();

    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateTransactionForm(
      inputState,
      setInputState,
      { ...formState, type: "deposit" },
      usersData
    );

    if (isValidForm) {
      const userId = filterUsersByName(formState.username).user_id;

      deposit(userId, formState.amount);

      setAccountState((prevState) => ({
        ...prevState,
        showToast: true,
        showModal: false,
        toastMessage: "Deposit transaction made",
      }));
    } else {
      console.log("Form is not valid");
    }
  }

  function handleCancel() {
    setAccountState((prevState) => ({ ...prevState, showModal: false }));
  }

  function handleInputChange(name, value) {
    setFormState({ ...formState, [name]: value });
  }

  function handleShowModal() {
    setAccountState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  }

  return (
    <>
      <Modal title={"Make a Deposit"} setShowModal={handleShowModal}>
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
