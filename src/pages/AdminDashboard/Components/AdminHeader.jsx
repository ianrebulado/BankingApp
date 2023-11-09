import React from "react";
import { CreateUserForm } from "../Forms";
import { Header, Button } from "../../../components";

export default function AdminHeader({ username, usersData, setAccountState }) {
  function handleClick() {
    setAccountState((prevState) => ({
      ...prevState,
      formComponent: (
        <CreateUserForm
          usersData={usersData}
          setAccountState={setAccountState}
        />
      ),
      showModal: !setAccountState.showModal,
    }));
  }

  return (
    <div className="header-container">
      <Header user={username} />
      <Button type={"button"} text={"Create User"} handleClick={handleClick} />
    </div>
  );
}
