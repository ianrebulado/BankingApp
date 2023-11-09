import React, { useEffect, useState, useRef } from 'react';
import { FormProvider } from '../../../components/Global/Form/FormContext';
import { Button, InputField } from '../../../components';
import {validateExpenseForm} from '../../../lib/utils/validations';
import { addExpense, getUserExpenses, updateExpense } from '../../../lib/utils/expenses';

const AddExpenseForm = ({setShowModal, setShowToast, updateExpenses, inputValues}) => {
    const user = JSON.parse(localStorage.getItem('SignedInUser'));
    const userId = user.user_id;
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

    const editExpense = inputValues.hasOwnProperty('expense_id');

    const [inputState, setInputState] = useState(inputs);
    const [formState, setFormState] = useState(inputValues)

    const focusRef = useRef(null);

    useEffect(() => {
        if(focusRef.current){
            focusRef.current.focus();
        }
    }, [])
    

    const handleInputChange = (name, value) => {
        setFormState({ ...formState, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validForm = validateExpenseForm(inputState, setInputState, formState)
        
        if(validForm){

            !editExpense 
                ? addExpense(formState) 
                : updateExpense(formState.expense_id, formState.amount)

            const expenses = getUserExpenses(userId);

            updateExpenses(expenses);
            setShowToast(true);
            setShowModal(false);

        }
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    

    return (
        <>
            
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
                                focusRef={'description'}
                            />
                        ))
                    }
                    <div className="buttons-container">
                        <Button type={'submit'} text={editExpense ? 'Update Expense' : 'Add Expense'} />
                        <Button type={'button'} text={'Cancel'} handleClick={handleCancel} secondary />
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddExpenseForm;