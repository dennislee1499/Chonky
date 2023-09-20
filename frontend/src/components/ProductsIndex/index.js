import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products";
import { Link } from "react-router-dom";


function ProductsIndex() {
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const ProductList = products.map(product => {
        return (
          <li key={product.id}>
            <p>{product.name}</p>
          </li>
        );
    })

     return (
       <div>
         <ul className="products-index">{ProductList}</ul>
       </div>
     );
}

export default ProductsIndex;