import { React, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = searchInput => {
    setSearch(searchInput);
  }

  return (
    <div className="app">
      <Header handleSearchSubmit={handleSearchSubmit}/>
      <ListingsContainer search={search}/>
    </div>
  );
}

export default App;
