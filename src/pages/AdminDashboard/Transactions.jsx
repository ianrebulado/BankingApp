import { useState, useEffect } from "react";
import { SearchInput } from "../../components";
import { TransactionsTable } from "./Components";
import { transactionsModel } from "../../lib/constants";
import { filterData, createTransactionsTable } from "../../lib/utils/helpers";

const initialTransactionsTable = createTransactionsTable(transactionsModel);

function Transactions() {
  const [transactionsState, setTransactionsState] = useState({
    showModal: false,
    showToast: false,
    toastMessage: null,
    formComponent: null,
    searchTerm: "",
    transactionsTableData: initialTransactionsTable,
  });

  const {
    showModal,
    showToast,
    toastMessage,
    formComponent,
    searchTerm,
    transactionsTableData,
  } = transactionsState;

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
      <TransactionsTable transactionsTableData={transactionsTableData} />
    </div>
  );
}

export default Transactions;
