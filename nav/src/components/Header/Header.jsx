import React, { useState } from "react";
// import { CgHeart, CgShoppingCart } from "react-icons/cg";
import {CgHeart} from "@react-icons/all-files/cg/CgHeart.esm";
import {CgShoppingCart} from "@react-icons/all-files/cg/CgShoppingCart.esm";
// import { GrSearch } from "react-icons/gr";
import {GrSearch} from "@react-icons/all-files/gr/GrSearch.esm";
// import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu.esm";
import {MdClose} from "@react-icons/all-files/md/MdClose.esm";
import { SiTaichilang } from "react-icons/si";

import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthProvider";
// import { useData } from "../../contexts/DataProvider";
// import { useUserData } from "../../contexts/UserDataProvider";
import "./Header.css";

const Header = () => {
  // const { auth } = useAuth();
  // const { dispatch } = useData();
  // const { userDataState } = useUserData();
  const auth = {};
  const dispatch = ({ type, payload}) => console.log(type, payload);
  const userDataState = {
    cartProducts: [],
    wishlistProducts: [],
  };

  const navigate = useNavigate();
  const [showHamburger, setShowHamburger] = useState(true);
  const getActiveStyle = ({ isActive }) => {
    return { color: isActive ? "white" : "" };
  };

  const totalProductsInCart = userDataState.cartProducts?.reduce(
    (acc, curr) => {
      return acc + curr.qty;
    },
    0
  );

  const isProductInCart = () => (Number(totalProductsInCart) ? true : false);

  const totalProductsInWishlist = userDataState.wishlistProducts.length;

  const isProductInWishlist = () =>
    Number(totalProductsInWishlist) ? true : false;

  return (
    <nav>
      <div className="nav-logo-home-button">
        <NavLink style={getActiveStyle} to="/home">
          <SiTaichilang />
          <span className="brand-name">DadSneakers</span>
        </NavLink>
      </div>

      <div className="nav-input-search">
        <input
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }
          onKeyDown={(e) => {
            e.key === "Enter" && navigate("/product-listing");
          }}
          placeholder="Search"
        />
        <button>
          <GrSearch />
        </button>
      </div>

      <div
        className={
          !showHamburger
            ? "nav-link-container-mobile nav-link-container"
            : "nav-link-container"
        }
      >
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/product-listing"
        >
          Explore
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to={auth.isAuth ? "/profile" : "/login"}
        >
          {!auth.isAuth ? "Login" : "Profile"}
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="wishlist"
        >
          <span>{!showHamburger ? "Wishlist" : ""}</span>
          <CgHeart size={25} className="wishlist" />{" "}
          {isProductInWishlist() && (
            <span className="cart-count cart-count-mobile">
              {totalProductsInWishlist}
            </span>
          )}
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
        >
          <span>{!showHamburger ? "Cart" : ""}</span>
          <CgShoppingCart size={25} className="cart" />{" "}
          {isProductInCart() && (
            <span className="cart-count cart-count-mobile">
              {" "}
              {totalProductsInCart}{" "}
            </span>
          )}
        </NavLink>
      </div>
      {showHamburger && (
        <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
          <GiHamburgerMenu size={20} />
        </div>
      )}
      {!showHamburger && (
        <div
          className="cross-tab-icon cross-tab-icon-mobile"
          onClick={() => setShowHamburger(true)}
        >
          <MdClose color={"rgb(106, 106, 65)"} size={25} />
        </div>
      )}
    </nav>
  );
};

export default Header;