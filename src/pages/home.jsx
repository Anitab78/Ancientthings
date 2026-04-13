import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../componets/productgrid.jsx";
import HomeLivingGrid from "../componets/homeLivingGrid.jsx";
import products from "../data/product.jsx";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = ["/images/banner1.jpg", "/images/banner2.jpg", "/images/banner3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  return (
    <>
      <section className="banner-carousel">
        <div className="banner-container">
          {banners.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Banner ${index + 1}`}
              className={`banner-slide ${index === currentBanner ? "active" : ""}`}
            />
          ))}
        </div>
        <div className="banner-overlay-text">
          <h2>Explore for more handmade craft</h2>
        </div>
        <button className="banner-arrow prev" onClick={prevBanner}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="banner-arrow next" onClick={nextBanner}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentBanner ? "active" : ""}`}
              onClick={() => goToBanner(index)}
            ></button>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-box">
          <i className="fa-solid fa-shield-halved"></i>
          <h4>Secure Payment</h4>
          <p>100% Safe & Encrypted Payments</p>
        </div>
        <div className="trust-box">
          <i className="fa-solid fa-certificate"></i>
          <h4>Authentic & Unique Products</h4>
          <p>Handcrafted by Skilled Artisans</p>
        </div>
        <div className="trust-box">
          <i className="fa-solid fa-truck-fast"></i>
          <h4>Free & Fast Delivery</h4>
          <p>Across India on Selected Products</p>
        </div>
      </section>

      <section className="all-products">
        <h2>NEW ARRIVALS</h2>
        <HomeLivingGrid />
      </section>

      <section className="category-sections">
        {/* Home & Living */}
        <div className="category-block">
          <h3>Home & Living</h3>
          <div className="grid">
            {products.filter(p => p.category === 'woodcraft').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.filter(p => p.category === 'pooja').slice(0, 1).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.filter(p => p.category === 'wall-decor').slice(0, 1).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jewellery */}
        <div className="category-block">
          <h3>Jewellery</h3>
          <div className="grid">
            {products.filter(p => p.category === 'resin').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.filter(p => p.category === 'handmade-earrings').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Painting */}
        <div className="category-block">
          <h3>Painting</h3>
          <div className="grid">
            {products.filter(p => p.category === 'madhubani').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.filter(p => p.category === 'bottle').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gifts */}
        <div className="category-block">
          <h3>Gifts</h3>
          <div className="grid">
            {products.filter(p => p.category === 'lamps').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
            {products.filter(p => p.category === 'photo-frames').slice(0, 2).map(product => (
              <div key={product.id} className="card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p className="price">₹{product.price}</p>
                  </div>
                </Link>
                <div className="card-footer">
                  <button onClick={() => alert('Add to cart clicked')}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
