import React, { useEffect, useState } from 'react';
import { Button, Card, Header, Modal, Table } from '../../components';
import { FileEdit, FileX } from 'lucide-react';
import expensesModel from '../../lib/constants/expensesModel';
import { storeInitialExpenses, getUserExpenses } from '../../lib/expenses/expenses';
import AddExpenseForm from './AddExpenseForm';

function BudgetApp() {

    const userId = 'u-l2hckqwf1p';
    const [expenses, setExpenses] = useState([]);

    const columns = ['expense_id', 'created_on', 'description', 'amount'];
    const data = expenses.map((item) => {
        const {expense_id, created_on, description, amount} = item;
        return {expense_id, created_on, description, amount}
    })

    useEffect(()=>{
        setExpenses(
            getUserExpenses(userId)
        );

        storeInitialExpenses(expensesModel);
    }, [])

    const [showModal, setShowModal] = useState(false)
    const handleAddClick = () => {
        setShowModal(true)
    }

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {

    }

    return (
        <>
            <div className='expenses-container'>
                <Header user={'Mae'} />
                <div className="card-container">
                    <Card title={'Current Balance'} content={'100,000'} />
                    <Card title={'Total Expenses'} content={'10,000'} />
                </div>
                <Button type={'button'} text={'Add Expense'} handleClick={handleAddClick}/>
                {
                    showModal && (
                        <Modal title={"New Expense"} onClose={()=>setShowModal(false)}>
                            <AddExpenseForm />
                        </Modal>
                    )
                }
                <Table data={data} columns={columns} itemsPerPage={3}
                    actions={ (
                        <>
                            <FileEdit onClick={() => handleEditClick} />
                            <FileX onClick={() => handleDeleteClick} />
                        </>
                    )} />
            </div>
        </>
    );
}

export default BudgetApp;