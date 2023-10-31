import React from "react";

export default function BalanceCard({ balance }) {
  return (
    <div className="card-body">
      {`${Number.parseInt(balance).toFixed(2).toLocaleString()}`}
    </div>
  );
}
