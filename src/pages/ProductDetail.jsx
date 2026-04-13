import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import ProductCard from "../componets/productcard.jsx";
import products from "../data/product.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn, login } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter email and password");
      return;
    }

    // Login user
    login({ email: loginEmail, name: loginEmail.split("@")[0] });
    
    // Close modal and reset form
    setShowLoginModal(false);
    setLoginEmail("");
    setLoginPassword("");
    
    // Add product to cart
    if (product) {
      addToCart(product);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  const savings = product.mrp - product.price;
  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <>
      <section className="product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>

        <p className="special-price">
          Special Price: <span id="price">₹{product.price}</span>
        </p>
        <p className="mrp">
          MRP: <span id="mrp">₹{product.mrp}</span>
        </p>
        <p className="savings">
          Savings: <span id="savings">₹{savings}</span>
        </p>

        <p className="in-stock">✓ In Stock</p>
        <p>Available Quantity: <span id="stock">{product.stock}</span></p>
        <p>Size: <span id="size">{product.size}</span></p>
        <p>Brand: <span id="brand">{product.brand}</span></p>
        <p>Delivered By: <span id="delivery">{product.delivery}</span></p>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add To Cart
        </button>
        {showMessage && (
          <div className="cart-message">
            ✓ {product.name} added to cart!
          </div>
        )}
        <button className="buy-now" onClick={() => alert("Proceeding to checkout...")}>
          Buy Now
        </button>

        <h3 style={{ marginTop: "20px" }}>Description</h3>
        <p id="description">{product.description}</p>
      </div>
    </section>

    {/* Related Products Section */}
    <section className="related-products">
      <h2>You Might Also Like</h2>
      <div className="grid">
        {relatedProducts.map((item) => (
          <ProductCard key={item.id} product={item} onShowLoginModal={() => setShowLoginModal(true)} />
        ))}
      </div>
    </section>

    {/* Login Modal for Add to Cart */}
    {showLoginModal && (
      <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowLoginModal(false)}>
            <i className="fa-solid fa-times"></i>
          </button>
          <h2>Login to Add to Cart</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "20px", fontSize: "14px" }}>
            Please log in to add this item to your cart.
          </p>
          {loginError && <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>{loginError}</p>}
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input 
                type="email" 
                id="login-email" 
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input 
                type="password" 
                id="login-password" 
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Login & Add to Cart</button>
          </form>
          <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", color: "#666" }}>
            Don't have an account? <a href="/register" style={{ color: "orangered", textDecoration: "none", fontWeight: "600" }}>Sign Up</a>
          </p>
        </div>
      </div>
    )}
    </>
  );
}
