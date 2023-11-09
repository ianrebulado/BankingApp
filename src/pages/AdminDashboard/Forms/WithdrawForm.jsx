import React, { useState } from "react";

import { Button, Modal, InputField, FormProvider } from "../../../components/";
import {
  withdrawFormInputs,
  initialWithdrawFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateTransactionForm,
} from "../../../lib/utils/validations";
import { withdraw } from "../../../lib/utils/transactions";
import { filterUsersByUsername } from "../../../lib/utils/users";

export default function WithdrawForm({ usersData, setAccountState }) {
  const [inputState, setInputState] = useState(withdrawFormInputs);
  const [formState, setFormState] = useState(initialWithdrawFormState);

  function handleSubmit(e) {
    e.preventDefault();

    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateTransactionForm(
      inputState,
      setInputState,
      { ...formState, type: "withdraw" },
      usersData
    );

    if (isValidForm) {
      const userId = filterUsersByUsername(formState.username).user_id;

      withdraw(userId, formState.amount);

      setAccountState((prevState) => ({
        ...prevState,
        showToast: true,
        showModal: false,
        toastMessage: "Withdraw transaction made",
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
      <Modal title={"Make a Withdrawal"} setShowModal={handleShowModal}>
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
            <Button type={"submit"} text={"Withdraw"} />
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
