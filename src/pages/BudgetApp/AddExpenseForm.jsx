import React, { useState } from 'react';
import { FormProvider } from '../../components/Global/Form/FormContext';
import { Button, InputField } from '../../components';
// import checkMissingValues from '../../lib/utils/validations'

function AddExpenseForm(props) {
    const inputs = [
        {
            type: "text",
            label: "Description",
            name: "description",
            placeholder: "Description",
            isRequired: true,
            message: ""
        },
        {
            type: "number",
            label: "Amount",
            name: "amount",
            placeholder: "Amount",
            isRequired: true,
            message: ""
        }
    ]

    const [inputState, setInputState] = useState(inputs);
    const [formState, setFormState] = useState({
        description: null, 
        amount: null
    })

    const handleInputChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
    }

    const handleSubmit = (e) => {
        e.prevendDefault();
        // checkMissingValues(inputState, formState)
    }

    return (
        <FormProvider formValues={formState} handleInputChange={handleInputChange}>
            <form onSubmit={handleSubmit}>
                {
                    inputState.map(({type, label, name, placeholder, message}, index) => (
                        <InputField
                            key={index}
                            type={type}
                            label={label}
                            name={name}
                            placeholder={placeholder}
                            message={message}
                        />
                    ))
                }
                <div className="buttons-container">
                    <Button type={'submit'} text={'Add Expense'} />
                    <Button type={'button'} text={'Cancel'} secondary />
                </div>
            </form>
        </FormProvider>
    );
}

export default AddExpenseForm;