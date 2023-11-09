import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults, clearSearchResults } from "../../store/search";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import { fetchProducts } from "../../store/products";
import LookingForProducts from "../LookingForProducts";



export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => Object.values(state.search.products));
  const hasResults = searchResults.length > 0;
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true); 
    dispatch(clearSearchResults());
    const action = query ? fetchSearchResults(query) : fetchProducts();
    dispatch(action).then(() => setIsLoading(false)); 
  }, [dispatch, query]);


  const SearchList = searchResults.map((result) => {
    return (
      <li key={result?.id}>
        <Link to={`/products/${result?.id}`}>
          <img
            id="product-search-img"
            src={result?.imageUrl}
            alt={`Image of ${result?.name}`}
          />
        </Link>
        <Link id="link-to-show-from-product" to={`/products/${result?.id}`}>
          <p>
            <span className="brand-name">{result?.brand}</span> {result?.name}
          </p>
        </Link>
        <div className="rating-show">
          <StarRatingDisplay rating={result?.rating} />
          <p>{result?.rating}</p>
        </div>
        <p id="index-price" className="product-price">
          Price: <span className="price-value">${result?.price}</span>
        </p>
      </li>
    );
  });


  return (
    <div className="search-page">
      <h1>Results for "{query}"</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : hasResults ? (
        <ul className="products-index">{SearchList}</ul>
      ) : (
        <LookingForProducts query={query} />
      )}
    </div>
  );
}
