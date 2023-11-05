import React, {useState, useEffect} from "react";
import { Button, Card, Header, Modal, Table } from '../../components';
import BalanceCard from "./BalanceCard";
import BalanceChart from "./BalanceChart";

import { FileEdit, FileX } from 'lucide-react';
import { getUserExpenses, getExpense } from '../../lib/utils/expenses';
import AddExpenseForm from '../ClientDashboard/AddExpenseForm';

import { getBalance, getMonthlyBalance } from "../../lib/utils/transactions";
import { formatDate, formatAmount, sortDescendingOrder } from "../../lib/utils/formatter";

function ClientDashboard({ user }) {
  const userId = 'u-l2hckqwf1p';
  const columns = ['expense_id', 'created_on', 'description', 'amount'];

  const balance = getBalance(userId);
  const monthlyBalance = getMonthlyBalance(userId);
  const userExpenses = getUserExpenses(userId);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState({
        user_id: userId,
        description: null, 
        amount: null
  });

  const updateExpenses = (expenses) => {

    const newData = sortDescendingOrder(expenses).map((item) => {
      const {expense_id, created_on, description, amount} = item;
      const formattedDate = formatDate(created_on)
      const formattedAmount = formatAmount(amount)
      return {expense_id, created_on: formattedDate, description, amount: formattedAmount}
    });

    setData(newData);
  }

  useEffect(()=>{
      updateExpenses(userExpenses);
  }, [])



  const handleAddClick = () => {
      setInputValues({
        user_id: userId,
        description: null, 
        amount: null
      })
      setShowModal(true)
  }

  const handleEditClick = (e) => {
    const row = e.target.closest('tr')
    if(row){
      const expenseId = row.getAttribute('data-id')
      const expenseItem = getExpense(expenseId)
      setInputValues(expenseItem)

      setShowModal(true)
    }
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
                      <AddExpenseForm setShowModal={setShowModal} updateExpenses={updateExpenses} inputValues={inputValues} />
                  </Modal>
              )
          }
          <Table data={data} columns={columns} itemsPerPage={5} rowKey={'expense_id'}
              actions={ (
                  <>
                      <FileEdit onClick={handleEditClick} />
                      <FileX onClick={handleDeleteClick} />
                  </>
              )} />
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
