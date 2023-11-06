import React, { useState, useEffect } from "react";
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

const initialUsersTable = createUsersTable(usersModel);

function AdminDashboard({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formComponent, setFormComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersTableData, setUsersTableData] = useState(initialUsersTable);

  const totalUsers = getTotalUsers();
  const totalTransactions = getTotalTransactions();
  const totalTransactionsVolume = getTransactionsVolume();

  const usersData = fetchUsers(); //TODO: Move this to App.jsx and pass as a prop

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
          />
        );
        break;
      case "deposit":
        setFormComponent(
          <DepositForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
          />
        );
        break;
      case "withdraw":
        setFormComponent(
          <WithdrawForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
          />
        );
        break;
      case "transfer":
        setFormComponent(
          <TransferForm
            usersData={usersData}
            setShowModal={setShowModal}
            setShowToast={setShowToast}
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
      {showToast && (
        <Toast type={"success"} message={"User successfully created."} />
      )}
      <div className="dashboard">
        <div className="header-container">
          <Header user={user} />
          <Button
            type={"button"}
            text={"Create User"}
            handleClick={() => handleClick("createUser")}
          />
        </div>

        <div className="cards-container">
          <Card title={"Total Users"} content={totalUsers} />
          <Card title={"Total Transactions"} content={totalTransactions} />
          <Card
            title={"Transaction Volume"}
            content={totalTransactionsVolume}
          />
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
    </>
  );
}

export default AdminDashboard;
