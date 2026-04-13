import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProductCard({ product, onShowLoginModal }) {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      onShowLoginModal && onShowLoginModal();
      return;
    }

    console.log("Adding to cart:", product);
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <div className="card-body">
          <h4>{product.name}</h4>
          <p className="price">₹{product.price}</p>
        </div>
      </Link>

      <div className="card-footer">
        <button onClick={handleAddToCart}>Add to Cart</button>
        {showMessage && (
          <div className="cart-message">
            ✓ {product.name} added to cart!
          </div>
        )}
      </div>
    </div>
  );
}
