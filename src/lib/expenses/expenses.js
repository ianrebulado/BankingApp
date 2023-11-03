import generateId from "../utils/generateId";
import expensesModel from "../constants/expensesModel";
import exp from "constants";

export function getExpense(id) {
  return expensesModel.find((expenses) => expenses.expense_id === id);
}

export function addExpense(newExpense) {
  const expenseId = generateId();
  const createdOn = new Date();
  const updatedOn = createdOn;

  newExpense = {
    ...newExpense,
    expense_id: expenseId,
    created_on: createdOn,
    updated_on: updatedOn,
  };

  const expenses = data ? JSON.parse(data) : [];

  expenses.push(newExpense);
}

export function updateExpense(id, editedAmount) {
  const expenseIndex = findExpenseIndex(id);

  if (expenseIndex !== -1) {
    expensesModel[expenseIndex].amount = editedAmount;
    expensesModel[expenseIndex].updated_on = new Date();
    return true;
  }

  return false;
}

export function deleteExpense(id) {
  const expenseIndex = findExpenseIndex(id);

  if (expenseIndex !== -1) {
    expensesModel.splies(expenseIndex, 1);
    return true;
  }

  return false;
}

export function storeInitialExpenses(data) {
  localStorage.setItem("expenses", JSON.stringify(data));
}

export function getUserExpenses(userId) {
  const expenses = localStorage.getItem("expenses");
  const userExpenses = JSON.parse(expenses).filter(
    (item) => item.user_id === userId
  );
  return userExpenses;
}

function findExpenseIndex(id) {
  return expensesModel.findIndex((expense) => expense.expense_id === id);
}
