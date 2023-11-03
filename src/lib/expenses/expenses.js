import generateId from "../utils/generateId";

export function getExpense(expenseId) {}

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

export function updateExpense(expenseId) {}

export function deleteExpense(expenseId) {}

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
