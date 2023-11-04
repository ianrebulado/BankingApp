import React, { useState } from 'react';
import { FormProvider } from '../../components/Global/Form/FormContext';
import { Button, InputField } from '../../components';
import {validateExpenseForm} from '../../lib/utils/validations';
import { addExpense } from '../../lib/utils/expenses';

const AddExpenseForm = ({setShowModal, updateExpenses}) => {
    const userId ='u-l2hckqwf1p';
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
        user_id: userId,
        description: null, 
        amount: null
    })

    const handleInputChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validForm = validateExpenseForm(inputState, setInputState, formState)
        
        if(validForm){
            addExpense(formState)
            updateExpenses();
            setShowModal(false)
        }
    }

    const handleCancel = () => {
        setShowModal(false)
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
                    <Button type={'button'} text={'Cancel'} handleClick={handleCancel} secondary />
                </div>
            </form>
        </FormProvider>
    );
}

export default AddExpenseForm;