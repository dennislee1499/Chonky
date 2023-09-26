import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProduct } from "../../store/products";
import "./ProductShow.css"
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import "../StarRating/StarRating.css";
import "../Footer/Footer.css";


function ProductShow() {
    const dispatch = useDispatch();
    const productId = useParams().productId;
    const product = useSelector(state => state.products?.[productId]);
    const [flavor, setFlavor] = useState("");
    const [size, setSize] = useState("");
    // const [selectedPrice, setSelectedPrice] = useState(product.price);
    const [selectedPrice, setSelectedPrice] = useState(0);


    const selectedPrices = {
      "3.3-lb bag": 10.69,
      "3.5-lb bag": 7.99,
      "5-lb bag": 12.99,
      "6-lb bag": 19.88,
      "7-lb bag": 17.99,
      "15-lb bag": 14.98,
      "17-lb bag": 49.58,
      "18-lb bag": 16.98,
      "24-lb bag": 25.66,
      "30-lb bag": 29.98,
      "33-lb bag": 69.48
    }

    const handleSizeClick = (sizeOption) => {
      setSize(sizeOption);
      setSelectedPrice(selectedPrices[sizeOption]); 
    };

    // useEffect(() => {
    //   dispatch(fetchProduct(productId));
    // }, []);


    useEffect(() => {
      if (product && product.price) {
        setSelectedPrice(product.price);
      }
    }, [product]);



    if (!product) {
        return null;
    }


    const flavors = product.flavorOptions || [];
    const sizes = product.sizeOptions || [];


    return (
      <>
        <header id="category">{product.category}</header>
        <div className="product-show-page">
          <div className="left-section">
            <img
              id="product-show-img"
              src={product.imageUrl}
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
                  <span className="price-value">
                    {selectedPrice !== undefined
                      ? `$${selectedPrice.toFixed(2)}`
                      : "Loading..."}
                  </span>{" "}
                </div>
              </div>
            </div>
            <div className="options-section">
              <div className="flavor-section">
                <h3>Flavor: {flavor}</h3>
                <div className="flavor-buttons">
                  {flavors.map((flavorOption) => (
                    <button
                      name="flavor"
                      className={flavor === flavorOption ? "selected" : ""}
                      value={flavorOption}
                      onClick={() => setFlavor(flavorOption)}
                    >
                      {flavorOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="size-section">
                <h3>Size: {size} </h3>
                <div className="size-buttons">
                  {sizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      className={size === sizeOption ? "selected" : ""}
                      onClick={() => handleSizeClick(sizeOption)}
                    >
                      {sizeOption}
                    </button>
                  ))}
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

