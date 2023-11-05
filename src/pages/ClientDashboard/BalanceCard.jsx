import React from "react";
import { Card } from "../../components";
import { formatAmount } from "../../lib/utils/formatter";

export default function BalanceCard({ balance }) {
  return (
    <Card title={"Total Balance"}>
      <div className="balance-div">{formatAmount(balance)}</div>
    </Card>
  );
}
