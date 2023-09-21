import React from "react";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";
import pets from "./pets.png"


function SplashPage() {
  return (
    <div className="SplashPage">
      <div className="banner-placeholder">
        {/* Banner Placeholder */}
        <img src={pets} alt="Pet Banner" />
      </div>
      <h1>Animal Essentials</h1>
      <ProductsIndex />
    </div>
  );
}

export default SplashPage;
