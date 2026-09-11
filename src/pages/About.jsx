import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-hero">

      {/* Glowing bubbles */}
      <div className="about-glow glow-one"></div>
      <div className="about-glow glow-two"></div>

      {/* Decorative rings */}
      <div className="about-ring ring-one"></div>
      <div className="about-ring ring-two"></div>

      {/* Floating dots */}
      <span className="about-dot dot-one"></span>
      <span className="about-dot dot-two"></span>
      <span className="about-dot dot-three"></span>

      {/* Main content */}
      <div className="about-content">

        <span className="about-eyebrow">
          ✦ WELCOME TO JCOLLECTIONS ✦
        </span>

        <h1>
          Elegance That
          <br />
          <span>Speaks For You</span>
        </h1>

        <p>
          Discover a beautiful collection of timeless sarees and
          elegant jewellery, thoughtfully selected to celebrate
          your style, confidence and individuality.
        </p>

        <div className="about-buttons">

          <Link to="/sarees" className="about-btn primary">
            Explore Sarees
            <span>→</span>
          </Link>

          <Link to="/jewellery" className="about-btn secondary">
            View Jewellery
            <span>→</span>
          </Link>

        </div>

      </div>

      {/* J decoration */}
      <div className="about-j">
        J
      </div>

    </section>
  );
};

export default About;