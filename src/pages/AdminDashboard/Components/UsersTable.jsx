import React from "react";
import { Table } from "../../../components";

export default function UsersTable({ usersTableData }) {
  const columns = ["user_id", "username", "name", "email", "balance"];

  return (
    <>
      {usersTableData && (
        <Table data={usersTableData} columns={columns} itemsPerPage={5} />
      )}
    </>
  );
}
