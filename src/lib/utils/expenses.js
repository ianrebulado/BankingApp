import generateId from "../utils/generateId";
import expensesModel from "../constants/expensesModel.json";

export function getExpense(id) {
  return expensesModel.find((expenses) => expenses.expense_id === id);
}

export function addExpense(newExpense) {
  const expenseId = generateId();
  const createdOn = new Date();
  const updatedOn = createdOn;

  const data = expensesModel
  const expenses = data ? data : [];

  newExpense = {
    expense_id: expenseId,
    ...newExpense,
    created_on: createdOn,
    updated_on: updatedOn,
  };

  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export function updateExpense(id, editedAmount) {
  const expenseIndex = findExpenseIndex(id);

  if (expenseIndex !== -1) {
    expensesModel[expenseIndex].amount = editedAmount;
    expensesModel[expenseIndex].updated_on = new Date();

    localStorage.setItem('expenses', JSON.stringify(expensesModel))
    return true;
  }

  return false;
}

export function deleteExpense(id) {
  const expenseIndex = findExpenseIndex(id);

  if (expenseIndex !== -1) {
    expensesModel.splice(expenseIndex, 1);
    localStorage.setItem('expenses', JSON.stringify(expensesModel));
    return true;
  }

  return false;
}

export function storeInitialExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expensesModel));
}

export function fetchExpenses() {
  try {
    return localStorage.getItem("transactions");
  } catch (error) {
    console.log(error);
  }
}

export function getUserExpenses(userId) {
  const expenses = localStorage.getItem("expenses");

  if(!expenses) return;

  const userExpenses = JSON.parse(expenses).filter(
    (item) => item.user_id === userId
  );

  return userExpenses;
}

export function findExpenseIndex(id) {
  return expensesModel.findIndex((expense) => expense.expense_id === id);
}
