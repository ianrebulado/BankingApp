import { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Card, Header, Modal, Table, Toast } from "../../components";

import { Wallet, Printer } from "lucide-react";
import { getTotalExpenses } from "../../lib/utils/expenses";

import {
  getAccountBalance,
  getBalance,
  getTransactions,
} from "../../lib/utils/transactions";
import { formatDate, formatAmount } from "../../lib/utils/formatter";
import { fetchUsers } from "../../lib/utils/users";
import SendAmount from "./Forms/SendAmount";

function UserAccount() {
  const user = JSON.parse(localStorage.getItem("SignedInUser"));
  const usersData = fetchUsers();

  const userId = user.user_id;

  const columns = ["transaction_id", "created_on", "type", "amount"];

  let totalExpenses = getTotalExpenses(userId);
  const balance = getBalance(userId);
  const userTransactions = getTransactions(userId);
  const accountBalance = getAccountBalance(balance, totalExpenses);

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const updateTransactions = (transaction) => {
    if (transaction) {
      const newData = transaction.map((item) => {
        const { transaction_id, created_on, type, amount } = item;
        const formattedDate = formatDate(created_on);
        const formattedAmount = formatAmount(amount);

        return {
          transaction_id,
          created_on: formattedDate,
          type,
          amount: formattedAmount,
        };
      });

      setData(newData);
    }
  };

  const handleSend = () => {
    setShowModal(true);
  };

  const handlePrint = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const printWindow = window.open(
      "",
      "",
      `left=0,top=0,width=${screenWidth},height=${screenHeight}`
    );

    if (printWindow) {
      const printContent = userTransactions.map((transaction) => (
        <div key={transaction.transaction_id}>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Type: {transaction.type}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Date: {transaction.created_on}</p>
          <hr />
        </div>
      ));
      printWindow.document.open();
      printWindow.document.write(`
            <html>
                <head>
                    <title>Statement of Account</title>
                </head>
                <body>${ReactDOMServer.renderToStaticMarkup(
                  printContent
                )}</body>
            </html>
        `);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };

  useEffect(() => {
    updateTransactions(userTransactions);
  }, []);

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
        <Toast type={"success"} message={"amount successfully transferred."} />
      )}
      {showModal && (
        <Modal title={"Send Money"} setShowModal={setShowModal}>
          <SendAmount
            userId={userId}
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
            updateTransactions={updateTransactions}
          />
        </Modal>
      )}
      <div className="expenses-container">
        <div className="header-container">
          <Header user={user.first_name} />
        </div>
        <div className="account-container">
          <div className="card-container">
            <Card title="Savings Account">
              <div className="account-card">
                <div className="account-info">
                  <span className="account-number">{userId}</span>
                  <span className="account-name">
                    {user.last_name}, {user.first_name}
                  </span>
                </div>
                <div className="balance-container">
                  <span className="balance-amount">
                    {formatAmount(accountBalance)}
                  </span>
                  <span className="balance-label">Available Balance</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="account-buttons-container">
            <div onClick={handleSend}>
              <Wallet />
              <h1>Send Money</h1>
            </div>
            <div onClick={handlePrint}>
              <Printer />
              <h1>Print SOA</h1>
            </div>
          </div>
        </div>
        <div className="table-container">
          <Table
            data={data}
            columns={columns}
            itemsPerPage={10}
            rowKey={"transaction_id"}
          />
        </div>
      </div>
    </>
  );
}

export default UserAccount;
