import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchSearchResults, clearSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.products);

  



  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(fetchSearchResults(query)).then((data) => {
        const products = data.products ? Object.values(data.products) : [];
        if (products && products.length > 0) {
          history.push(`/products/${products[0].id}`);
          setQuery("");
        } else {
          alert("No products found");
          setQuery("");
        }
          dispatch(clearSearchResults());  
      });
    }
  };



const handleInputChange = (e) => {
  const query = e.target.value;
  setQuery(query);
  if (query) {
    dispatch(fetchSearchResults(query));
  }
};




  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch();
    }
  };

  const DropdownMenu = () => {
    console.log(results); 
    if (results.length === 0) return null;

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

