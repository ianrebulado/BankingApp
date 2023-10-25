import React from 'react';
import Header from '../components/Global/Header/Header';
import Card from '../components/Global/Card/Card';
import Buttons from '../components/Global/Button/Button';
import Table from '../components/Global/Table/Table';

function AdminDashboard({user}) {
    return (
        <>
            <div className='admin-dashboard'>
                <Header user={user} />
                <div className='cards-container'>
                    <Card label={'Total Users'} value={''} />
                    <Card label={'Total Transactions'} value={''}/>
                    <Card label={'Transaction Volume'} value={''}/>
                </div>
                <div className="search-container">
                    <span>Search</span>
                    <div className="buttons-container">
                        <Buttons type={'submit'} text={'Withdraw'} handleClick={()=>{}} />
                        <Buttons type={'submit'} text={'Deposit'} handleClick={()=>{}} />
                        <Buttons type={'submit'} text={'Transfer'} handleClick={()=>{}} />
                    </div>
                </div>
                <Table data={[]} columns={['User', 'Transaction ID', 'Amount']}/>
            </div>
        </>
    );
}

export default AdminDashboard;