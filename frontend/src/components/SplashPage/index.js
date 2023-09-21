import React from "react";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";


function SplashPage() {
  return (
    <div className="SplashPage">
      <div className="banner-placeholder">
        Banner Placeholder
        </div>
      <h1>Animal Essentials</h1>
      <ProductsIndex />
    </div>
  );
}

export default SplashPage;
