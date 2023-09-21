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

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    // const ProductList = products.map(product => {
    //     return (
    //       <li key={product.id}>
    //         {/* <img src="./pedigree.png" alt="Description" /> */}
    //         <img src={pedigree} alt="Product Image" className="" />
    //         <img src={blueBuffalo} alt="Product Image" className="" />
    //         <p>{product.name}</p>
    //         <p>{product.rating}</p>
    //         <p id="index-price" className="product-price">
    //           ${product.price}
    //         </p>
    //       </li>
    //     );
    // })

    const ProductList = products.map((product) => {
      let productImage;
      let imgClass = "";

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
            alt={`Image for ${product.name}`}
            className={`product-image ${imgClass}`}
          />
          <p>{product.name}</p>
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