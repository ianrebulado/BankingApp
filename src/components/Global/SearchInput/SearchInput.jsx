function SearchInput({ placeholder, searchTerm, state, setState }) {
  const handleSearch = (e) => {
    setState({ ...state, searchTerm: e.target.value });
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
