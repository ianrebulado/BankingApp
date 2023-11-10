import React from "react";
import { Table } from "../../../components";

export default function TransactionsTable({ transactionsTableData }) {
  const columns = ["created_on", "transaction_id", "name", "type", "amount"];

  return (
    <>
      {transactionsTableData && (
        <Table
          data={transactionsTableData}
          columns={columns}
          itemsPerPage={25}
        />
      )}
    </>
  );
}
