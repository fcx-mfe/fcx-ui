import SharedAPIClient from '@fcx/api-client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from "./components/ProductListing/ProductListing";
import ProductDetails from "./components/ProductDetails/ProductDetails";

SharedAPIClient.getInstance({
  name: 'products-service', 
  baseURL: 'http://localhost:9090',
  resources: ['PRODUCTS', 'CATEGORIES'],
});

export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}
