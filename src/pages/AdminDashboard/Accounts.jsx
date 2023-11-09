import { useState, useEffect } from "react";
import { Modal, Toast } from "../../components";
import usersModel from "../../lib/constants/usersModel";
import { filterData, createUsersTable } from "../../lib/utils/helpers";
import { fetchUsers } from "../../lib/utils/users";
import {
  AdminCards,
  AdminControls,
  AdminHeader,
  UsersTable,
} from "./Components";

const initialUsersTable = createUsersTable(usersModel);

export default function Accounts() {
  const [accountState, setAccountState] = useState({
    showModal: false,
    showToast: false,
    toastMessage: null,
    formComponent: null,
    searchTerm: "",
    usersTableData: initialUsersTable,
  });

  const {
    showModal,
    showToast,
    toastMessage,
    formComponent,
    searchTerm,
    usersTableData,
  } = accountState;

  const usersData = fetchUsers();

  const user = JSON.parse(localStorage.getItem("SignedInUser"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAccountState((prevState) => ({ ...prevState, showToast: false }));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length === 1) {
      setAccountState((prevState) => ({
        ...prevState,
        usersTableData: initialUsersTable,
      }));
    } else {
      const filteredData = filterData(
        initialUsersTable,
        "username",
        searchTerm
      );

      setAccountState((prevState) => ({
        ...prevState,
        usersTableData: filteredData,
      }));
    }
  }, [searchTerm]);

  function handleShowModal() {
    setAccountState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  }

  return (
    <>
      {showToast && <Toast type={"success"} message={toastMessage} />}
      {user && (
        <div className="dashboard">
          <AdminHeader
            username={user.first_name ? user.first_name : user.username}
            usersData={usersData}
            accountState={accountState}
            setAccountState={setAccountState}
          />
          <AdminCards />
          <AdminControls
            usersData={usersData}
            accountState={accountState}
            setAccountState={setAccountState}
          />
          <UsersTable usersTableData={usersTableData} />
          {showModal && (
            <Modal setShowModal={handleShowModal}>{formComponent}</Modal>
          )}
        </div>
      )}
    </>
  );
}
