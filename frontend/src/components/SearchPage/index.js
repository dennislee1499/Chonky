import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => Object.values(state.search));

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [query, dispatch]);

  const SearchList = searchResults.map((result) => {
    return (
      <li key={result?.id}>
        <img src={result?.imageUrl} alt={`Image of ${result?.name}`} />
        <Link id="link-to-show-from-product" to={`/products/${result?.id}`}>
          <p>{result?.name}</p>
        </Link>
        <p>{result?.rating}</p>
        <p id="index-price">${result?.price}</p>
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
