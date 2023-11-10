import { useState, useEffect } from "react";
import { SearchInput } from "../../components";
import { TransactionsTable } from "./Components";
import { transactionsModel } from "../../lib/constants";

import { filterData, createTransactionsTable } from "../../lib/utils/helpers";
import useLocalStorage from "../../hooks/localStorage";

function Transactions() {
  const [transactionsData, setTransactionsData] = useLocalStorage(
    "transactions",
    transactionsModel
  );
  const initialTransactionsTable = createTransactionsTable(transactionsData);
  const [transactionsState, setTransactionsState] = useState({
    showModal: false,
    showToast: false,
    toastMessage: null,
    formComponent: null,
    searchTerm: "",
    transactionsTableData: initialTransactionsTable,
  });

  const { searchTerm, transactionsTableData } = transactionsState;

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 1) {
      setTransactionsState((prevState) => ({
        ...prevState,
        transactionsTableData: initialTransactionsTable,
      }));
    } else {
      const filteredData = filterData(
        initialTransactionsTable,
        "name",
        searchTerm
      );

      setTransactionsState((prevState) => ({
        ...prevState,
        transactionsTableData: filteredData,
      }));
    }
  }, [searchTerm]);

  useEffect(() => {
    setTransactionsState((prevState) => ({
      ...prevState,
      transactionsTableData: initialTransactionsTable,
    }));
  }, [transactionsData]);

  return (
    <div className="transactions">
      <div className="search-container">
        <SearchInput
          placeholder={"Search users..."}
          searchTerm={searchTerm}
          state={transactionsState}
          setState={setTransactionsState}
        />
      </div>
      <h1 className="table-header">Transactions</h1>
      <TransactionsTable transactionsTableData={transactionsTableData} />
    </div>
  );
}

export default Transactions;
