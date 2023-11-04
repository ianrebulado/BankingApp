import React from "react";
import { Card } from "../../components";

export default function BalanceCard({ balance }) {
  return (
    <Card title={"Total Balance"}>
      <span>PHP</span>
      <div>{`${Number.parseInt(balance).toFixed(2).toLocaleString()}`}</div>;
    </Card>
  );
}
