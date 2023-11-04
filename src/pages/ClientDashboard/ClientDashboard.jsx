import React, {useState, useEffect} from "react";
import { Button, Card, Header, Modal, Table } from '../../components';
import BalanceCard from "./BalanceCard";
import BalanceChart from "./BalanceChart";

import { FileEdit, FileX } from 'lucide-react';
import { getUserExpenses } from '../../lib/utils/expenses';
import AddExpenseForm from '../ClientDashboard/AddExpenseForm';

import { getBalance, getMonthlyBalance } from "../../lib/utils/transactions";

function ClientDashboard({ user }) {
  const userId = 'u-l2hckqwf1p';
  const balance = getBalance(userId);
  const monthlyBalance = getMonthlyBalance(userId);

  const [expenses, setExpenses] = useState([]);

    const columns = ['expense_id', 'created_on', 'description', 'amount'];
    const data = expenses.map((item) => {
        const {expense_id, created_on, description, amount} = item;
        return {expense_id, created_on, description, amount}
    })

    const userExpenses = getUserExpenses(userId)

    useEffect(()=>{
        setExpenses(userExpenses);
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
      <div className="dashboard">
        <div className="expenses-container">
          <Header user={user} />
          <div className="cards-container">
            <BalanceCard balance={balance} />
            <BalanceChart data={monthlyBalance} />
          </div>
          <Button type={'button'} text={'New Expense'} handleClick={handleAddClick}/>
          {
              showModal && (
                  <Modal title={"New Expense"} >
                      <AddExpenseForm setShowModal={setShowModal} />
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
      </div>
    </>
  );
}

export default ClientDashboard;
