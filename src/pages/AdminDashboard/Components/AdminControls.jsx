import { Button, SearchInput } from "../../../components";
import { DepositForm, WithdrawForm, TransferForm } from "../Forms";

function getFormComponent(type, usersData, setAccountState) {
  switch (type) {
    case "deposit":
      return (
        <DepositForm usersData={usersData} setAccountState={setAccountState} />
      );
    case "withdraw":
      return (
        <WithdrawForm usersData={usersData} setAccountState={setAccountState} />
      );
    case "transfer":
      return (
        <TransferForm usersData={usersData} setAccountState={setAccountState} />
      );
    default:
      return null;
  }
}

export default function AdminControls({
  usersData,
  accountState,
  setAccountState,
}) {
  const { showModal, searchTerm } = accountState;

  function handleClick(type) {
    const formComponent = getFormComponent(type, usersData, setAccountState);
    setAccountState({
      ...accountState,
      formComponent: formComponent,
      showModal: !showModal,
    });
  }

  return (
    <div className="search-container">
      <SearchInput
        placeholder={"Search users..."}
        searchTerm={searchTerm}
        state={accountState}
        setState={setAccountState}
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
  );
}
