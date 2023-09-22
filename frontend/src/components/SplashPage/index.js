import React from "react";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";
import pets from "./pets.png"


function SplashPage() {
  return (
    <div className="SplashPage">
      <div className="banner-placeholder">
        <img src={pets} alt="Pet Banner" />
      </div>
      <div className="product-section">
        <h2>Dog Food</h2>
        <ProductsIndex />
      </div>
    </div>
  );
}


export default SplashPage;
