import React, { useState } from 'react';
import { Button, Card, Table } from '../../components';
import { FileEdit, FileX } from 'lucide-react';
import expensesModel from '../../lib/constants/expensesModel';

function BudgetApp(props) {

    const [userId, setUserId] = useState('');
    const [expenses, setExpenses] = useState([]);

    const data = expensesModel

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
                <Table data={[]} columns={['ID', 'Date', 'Description', 'Amount']} 
                    actions={(item) => (
                        <>
                            <FileEdit onClick={() => handleEditClick(item)} />
                            <FileX onClick={() => handleDeleteClick(item)} />
                        </>
                    )} />
            </div>
        </>
    );
}

export default BudgetApp;