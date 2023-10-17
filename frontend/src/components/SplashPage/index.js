// import React from "react";
// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ProductsIndex from "../ProductsIndex";
// import "./splashpage.css";
// import cutedoggo from "./cutedoggo.webp";
// import catdog from "./catdog.jpg";
// import puppies from "./puppies.jpg";
// import kitty from "./kitty.jpeg";
// import twopuppies from "./twopuppies.jpeg";


// function SplashPage() {

//    const settings = {
//      dots: true,
//      infinite: true,
//      speed: 500,
//      slidesToShow: 1,
//      slidesToScroll: 1,
//      arrows: true,
//      autoplay: true, 
//      autoplaySpeed: 2500,
//      variableWidth: false,
//      adaptiveHeight: false,
//      centerMode: false,
//      centerPadding: "0",
//    };

//   return (
//     <div className="SplashPage">
//       <div className="banner-placeholder">
//         <Slider {...settings}>
//           <div>
//             <img src={cutedoggo} alt="Pet Banner1" className="banner-img-1" />
//           </div>

//           <div>
//             <img src={puppies} alt="Pet Banner2" className="banner-img-2" />
//           </div>

//           <div>
//             <img src={catdog} alt="Pet Banner3" className="banner-img-3" />
//           </div>

//           <div>
//             <img src={kitty} alt="Pet Banner4" className="banner-img-4" />
//           </div>

//           <div>
//             <img src={twopuppies} alt="Pet Banner5" className="banner-img-5" />
//           </div>
//         </Slider>
//       </div>
//       <div className="product-section">
//         <h2>Dog Food</h2>
//         <ProductsIndex category="Dog Food" />
//       </div>

//       <div className="product-section">
//         <h2>Cat Food</h2>
//         <ProductsIndex category="Cat Food" />
//       </div>

//       <div className="product-section">
//         <h2>Dog Toys</h2>
//         <ProductsIndex category="Dog Toys" />
//       </div>
//     </div>
//   );
// }


// export default SplashPage;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsIndex from "../ProductsIndex";
import "./splashpage.css";

import chewy1 from "./chewy1.avif";
import chewy2 from "./chewy2.avif";
import chewy3 from "./chewy3.webp";
import chewy4 from "./chewy4.avif";
import chewy5 from "./chewy5.avif";



function SplashPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    variableWidth: false,
    adaptiveHeight: false,
    centerMode: false,
    centerPadding: "0",
  };

  return (
    <div className="SplashPage">
      <div className="banner">
        <p>35% off all your first Autoship!</p>
      </div>
      <div className="banner-placeholder">
        <Slider {...settings}>
          <div>
            <img src={chewy1} alt="Pet Banner1" className="banner-img-1" />
          </div>

          <div>
            <img src={chewy2} alt="Pet Banner2" className="banner-img-1" />
          </div>

          <div>
            <img src={chewy3} alt="Pet Banner3" className="banner-img-1" />
          </div>

          <div>
            <img src={chewy4} alt="Pet Banner4" className="banner-img-1" />
          </div>

          <div>
            <img src={chewy5} alt="Pet Banner5" className="banner-img-1" />
          </div>
        </Slider>
      </div>
      <div className="product-details">
        <div className="product-section">
          <h2>Dog Food</h2>
          <ProductsIndex category="Dog Food" />
        </div>

        <div className="product-section">
          <h2>Cat Food</h2>
          <ProductsIndex category="Cat Food" />
        </div>

        <div className="product-section">
          <h2>Dog Toys</h2>
          <ProductsIndex category="Dog Toys" />
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
