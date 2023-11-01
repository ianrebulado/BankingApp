import React, { useState } from 'react';
import { Button, Card, Table } from '../../components';

function BudgetApp(props) {

    const [userId, setUserId] = useState('');
    const [expenses, setExpenses] = useState([]);

    return (
        <>
            <div className='expenses-container'>
                <div className="card-container">
                    <Card label={'Current Balance'} value={'100,000'} />
                    <Card label={'Total Expenses'} value={'10,000'} />
                </div>
                <Button type={'submit'} text={'Add Expense'} handleClick={()=>{}} />
                <Table data={[]} columns={['ID', 'Date', 'Description', 'Amount']} />
            </div>
        </>
    );
}

export default BudgetApp;