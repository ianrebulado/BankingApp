import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from '../../components';
import { FileEdit, FileX } from 'lucide-react';
import expensesModel from '../../lib/constants/expensesModel';

function BudgetApp(props) {

    const [userId, setUserId] = useState('');
    const [expenses, setExpenses] = useState([]);

    const columns = ['expense_id', 'created_on', 'description', 'amount'];
    const data = expensesModel.map((item) => {
        const {expense_id, created_on, description, amount} = item;
        return {expense_id, created_on, description, amount}
    })

    useEffect(()=>{
        setExpenses(data);
    }, [])

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {

    }

    return (
        <>
            <div className='expenses-container'>
                <div className="card-container">
                    <Card title={'Current Balance'} content={'100,000'} />
                    <Card title={'Total Expenses'} content={'10,000'} />
                </div>
                <Button type={'submit'} text={'Add Expense'} handleClick={()=>{}} />
                <Table data={expenses} columns={columns} itemsPerPage={3}
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