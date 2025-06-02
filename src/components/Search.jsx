import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    setQuery(e.target.value);

    console.log("Search Query: ", e.target.value);
  };
  return (
    <div className="searchbar">
      <input
        type="search"
        className="search-bar"
        placeholder="Search your recipe..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}
export default Search;
