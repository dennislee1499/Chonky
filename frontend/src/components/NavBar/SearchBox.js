import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.search.products);


  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query)).then((data) => {
        const products = data.products ? Object.values(data.products) : [];
        if (products && products.length > 0) {
          history.push(`/products/${products[0].id}`);
        } else {
          alert("No products found");
        }
      });
    }
  };




  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch();
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        id="search-input"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button id="search-button" onClick={handleSearch}>
        <i
          className="fa-solid fa-magnifying-glass fa-xl"
          style={{ color: "#244cbb" }}
        ></i>
      </button>
    </div>
  );
}

