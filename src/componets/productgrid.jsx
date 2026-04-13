import products from "../data/product.jsx";
import ProductCard from "./productcard.jsx";

export default function ProductGrid() {
  // Filter out category products from home page
  const filteredProducts = products.filter(
    (product) => product.category !== "woodcraft" && product.category !== "pooja" && product.category !== "wall-clock" && product.category !== "resin" && product.category !== "handmade-earrings" && product.category !== "madhubani" && product.category !== "bottle" && product.category !== "wall-decor" && product.category !== "lamps" && product.category !== "photo-frames"
  );

  return (
    <div className="grid">
      {filteredProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
