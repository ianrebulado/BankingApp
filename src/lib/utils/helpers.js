import {
  getBalance,
  getTotalTransactions,
  getTransactionsVolume,
} from "./transactions";
import { filterUsersById, getTotalUsers } from "./users";
import { formatAmount, formatNumber } from "./formatter";

export function filterData(data, property, condition) {
  return data.filter((item) =>
    item[property].toLowerCase().includes(condition.toLowerCase())
  );
}

export function createUsersTable(userData) {
  return userData.map((user) => {
    const { user_id, username, first_name, last_name, email } = user;
    const name = `${first_name} ${last_name}`;
    const balance = formatAmount(getBalance(user_id));
    return { user_id, username, name, email, balance };
  });
}

export function createTransactionsTable(transactionData) {
  return transactionData.map((transaction) => {
    let { created_on, transaction_id, user_id, type, amount } = transaction;
    const name = filterUsersById(user_id).username;
    amount = formatAmount(amount);
    return { created_on, transaction_id, name, type, amount };
  });
}

export function signout() {
  localStorage.setItem("signedIn", false);
  localStorage.removeItem("SignedInUser");
  localStorage.removeItem("username");
}

export function getAdminCardsData() {
  const totalUsers = formatNumber(getTotalUsers());
  const totalTransactions = formatNumber(getTotalTransactions());
  const totalTransactionsVolume = formatNumber(getTransactionsVolume());

  return { totalUsers, totalTransactions, totalTransactionsVolume };
}

export function generateId(type) {
  let id = "";

  if (type === "user") {
    id = "u-" + Math.random().toString(36).substring(2, 12);
  } else {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString();
    const day = now.getDate().toString();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();
    const seconds = now.getSeconds().toString();
    const milliseconds = now.getMilliseconds().toString();

    id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  return id;
}
