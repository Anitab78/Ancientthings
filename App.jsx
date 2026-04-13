import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./src/componets/navbar.jsx";
import Footer from "./src/componets/footer.jsx";
import Home from "./src/pages/home.jsx";
import Products from "./src/pages/products.jsx";
import ProductDetail from "./src/pages/ProductDetail.jsx";
import CategoryPage from "./src/pages/CategoryPage.jsx";
import Login from "./src/pages/login.jsx";
import Register from "./src/pages/register.jsx";
import Cart from "./src/componets/cart.jsx";
import SearchResults from "./src/pages/SearchResults.jsx";
import "./App.css";

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/cart";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}
