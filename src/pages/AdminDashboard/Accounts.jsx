import { useState, useEffect } from "react";
import {
  Header,
  Card,
  Button,
  Modal,
  Table,
  Toast,
  SearchInput,
} from "../../components";
import usersModel from "../../lib/constants/usersModel";
import {
  CreateUserForm,
  DepositForm,
  WithdrawForm,
  TransferForm,
} from "./Forms";
import { filterData, createUsersTable } from "../../lib/utils/helpers";
import { fetchUsers, getTotalUsers } from "../../lib/utils/users";
import {
  getTotalTransactions,
  getTransactionsVolume,
} from "../../lib/utils/transactions";
import { formatNumber } from "../../lib/utils/formatter";

const initialUsersTable = createUsersTable(usersModel);

export default function Accounts() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [formComponent, setFormComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersTableData, setUsersTableData] = useState(initialUsersTable);

  const totalUsers = formatNumber(getTotalUsers());
  const totalTransactions = formatNumber(getTotalTransactions());
  const totalTransactionsVolume = formatNumber(getTransactionsVolume());
  const usersData = fetchUsers();

  const user = localStorage.getItem("SignedInUser");

  const columns = ["user_id", "username", "name", "email", "balance"];

  function handleClick(type) {
    setShowModal(!showModal);

    switch (type) {
      case "createUser":
        setFormComponent(
          <CreateUserForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
            setMessage={setMessage}
          />
        );
        break;
      case "deposit":
        setFormComponent(
          <DepositForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
            setMessage={setMessage}
          />
        );
        break;
      case "withdraw":
        setFormComponent(
          <WithdrawForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
            setMessage={setMessage}
          />
        );
        break;
      case "transfer":
        setFormComponent(
          <TransferForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
            setMessage={setMessage}
          />
        );
        break;
      default:
        setFormComponent(null);
    }
  }

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 1) {
      setUsersTableData(initialUsersTable);
    } else {
      setUsersTableData(filterData(usersTableData, "username", searchTerm));
    }
  }, [usersTableData, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  return (
    <>
      {showToast && <Toast type={"success"} message={message} />}
      {user && (
        <div className="dashboard">
          <div className="header-container">
            <Header user={user.username} />
            <Button
              type={"button"}
              text={"Create User"}
              handleClick={() => handleClick("createUser")}
            />
          </div>

          <div className="cards-container">
            <Card title={"Total Users"}>{totalUsers}</Card>
            <Card title={"Total Transactions"}>{totalTransactions}</Card>
            <Card title={"Transaction Volume"}>{totalTransactionsVolume}</Card>
          </div>
          <div className="search-container">
            <SearchInput
              placeholder={"Search users..."}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <div className="buttons-container">
              <Button
                type={"button"}
                text={"Deposit"}
                handleClick={() => handleClick("deposit")}
              />
              <Button
                type={"button"}
                text={"Withdraw"}
                handleClick={() => handleClick("withdraw")}
              />
              <Button
                type={"button"}
                text={"Transfer"}
                handleClick={() => handleClick("transfer")}
              />
            </div>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>{formComponent}</Modal>
          )}
          {usersTableData && (
            <Table data={usersTableData} columns={columns} itemsPerPage={5} />
          )}
        </div>
      )}
    </>
  );
}
