import products from "../data/product.jsx";
import ProductCard from "./productcard.jsx";

export default function HomeLivingGrid() {
  // Show only specific HOME & LIVING products
  const homeLivingIds = [5, 6, 8, 10]; // Decorative Candle, Handmade Cushion, Traditional Saree, Tealights Pack
  
  const filteredProducts = products.filter(
    (product) => homeLivingIds.includes(product.id)
  );

  return (
    <div className="grid">
      {filteredProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
