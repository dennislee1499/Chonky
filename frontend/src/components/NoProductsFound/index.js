import { Link, useLocation } from "react-router-dom";
import './NoProductsFound.css';
import sorryy from "./sorryy.png";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function NoProductsFound() {
    const query = useQuery().get("query");

    return (
        <div className="no-products-found">
            <h1>Sorry, your search for "{query}" did not match any products</h1>
            <img src={sorryy} className="not-found-image" alt="sorry" />
        </div>
    )
}