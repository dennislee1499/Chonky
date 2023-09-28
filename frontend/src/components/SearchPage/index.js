import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults, clearSearchResults } from "../../store/search";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";




export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => Object.values(state.search.products));

  useEffect(() => {
    dispatch(clearSearchResults());
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, query]);

  const SearchList = searchResults.map((result) => {
    return (
      <li key={result?.id}>
        <img src={result?.imageUrl} alt={`Image of ${result?.name}`} />
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
      <h1>Search Results for "{query}":</h1>
      <ul className="products-index">{SearchList}</ul>
    </div>
  );
}
