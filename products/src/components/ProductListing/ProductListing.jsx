import React from "react";
// import { useData } from "../../contexts/DataProvider";
import "./ProductListing.css";
import Filter from "../Filter/Filter";
import ProductListingSection from "../ProductListingSection/ProductListingSection";

const ProductListing = () => {
  // const { loading } = useData();
  const loading = false;

  return (
    !loading && (
      <div className="page-container">
        <Filter className="filters" />
        <ProductListingSection className="products-container" />
      </div>
    )
  );
};

export default ProductListing;
