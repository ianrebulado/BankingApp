import React, { useState } from 'react';
import { Card } from '../../components';

function BudgetApp(props) {

    const [userId, setUserId] = useState('');
    const [expenses, setExpenses] = useState([]);

    return (
        <>
            <div className='expenses-container'>
                <Card label={'Current Balance'} value={'100,000'} />
                <Card label={'Total Expenses'} value={'10,000'} />
            </div>
        </>
    );
}

export default BudgetApp;