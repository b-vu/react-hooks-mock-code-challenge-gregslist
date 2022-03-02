import { React, useState } from "react";

function Search({ handleSearchSubmit }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSearchSubmit(searchInput);
  }

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
