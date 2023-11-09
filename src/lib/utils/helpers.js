import {
  CreateUserForm,
  DepositForm,
  WithdrawForm,
  TransferForm,
} from "../../pages/AdminDashboard/Forms";

import {
  getBalance,
  getTotalTransactions,
  getTransactionsVolume,
} from "./transactions";
import { filterUsersById, getTotalUsers } from "./users";

export function filterData(data, property, condition) {
  return data.filter((item) =>
    item[property].toLowerCase().includes(condition.toLowerCase())
  );
}

export function createUsersTable(userData) {
  return userData.map((user) => {
    const { user_id, username, first_name, last_name, email } = user;
    const name = `${first_name} ${last_name}`;
    const balance = getBalance(user_id);
    return { user_id, username, name, email, balance };
  });
}

export function createTransactionsTable(transactionData) {
  return transactionData.map((transaction) => {
    const { created_on, transaction_id, user_id, type, amount } = transaction;

    const name = filterUsersById(user_id).username;
    return { created_on, transaction_id, name, type, amount };
  });
}

export function getAdminCardsData() {
  const totalUsers = formatNumber(getTotalUsers());
  const totalTransactions = formatNumber(getTotalTransactions());
  const totalTransactionsVolume = formatNumber(getTransactionsVolume());

  return { totalUsers, totalTransactions, totalTransactionsVolume };
}

export function formatNumber(number) {
  return Intl.NumberFormat().format(number);
}
