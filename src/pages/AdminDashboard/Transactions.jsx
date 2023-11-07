import { useState, useEffect } from "react";
import { SearchInput, Table } from "../../components";
import { transactionsModel } from "../../lib/constants";
import { filterData, createTransactionsTable } from "../../lib/utils/helpers";

const initialTransactionsTable = createTransactionsTable(transactionsModel);

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionsTableData, setTransactionsTableData] = useState(
    initialTransactionsTable
  );

  const columns = [
    "Created On",
    "Transaction ID",
    "Username",
    "Type",
    "Amount",
  ];

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 1) {
      setTransactionsTableData(initialTransactionsTable);
    } else {
      setTransactionsTableData(
        filterData(transactionsTableData, "username", searchTerm)
      );
    }
  }, [transactionsTableData, searchTerm]);

  return (
    <div className="transactions">
      <div className="search-container">
        <SearchInput
          placeholder={"Search users..."}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <Table data={transactionsTableData} columns={columns} itemsPerPage={25} />
    </div>
  );
}

export default Transactions;
