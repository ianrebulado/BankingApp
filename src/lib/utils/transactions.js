import usersModel from "../constants/usersModel";
import generateId from "../utils/generateId";
import transactionsModel from "../constants/transactionsModel.json";

function createTransaction(userId, type, amount) {
  let transactionsData = fetchTransactions();
  let transactionAmount = type === "deposit" ? amount : -amount;

  transactionsData.push({
    transaction_id: generateId(),
    user_id: userId,
    type: type,
    amount: transactionAmount,
    created_on: new Date(),
  });

  storeTransactions(transactionsData);
}

export function deposit(userId, amount) {
  if (!userId && !amount) return false;

  createTransaction(userId, "deposit", amount);

  return true;
}

export function withdraw(userId, amount) {
  if (!userId && !amount) return false;

  let transactionsData = fetchTransactions();

  transactionsData.push(createTransaction(userId, "withdraw", amount));

  return true;
}

export function send(sendingUserId, receivingUserId, amount) {
  if (!sendingUserId && !receivingUserId && !amount) return false;
  let transactionsData = fetchTransactions();

  transactionsData.push(createTransaction(sendingUserId, "withdraw", amount));
  transactionsData.push(createTransaction(receivingUserId, "deposit", amount));

  return true;
}

function getTransactions(userId) {
  let transactionsData = fetchTransactions();
  let transactions = [];

  transactionsData.forEach((transaction) => {
    if (transaction.user_id === userId) {
      transactions.push(transaction);
    }
  });

  return transactions;
}

function storeTransactions(transactionsData) {
  localStorage.setItem("transactions", JSON.stringify(transactionsData));
}

export function fetchTransactions() {
  const modelData = transactionsModel;

  const localStorageData = localStorage.getItem("transactions");

  return !localStorageData ? modelData : JSON.parse(localStorageData);
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

export function getTotalTransactions() {
  let transactionsData = fetchTransactions();

  if (transactionsData) {
    return transactionsData.length;
  }
}

export function getTransactionsVolume() {
  let transactionsData = fetchTransactions();

  if (transactionsData) {
    let totalTransactionsVolumne = 0;

    transactionsData.forEach((transaction) => {
      totalTransactionsVolumne += parseFloat(transaction.amount);
    });

    return totalTransactionsVolumne;
  }
}
