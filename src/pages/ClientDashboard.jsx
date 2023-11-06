import React from "react";
import Header from "../components/Global/Header/Header";
import Card from "../components/Global/Card/Card";
import Buttons from "../components/Global/Button/Button";
import BalanceCard from "./ClientDashboard/BalanceCard";
import BalanceChart from "./ClientDashboard/BalanceChart";
// import Table from "../components/Global/Table/Table";

import { getBalance, getMonthlyBalance } from "../lib/utils/transactions";

function ClientDashboard({ user }) {
  const user_id = "u-l2hckqwf1p";
  const balance = getBalance(user_id);
  const monthlyBalance = getMonthlyBalance(user_id);

  return (
    <>
      <div className="dashboard">
        <Header user={user} />
        <div className="cards-container">
          <BalanceCard balance={balance} />
          <BalanceChart data={monthlyBalance} />
        </div>
        {/* <Table data={[]} columns={["Expenses", "Date", "Amount"]} /> */}
        <div className="buttons-container">
          <Buttons type={"submit"} text={"Edit"} handleClick={() => {}} />
          <Buttons type={"submit"} text={"Delete"} handleClick={() => {}} />
        </div>
      </div>
    </>
  );
}

export default ClientDashboard;
