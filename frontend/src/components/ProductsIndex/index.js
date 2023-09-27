import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products";
import { Link } from "react-router-dom";
import "./ProductsIndex.css";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import "../StarRating/StarRating.css"
import "../Footer/Footer.css"

function ProductsIndex({category}) {
      const products = useSelector((state) =>
        Object.values(state.products).filter(
          (product) => product.category === category
        )
      );
    const dispatch = useDispatch();
    const brands = new Set(["Pedigree", "Blue Buffalo", "Purina"]);  
    const BOLD_BRANDS = new Set(["Pedigree", "Blue Buffalo", "Purina"]);


    const getBrandAndProductName = (name) => {
      for (let brand of brands) {
        if (name.includes(brand)) {
          return {
            brandName: brand,
            productName: name.replace(brand, "").trim(),
          };
        }
      }
      return { brandName: "", productName: name }; 
    };



    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    const ProductList = products.map((product) => {
      let imgClass = "";
      const { brandName, productName } = getBrandAndProductName(
        product.name
      ); 


      return (
        <li key={product.id}>
          <div className="content-above-button">
            <img
              src={product.imageUrl}
              alt={`Image for ${product.name}`}
              className={`product-image ${imgClass}`}
            />
            <Link id="link-to-show-from-product" to={`/products/${product.id}`}>
              <span>
                <span
                  className={BOLD_BRANDS.has(brandName) ? "brand-name" : ""}
                >
                  {brandName}
                </span>{" "}
                {productName}
              </span>
            </Link>
            <div className="rating-container">
              <StarRatingDisplay rating={product.rating} />
              <p>{product.rating}</p>
            </div>
            <p id="index-price" className="product-price">
              ${product.price}
            </p>
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </li>
      );
    });


     return (
       <div>
         <ul className="products-index">{ProductList}</ul>
       </div>
     );
}

export default ProductsIndex;