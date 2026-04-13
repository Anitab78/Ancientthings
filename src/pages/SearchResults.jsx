import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../componets/productcard.jsx";
import products from "../data/product.jsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (query.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
    setLoading(false);
  }, [query]);

  if (loading) {
    return <section className="all-products"><h2>Loading...</h2></section>;
  }

  return (
    <section className="all-products">
      <h2>Search Results for "{query}"</h2>
      {results && results.length > 0 ? (
        <div className="grid">
          {results.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "18px", color: "#666", padding: "40px", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>No products found matching "{query}". Try a different search term.</p>
        </div>
      )}
    </section>
  );
}
