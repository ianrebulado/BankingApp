import React from "react";
import { Card } from "../../../components";

import { getAdminCardsData } from "../../../lib/utils/helpers";

export default function AdminCards() {
  const { totalUsers, totalTransactions, totalTransactionsVolume } =
    getAdminCardsData();

  return (
    <div className="cards-container">
      <Card title={"Total Users"}>{totalUsers}</Card>
      <Card title={"Total Transactions"}>{totalTransactions}</Card>
      <Card title={"Transaction Volume"}>{totalTransactionsVolume}</Card>
    </div>
  );
}
