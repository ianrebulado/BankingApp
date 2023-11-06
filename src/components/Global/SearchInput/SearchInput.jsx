import { useState } from "react";

function SearchInput({ placeholder, searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
