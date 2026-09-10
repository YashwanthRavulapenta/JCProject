import React from "react";
import '../styles/Home.css'

const Home = () => {
  return (
    <main className="home" id="home">
      {/* Background decorative effects */}
      <div className="home-glow glow-one"></div>
      <div className="home-glow glow-two"></div>
      <div className="home-particle particle-one"></div>
      <div className="home-particle particle-two"></div>
      <div className="home-particle particle-three"></div>

      {/* Main Content */}
      <div className="home-content">
        <p className="home-subtitle">WELCOME TO</p>

        <h1 className="home-title">
          Discover Your Perfect
          <span> Collection</span>
        </h1>

        <p className="home-description">
          Explore our exclusive collection of beautiful sarees, elegant
          jewellery, and premium beauty services designed to make every moment
          special.
        </p>

        <div className="home-buttons">
          <button className="primary-btn">
            Explore Collection
          </button>

          <button className="secondary-btn" >
            Contact
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;