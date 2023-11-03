import generateId from "../utils/generateId";
import transactionsModel from "../constants/transactionsModel.json";

function createTransaction(userId, type, amount) {
  let transactionAmount = type === "deposit" ? amount : -amount;

  return {
    transaction_id: generateId(),
    user_id: userId,
    type: type,
    amount: transactionAmount,
    created_on: new Date(),
  };
}

export function deposit(userId, amount) {
  if (!userId && !amount) return false;

  transactionsModel.push(createTransaction(userId, "deposit", amount));

  return true;
}

export function withdraw(userId, amount) {
  if (!userId && !amount) return false;

  transactionsModel.push(createTransaction(userId, "withdraw", amount));

  return true;
}

export function send(sendingUserId, receivingUserId, amount) {
  if (!sendingUserId && !receivingUserId && !amount) return false;

  transactionsModel.push(createTransaction(sendingUserId, "withdraw", amount));
  transactionsModel.push(createTransaction(receivingUserId, "deposit", amount));

  return true;
}

function getTransactions(userId) {
  let transactions = [];
  transactionsModel.forEach((transaction) => {
    if (transaction.user_id === userId) {
      transactions.push(transaction);
    }
  });

  return transactions;
}

export function storeInitialTranssactions() {
  localStorage.setItem("transactions", JSON.stringify(transactionsModel));
}

export function fetchTransactions() {
  try {
    localStorage.getItem("transactions");
  } catch (error) {
    console.log(error);
  }
}

export function getBalance(userId) {
  let balance = 0;
  let transactions = getTransactions(userId);

  transactions.forEach((transaction) => {
    balance += transaction.amount;
  });

  return balance;
}

export function getMonthlyBalance(userId) {
  const transactions = getTransactions(userId);
  const monthlyBalances = [];
  const monthYearSet = new Set();

  transactions.forEach((transaction) => {
    const [month, day, year] = transaction.created_on.split("/");

    const monthYear = `${month}/${year}`;
    monthYearSet.add(monthYear);
  });

  monthYearSet.forEach((monthYear) => {
    const [month, year] = monthYear.split("/");

    let monthlyBalance = 0;

    transactions.forEach((transaction) => {
      let monthNum = new Date(transaction.created_on)
        .getMonth()
        .toString()
        .padStart(2, "0");

      let yearNum = new Date(transaction.created_on).getFullYear().toString();

      if (monthNum === month && yearNum === year) {
        monthlyBalance += transaction.amount;
      }
    });

    monthlyBalances.push({
      date: month,
      balance: monthlyBalance,
    });
  });

  return monthlyBalances;
}
