import "./ProductDetails.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// import { useData } from "../../contexts/DataProvider";
import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

const ProductDetails = () => {
  const { state } = {};
  const { productId, ...rest } = useParams();
  const loading = false;

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    PubSub.publish("EVENTS.PRODUCTS_GET", productId);
    PubSub.subscribe("EVENTS.PRODUCTS_GET_SUCCEEDED", (type, { product: apiProduct }) => {
      setSelectedProduct(apiProduct);
    });

    return () => {
      PubSub.unsubscribe("EVENTS.PRODUCTS_GET_SUCCEEDED");
    }
  }, []);

  return (
    !loading && (
      <>
        <div className="products-page-container">
          { selectedProduct && (
            <>
              <ProductImage selectedProduct={selectedProduct} />
              <ProductDescription selectedProduct={selectedProduct} />
            </>
          ) }
        </div>
      </>
    )
  ); 
};

export default ProductDetails;
