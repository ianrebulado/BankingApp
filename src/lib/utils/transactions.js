import transactionsModel from "../constants/transactionsModel";

export function deposit() {}

export function withdraw() {}

export function send() {}

function getTransactions(userId) {
  let transactions = [];
  transactionsModel.forEach((transaction) => {
    if (transaction.user_id === userId) {
      transactions.push(transaction);
    }
  });

  return transactions;
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
