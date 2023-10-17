import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";

export default function Root(props) {
  return (
    <Router>
      <Header />
    </Router>
  );
}
