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

  useEffect(async () => {
    const encryptedKey = await MessageEncryptionService.getEncryptedAESKey();
    const aesKey = await MessageEncryptionService.decryptAESKeyWithRSA(encryptedKey);
    const { encryptedData, iv } = await MessageEncryptionService.encryptData(
      JSON.stringify(productId),
      aesKey
    );

    PubSub.publish("EVENTS.PRODUCTS_GET", { encryptedData, iv });
    PubSub.subscribe("EVENTS.PRODUCTS_GET_SUCCEEDED", async (type, { encryptedData, iv }) => {
      const decryptedData = await MessageEncryptionService.decryptData({ encryptedData, iv }, aesKey);
      const { product: apiProduct } = JSON.parse(decryptedData);

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
