import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";
import pets from "./pets.png"
// import dogoo from "./dogoo.png"
import animals from "./animals.jpeg"


function SplashPage() {

   const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1, 
     slidesToScroll: 1, 
     arrows: true, 
     variableWidth: false, 
     adaptiveHeight: false,
     centerMode: false,
     centerPadding: "0",
   };

  return (
    <div className="SplashPage">
      <div className="banner-placeholder">
        <Slider {...settings}>
          <div>
            <img
              src={animals}
              alt="Pet Banner"
              className="banner-img-1"
            />
          </div>
          {/* <div>
            <img
              src={dogoo}
              alt="Pet Banner 2"
              className="banner-img-2"
            />
          </div> */}
        </Slider>
      </div>
      <div className="product-section">
        <h2>Dog Food</h2>
        <ProductsIndex />
      </div>
    </div>
  );
}


export default SplashPage;
