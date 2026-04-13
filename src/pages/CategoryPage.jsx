import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import products from "../data/product.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import ProductCard from "../componets/productcard.jsx";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Map category names to product categories
  const categoryMap = {
    "wood-craft": "woodcraft",
    "woodcraft": "woodcraft",
    "pooja-articles": "pooja",
    "pooja": "pooja",
    "wall-decor": "wall-decor",
    "resin-jewellery": "resin",
    "resin": "resin",
    "handmade-earrings": "handmade-earrings",
    "madhubani-painting": "madhubani",
    "madhubani": "madhubani",
    "glass-painting": "bottle",
    "bottle": "bottle",
    "lamps": "lamps",
    "photo-frames": "photo-frames",
  };

  const actualCategory = categoryMap[categoryName] || categoryName;

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === actualCategory.toLowerCase()
  );

  return (
    <section className="category-section">
      <div className="category-header">
        <h2>{categoryName.replace(/-/g, " ").toUpperCase()}</h2>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category</p>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onShowLoginModal={() => setShowLoginModal(true)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
