import React from "react";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  return (
    <section className="hero-slider">
      <div className="hero-content">
        <h1>Welcome to Ancient Things</h1>
        <p>Discover traditional crafts and handmade treasures</p>
        <Link to="/products" className="cta-button">
          Shop Now
        </Link>
      </div>
      <style>{`
        .hero-slider {
          background: linear-gradient(135deg, #8B7355 0%, #D4A574 100%);
          padding: 80px 40px;
          text-align: center;
          color: white;
          border-radius: 8px;
          margin: 20px;
        }
        .hero-content h1 {
          font-size: 3em;
          margin: 20px 0;
          font-weight: bold;
        }
        .hero-content p {
          font-size: 1.3em;
          margin-bottom: 30px;
        }
        .cta-button {
          display: inline-block;
          background-color: #D4A574;
          color: #333;
          padding: 15px 40px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1.1em;
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: #C9956F;
        }
      `}</style>
    </section>
  );
}
