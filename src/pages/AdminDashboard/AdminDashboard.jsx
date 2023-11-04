import React, { useState, useEffect } from "react";
import { Header, Card, Button, Modal, Table, Toast } from "../../components";
import usersModel from "../../lib/constants/usersModel";
import {
  CreateUserForm,
  DepositForm,
  WithdrawForm,
  TransferForm,
} from "./Forms";

function AdminDashboard({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formComponent, setFormComponent] = useState(null);

  const columns = ["user_id", "first_name", "last_name", "email", "balance"];
  const data = usersModel.map((item) => {
    const { user_id, first_name, last_name, email } = item;
    const { balance } = 0.0;
    return { user_id, first_name, last_name, email, balance };
  });

  function handleClick(type) {
    setShowModal(!showModal);

    switch (type) {
      case "createUser":
        setFormComponent(
          <CreateUserForm
            setShowModal={setShowModal}
            setShowToast={setShowToast}
          />
        );
        break;
      case "deposit":
        setFormComponent(<DepositForm />);
        break;
      case "withdraw":
        setFormComponent(<WithdrawForm />);
        break;
      case "transfer":
        setFormComponent(<TransferForm />);
        break;
      default:
        setFormComponent(null);
    }
  }

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
          <Card title={"Total Users"} content={""} />
          <Card title={"Total Transactions"} content={""} />
          <Card title={"Transaction Volume"} content={""} />
        </div>
        <div className="search-container">
          <span>Search</span>
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
        <Table data={data} columns={columns} itemsPerPage={3} />
      </div>
    </>
  );
}

export default AdminDashboard;
