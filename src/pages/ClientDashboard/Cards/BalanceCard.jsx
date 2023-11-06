import React from "react";
import { Card } from "../../../components";
import { formatAmount } from "../../../lib/utils/formatter";

export default function BalanceCard({ title, balance }) {
  return (
    <Card title={title}>
      <div className="balance-div">{formatAmount(balance)}</div>
    </Card>
  );
}
