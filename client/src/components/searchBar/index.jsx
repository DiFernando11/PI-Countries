import React from "react";

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Country..." />
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;
