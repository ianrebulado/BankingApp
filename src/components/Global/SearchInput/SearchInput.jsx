function SearchInput({
  placeholder,
  searchTerm,
  accountState,
  setAccountState,
}) {
  const handleSearch = (e) => {
    setAccountState({ ...accountState, searchTerm: e.target.value });
  };

  return (
    <div className="inputField">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchInput;
