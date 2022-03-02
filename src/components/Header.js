import React from "react";
import Search from "./Search";

function Header({ handleSearchSubmit }) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search handleSearchSubmit={handleSearchSubmit}/>
    </header>
  );
}

export default Header;
