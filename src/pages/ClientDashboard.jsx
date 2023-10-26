import React from 'react';
import Header from '../components/Global/Header/Header';
import Card from '../components/Global/Card/Card';
import Buttons from '../components/Global/Button/Button';
import Table from '../components/Global/Table/Table';

function ClientDashboard({user}) {
    return (
        <>
            <div className='dashboard'>
                <Header user={user} />
                <div className="cards-container">
                    <Card label={''} value={''} />
                    <Card label={''} value={''} />   
                </div>
                <Table data={[]} columns={['Expenses', 'Date', 'Amount']} />
                <div className="buttons-container">
                    <Buttons type={'submit'} text={'Edit'} handleClick={()=>{}} />
                    <Buttons type={'submit'} text={'Delete'} handleClick={()=>{}} />
                </div>
            </div>
        </>
    );
}

export default ClientDashboard;