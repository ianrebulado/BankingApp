import React, { useState, useEffect } from "react";
import { Button, Card, Header, Modal, Table, Toast } from "../../components";
import BalanceCard from "./Cards/BalanceCard";
import BalanceChart from "./Cards/BalanceChart";

import { FileEdit, Trash2, LogOut, PlusSquare } from "lucide-react";
import {
  getUserExpenses,
  getExpense,
  getTotalExpenses,
} from "../../lib/utils/expenses";
import AddExpenseForm from "./Forms/AddExpenseForm";

import { getBalance, getMonthlyBalance } from "../../lib/utils/transactions";
import {
  formatDate,
  formatAmount,
  sortDescendingOrder,
} from "../../lib/utils/formatter";
import ConfirmExpenseDelete from "./Forms/ConfirmExpenseDelete";

function ClientDashboard() {
  const user = JSON.parse(localStorage.getItem("SignedInUser"));

  const userId = user.user_id;

  const columns = ["expense_id", "created_on", "description", "amount"];
  const initialInput = { user_id: userId, description: null, amount: null };

  let totalExpenses = getTotalExpenses(userId);
  const balance = getBalance(userId);
  const monthlyBalance = getMonthlyBalance(userId);
  const userExpenses = getUserExpenses(userId);

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteExpense, setDeleteExpense] = useState({});
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState(initialInput);
  const [action, setAction] = useState("");

  const updateExpenses = (expenses) => {
    if (expenses) {
      const newData = expenses.map((item) => {
        const { expense_id, created_on, description, amount } = item;
        const formattedDate = formatDate(created_on);
        const formattedAmount = formatAmount(amount);

        return {
          expense_id,
          created_on: formattedDate,
          description,
          amount: formattedAmount,
        };
      });

      setData(newData);
    }

    setInputValues(initialInput);
  };

  useEffect(() => {
    updateExpenses(userExpenses);
  }, []);

  const handleAddClick = () => {
    setInputValues(initialInput);
    setShowModal(true);
    setAction("add");
  };

  const handleEditClick = (e) => {
    const row = e.target.closest("tr");

    if (row) {
      const expenseId = row.getAttribute("data-id");
      const expenseItem = getExpense(expenseId);

      setInputValues(expenseItem);
      setShowModal(true);
      setAction("update");
    }
  };

  const handleDeleteClick = (e) => {
    const expenseId = e.target.closest("tr").getAttribute("data-id");
    const expense = getExpense(expenseId);

    setDeleteExpense(expense);
    setShowDeleteConfirm(true);
    setShowModal(true);
    setAction("delete");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <>
      {showToast && (
        <Toast
          type={"success"}
          message={
            action === "delete"
              ? "expense succesfully deleted."
              : action === "add"
              ? "expense successfully added."
              : "expense successfully updated."
          }
        />
      )}
      <div className="client-dashboard">
        <div className="expenses-container">
          <div className="header-container">
            <Header user={user.first_name} />
            <LogOut className="logout-icon" />
          </div>
          <div className="cards-container">
            <div className="balance-cards-container">
              <BalanceCard title={"Account Balance"} balance={balance} />
              <BalanceCard title={"Total Expenses"} balance={totalExpenses} />
            </div>
            <div className="chart-container">
              <BalanceChart title={"Expenses Overview"} data={monthlyBalance} />
            </div>
          </div>
          <Button
            type={"button"}
            text={"New Expense"}
            handleClick={handleAddClick}
          />
          {showModal && (
            <Modal
              title={
                showDeleteConfirm
                  ? "Delete Expense"
                  : inputValues.expense_id
                  ? "Update Expense"
                  : "New Expense"
              }
              setShowModal={setShowModal}
            >
              {showDeleteConfirm ? (
                <ConfirmExpenseDelete
                  expense={deleteExpense}
                  setShowDeleteConfirm={setShowDeleteConfirm}
                  setShowModal={setShowModal}
                  updateExpenses={updateExpenses}
                  setShowToast={setShowToast}
                />
              ) : (
                <AddExpenseForm
                  setShowModal={setShowModal}
                  updateExpenses={updateExpenses}
                  inputValues={inputValues}
                  setShowToast={setShowToast}
                />
              )}
            </Modal>
          )}
          <Table
            data={data}
            columns={columns}
            itemsPerPage={5}
            rowKey={"expense_id"}
            actions={
              <>
                <FileEdit className="edit-icon" onClick={handleEditClick} />
                <Trash2 className="delete-icon" onClick={handleDeleteClick} />
              </>
            }
          />
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
