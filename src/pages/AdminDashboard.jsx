import React from 'react';
import Header from '../components/Global/Header/Header';
import Card from '../components/Global/Card/Card';
import Buttons from '../components/Global/Button/Button';
import Table from '../components/Global/Table/Table';
import usersModel from '../lib/constants/usersModel';

function AdminDashboard({user}) {
    const columns = ['user_id', 'first_name', 'last_name', 'email', 'balance'];
    const data = usersModel.map((item) => {
        const { user_id, first_name, last_name, email } = item;
        const { balance } = 0.00;
        return { user_id, first_name, last_name, email, balance }
    })

    return (
        <>
            <div className='dashboard'>
                <Header user={user} />
                <div className='cards-container'>
                    <Card label={'Total Users'} value={''} />
                    <Card label={'Total Transactions'} value={''}/>
                    <Card label={'Transaction Volume'} value={''}/>
                </div>
                <div className="search-container">
                    <span>Search</span>
                    <div className="buttons-container">
                        <Buttons type={'submit'} text={'New User'} handleClick={()=>{}} />
                    </div>
                </div>
                <Table data={data} columns={columns} itemsPerPage={3}/>
            </div>
        </>
    );
}

export default AdminDashboard;