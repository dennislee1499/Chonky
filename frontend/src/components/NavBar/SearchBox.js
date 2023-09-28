import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchSearchResults, clearSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); 
  const history = useHistory();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.products);

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query)).then((data) => {
        const products = data.products ? Object.values(data.products) : [];
        if (products && products.length > 0) {
          history.push(`/search?query=${encodeURIComponent(query)}`);
        } else {
          alert("No products found");
        }
        setShowDropdown(false); 
        setQuery("");
      });
    } else {
      setShowDropdown(false); 
      setQuery("");
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
    if (query) {
      dispatch(fetchSearchResults(query));
      setShowDropdown(true); 
    } else {
      setShowDropdown(false); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch();
      setQuery(""); 
    }
  };

  const DropdownMenu = () => {
    if (!showDropdown || results.length === 0) return null;

    return (
      <ul className="dropdown-menu">
        {results.map((product) => (
          <li key={product.id} onClick={() => handleProductClick(product.id)}>
            {product.name}
          </li>
        ))}
      </ul>
    );
  };

  const handleProductClick = (productId) => {
    setShowDropdown(false); 
    dispatch(clearSearchResults());
    history.push(`/products/${productId}`);
    setQuery(""); 
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
      <DropdownMenu />
      <button id="search-button" onClick={handleSearch}>
        <i className="fa fa-search fa-lg" style={{ color: "#244cbb" }}></i>
      </button>
    </div>
  );
}



