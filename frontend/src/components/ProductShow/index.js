import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProduct } from "../../store/products";
import ped from "./ped.png"
import buf from "./buf.png"
import "./ProductShow.css"
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import "../StarRating/StarRating.css";
import "../Footer/Footer.css";


function ProductShow() {
    const dispatch = useDispatch();
    const productId = useParams().productId;
    const product = useSelector(state => state.products?.[productId]);
  

    useEffect(() => {
      if (!product) {
        dispatch(fetchProduct(productId)); 
      }
    }, [dispatch, productId, product]);

    if (!product) {
        return null;
    }

    const productImage = getProductImage(product.name);

    function getProductImage(productName) {
      if (productName.includes("Ped")) {
        return ped;
      } else if (productName.includes("Buf")) {
        return buf;
      } else {
        return ""; 
      }
    }

    // return (
    //   <>
    //     <header id="category">{product.category}</header>
    //     <div className="product-show-page">
    //       <div className="left-section">
    //         <img
    //           id="product-show-img"
    //           src={productImage}
    //           alt={`Image of ${product.name}`}
    //         />
    //       </div>
    //       <div className="right-section">
    //         <div className="product-show-info">
    //           <h1>{product.name}</h1>
    //           <p>{product.rating}</p>
    //         </div>
    //         <hr className="show-divider" />
    //         <div className="product-show-details">
    //           <h2>About This Item</h2>
    //           <h3>Details</h3>
    //           <p>{product.details}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </>
    // );

    return (
      <>
        <header id="category">{product.category}</header>
        <div className="product-show-page">
          <div className="left-section">
            <img
              id="product-show-img"
              src={productImage}
              alt={`Image of ${product.name}`}
            />
          </div>
          <div className="right-section">
            <div className="product-show-info">
              <h1>{product.name}</h1>
              <div className="rating-price">
                <div className="rating-show">
                  <StarRatingDisplay rating={product.rating} />
                  <p>{product.rating}</p>
                </div>
                <div id="show-price" className="product-price-show">
                  <span className="price-label">Price: </span>
                  <span className="price-value">${product.price}</span>
                </div>
              </div>
            </div>
            <hr className="show-divider" />
            <div className="product-show-details">
              <h2>About This Item</h2>
              <h3>Details</h3>
              <p>{product.details}</p>
            </div>
          </div>
        </div>
      </>
    );


}

export default ProductShow;

