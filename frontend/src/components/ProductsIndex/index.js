import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products";
import { Link } from "react-router-dom";
import "./ProductsIndex.css";
import pedigree from "./pedigree.png"
import blueBuffalo from "./blueBuffalo.png"


function ProductsIndex() {
    const products = useSelector(state => Object.values(state.products));
    const dispatch = useDispatch();
    const brands = new Set(["Pedigree", "Blue Buffalo"]);  
    const BOLD_BRANDS = new Set(["Pedigree", "Blue Buffalo"]);


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
      let productImage;
      let imgClass = "";
      const { brandName, productName } = getBrandAndProductName(
        product.name
      ); 


      if (product.name.includes("Blue Buffalo")) {
        imgClass = "blue-buffalo";
      }

      if (product.name.includes("Pedigree")) {
        productImage = pedigree;
      } else if (product.name.includes("Blue Buffalo")) {
        productImage = blueBuffalo;
      }

      return (
        <li key={product.id}>
          <img
            src={productImage}
            // src={product.imageUrl}
            alt={`Image for ${product.name}`}
            className={`product-image ${imgClass}`}
          />
          <Link id="link-to-show-from-product" to={`/products/${product.id}`}>
            <span>
              <span className={BOLD_BRANDS.has(brandName) ? "brand-name" : ""}>
                {brandName}
              </span>{" "}
              {productName}
            </span>
          </Link>
          <p>{product.rating}</p>
          <p id="index-price" className="product-price">
            ${product.price}
          </p>
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