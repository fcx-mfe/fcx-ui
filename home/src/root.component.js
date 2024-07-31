import SharedAPIClient from "@fcx/api-client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import "./Home.css";

(async () => {
  await SharedAPIClient.getInstance({
    name: "products-service",
    baseURL: "http://localhost:9090",
    resources: ["PRODUCTS", "CATEGORIES"],
  });
})();

export default function Root(props) {
  return (
    <Router>
      <Home />
    </Router>
  );
}
