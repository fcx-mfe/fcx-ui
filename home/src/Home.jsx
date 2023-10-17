import React from "react";
// import { Footer } from "./components/Footer/Footer";
// import { useData } from "../../contexts/DataProvider";
import CategoriesSection from "./components/CategoriesSection/CategoriesSection";
import HeroSection from "./components/HeroSection/HeroSection";
import HeroVideo from "./components/HeroVideo/HeroVideo";
import VideosSection from "./components/VideosSection/VideosSection";

const Home = () => {
  // const { loading } = useData();
  const loading = false;

  return (
    !loading && (
      <div className="home-page">
        <div className="hero">
          <HeroVideo />
          <HeroSection />
          <VideosSection />
          <CategoriesSection />
          {/* <Footer /> */}
        </div>
      </div>
    )
  );
};

export default Home;