import React from "react";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";
import pets from "./pets.png"
import dogoo from "./dogoo.png"


function SplashPage() {

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   centerMode: true,
  //   variableWidth: true,
  //   adaptiveHeight: true
  // };

   const settings = {
     dots: true,
    //  infinite: true,
    //  speed: 500,
     slidesToShow: 1, 
     slidesToScroll: 1, 
     arrows: true, 
     variableWidth: true, 
     adaptiveHeight: true,
     centerMode: true,
     centerPadding: "0",
   };

  return (
    <div className="SplashPage">
      <div className="banner-placeholder">
        <Slider {...settings}>
          <div>
            {/* <img src={pets} alt="Pet Banner" /> */}
            <img
              src={pets}
              alt="Pet Banner"
              // style={{ width: "100%", objectFit: "cover", maxHeight: "350px" }}
              // style={{ width: "500px", height: "350px" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // or "contain" if you want to see the whole image
              }}
            />
          </div>
          <div>
            <img
              src={dogoo}
              alt="Pet Banner 2"
              style={{ width: "500px", height: "350px" }}
            />
          </div>
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
