import React, { useState } from 'react';
import { initialTransferFormState, transferFormInputs } from '../../../lib/constants/globals';
import { FormProvider, InputField, Button } from '../../../components';
import { validateTransferForm } from '../../../lib/utils/validations';
import { filterUsersById } from '../../../lib/utils/users';

function SendAmount({ userId, usersData, setShowModal, setShowToast }) {
    const sendingUsername = filterUsersById(userId)
    const [inputState, setInputState] = useState(transferFormInputs);
    const [formState, setFormState] = useState(initialTransferFormState);

    const handleInputChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
        console.log(formState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValidForm = false;
        isValidForm = validateTransferForm(
            inputState,
            setInputState,
            { ...formState,
                type: "transfer",
                sendingUsername: sendingUsername.username
            },
            usersData
        )

        console.log(isValidForm, formState)
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    return (
        <div>
            <FormProvider formValues={formState} handleInputChange={handleInputChange}>
                <form onSubmit={handleSubmit}>
                    {inputState.map(
                        ({ type, label, name, placeholder, message }, index) => {
                            return name !== "sendingUsername" ? (
                                <InputField 
                                    key={index}
                                    type={type}
                                    label={label}
                                    name={name}
                                    placeholder={placeholder}
                                    message={message}
                                />
                            ) : null
                        }
                    )}
                    <Button type={"submit"} text={"Transfer"} />
                    <Button
                        type={"button"}
                        text={"Cancel"}
                        handleClick={handleCancel}
                        secondary
                    />
                </form>
            </FormProvider>
        </div>
    );
}

export default SendAmount;