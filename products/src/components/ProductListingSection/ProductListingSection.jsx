import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
// import { useData } from "../../../../contexts/DataProvider";
// import { useUserData } from "../../../../contexts/UserDataProvider";
import "./ProductListingSection.css";
import { getCategoryWiseProducts } from "/src/helpers/filter-functions/category";
import { getPricedProducts } from "/src/helpers/filter-functions/price";
import { getRatedProducts } from "/src/helpers/filter-functions/ratings";
import { getSortedProducts } from "/src/helpers/filter-functions/sort";
import { getSearchedProducts } from "/src/helpers/searchedProducts";

const ProductListingSection = () => {
  // const { state } = useData();
  // const {
  //   isProductInCart,
  //   isProductInWishlist,
  //   wishlistHandler,
  //   addToCartHandler,
  //   cartLoading,
  // } = useUserData();

  const [products, setProducts] = useState([]);

  const {
    isProductInCart = () => {},
    isProductInWishlist = () => {},
    wishlistHandler = () => {},
    addToCartHandler = () => {},
    cartLoading = false,
  } = {};


  const {
    allProductsFromApi = [],
    inputSearch = "",
    filters: { rating, categories, price, sort } = {
      rating: "",
      categories: [],
      price: [],
      sort: "",
    },
  } = {};

  
  useEffect(() => {
    PubSub.publish("EVENTS.PRODUCTS_GET");
    PubSub.subscribe("EVENTS.PRODUCTS_GET_SUCCEEDED", (type, { products: apiProducts }) => {
      const searchedProducts = getSearchedProducts(apiProducts, inputSearch);
      const ratedProducts = getRatedProducts(searchedProducts, rating);
      const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);
      const pricedProducts = getPricedProducts(categoryProducts, price);
      const sortedProducts = getSortedProducts(pricedProducts, sort);
      setProducts(sortedProducts);
    });

    return () => {
      PubSub.unsubscribe("EVENTS.PRODUCTS_GET_SUCCEEDED");
    };
  }, []);

  return (
    <div className="product-card-container">
      {!products.length ? (
        <h2 className="no-products-found">
          Sorry, there are no matching products!
        </h2>
      ) : (
        products.map((product) => {
          const {
            _id,
            id,
            name,
            original_price,
            discounted_price,
            category_name,
            is_stock,
            rating,
            reviews,
            trending,
            img,
          } = product;

          return (
            <Tilt
              key={product._id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={false}
              transitionSpeed={2000}
              scale={1.02}
            >
              <div className="product-card" key={_id}>
                <Link to={`/product-details/${_id}`}>
                  <div className="product-card-image">
                    <Tilt
                      transitionSpeed={2000}
                      tiltMaxAngleX={15}
                      tiltMaxAngleY={15}
                      scale={1.18}
                    >
                      <img src={img} />
                    </Tilt>
                  </div>
                </Link>

                <div className="product-card-details">
                  <h3>{name}</h3>
                  <p className="ratings">
                    {rating}
                    <BsFillStarFill color="orange" /> ({reviews} reviews){" "}
                  </p>
                  <div className="price-container">
                    <p className="original-price">${original_price}</p>
                    <p className="discount-price">${discounted_price}</p>
                  </div>

                  <p>Gender: {category_name}</p>
                  <div className="info">
                    {!is_stock && <p className="out-of-stock">Out of stock</p>}
                    {trending && <p className="trending">Trending</p>}
                  </div>
                </div>

                <div className="product-card-buttons">
                  <button
                    disabled={cartLoading}
                    onClick={() => addToCartHandler(product)}
                    className="cart-btn"
                  >
                    {!isProductInCart(product) ? "Add To Cart" : "Go to Cart"}
                  </button>
                  <button
                    onClick={() => wishlistHandler(product)}
                    className="wishlist-btn"
                  >
                    {!isProductInWishlist(product) ? (
                      <AiOutlineHeart size={30} />
                    ) : (
                      <AiTwotoneHeart size={30} />
                    )}
                  </button>
                </div>
              </div>
            </Tilt>
          );
        })
      )}
    </div>
  );
};

export default ProductListingSection;