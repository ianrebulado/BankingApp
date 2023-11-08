import generateId from "../utils/generateId";
import expensesModel from "../constants/expensesModel.json";
import { formatDate } from "./formatter";

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
  const expenses = expensesModel.filter((expense) => expense.user_id === userId);

  if(!expenses) return;

  return expenses;
}

export function getTotalExpenses(userId) {
  const expenses = getUserExpenses(userId);
  let total = 0;

  if(expenses){
    expenses.forEach((expense) => {
      total += Number(expense.amount);
    });
  }

  return total;
}

export function findExpenseIndex(id) {
  return expensesModel.findIndex((expense) => expense.expense_id === id);
}

export function getMonthlyExpenses(userId){

  const expenses = getUserExpenses(userId);

    const monthlyExpenses = [];
    const monthYearSet = new Set();

    if(!expenses) return;
  
    expenses.forEach((expense) => {
      const [year, month, day] = formatDate(expense.created_on).split('-');
      const monthYear = `${month}/${year}`
      monthYearSet.add(monthYear);
    });

    monthYearSet.forEach((monthYear) => {
      const [month, year] = monthYear.split('/');

      let monthExpense = 0;

      expenses.forEach((expense) => {
        let monthNum = new Date(expense.created_on)
          .getMonth() + 1;

          monthNum = monthNum.toString().padStart(2,"0");

        let yearNum = new Date(expense.created_on)
          .getFullYear()
          .toString();

        if(monthNum === month && yearNum === year){
          monthExpense += Number(expense.amount);
        }
      });   

      monthlyExpenses.push({
        date: month,
        balance: monthExpense,
      });
    });

    return monthlyExpenses;

  }