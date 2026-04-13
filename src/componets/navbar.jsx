import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleModalLogin = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      login({ email: loginEmail, name: loginEmail.split("@")[0] });
      alert("Login successful!");
      setShowLoginModal(false);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      alert("Please enter email and password");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("Logged out successfully!");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="/images/icon.png" alt="Ancient Icon" />
          <h2>ANCIENT THINGS</h2>
        </div>
        <div className="nav-links">
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <Link to="/cart" className="login-btn-nav">
            <i className="fa-solid fa-cart-shopping"></i>
            Cart
          </Link>
          
          {isLoggedIn ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "20px" }}>
                <span style={{ color: "white", fontWeight: "500" }}>
                  <i className="fa-solid fa-user-circle" style={{ marginRight: "8px" }}></i>
                  {user?.name || user?.email}
                </span>
                <button 
                  className="login-btn-nav"
                  onClick={handleLogout}
                  style={{ color: "white", background: "rgba(255, 69, 0, 0.8)", padding: "8px 12px", borderRadius: "5px" }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button 
                className="login-btn-nav"
                onClick={() => setShowLoginModal(true)}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </button>
              <button 
                className="login-btn-nav"
                onClick={() => setShowSignupModal(true)}
              >
                <i className="fa-solid fa-user-plus"></i>
                Create Account
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Login Modal Popup */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLoginModal(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
            <h2>Login to Your Account</h2>
            <form className="login-form" onSubmit={handleModalLogin}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="signup-link">
              Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); setShowLoginModal(false); setShowSignupModal(true);}}>Sign Up</a>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal Popup */}
      {showSignupModal && (
        <div className="modal-overlay" onClick={() => setShowSignupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowSignupModal(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
            <h2>Create Account</h2>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input 
                  type="text" 
                  id="fullname" 
                  placeholder="Enter your full name"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email-signup">Email Address</label>
                <input 
                  type="email" 
                  id="email-signup" 
                  placeholder="Enter your email"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="password-signup">Password</label>
                <input 
                  type="password" 
                  id="password-signup" 
                  placeholder="Enter your password"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  placeholder="Confirm your password"
                  required 
                />
              </div>
              <button type="submit" className="submit-btn">Create Account</button>
            </form>
            <p className="signup-link">
              Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); setShowSignupModal(false); setShowLoginModal(true);}}>Login</a>
            </p>
          </div>
        </div>
      )}

      <div className="category-bar">
        <ul className="categories">
          <li>
            <Link to="/"><i className="fa-solid fa-house"></i> Home</Link>
          </li>
          <li className="dropdown">
            <button className="category-toggle" onClick={() => toggleDropdown("home")}>
              <i className="fa-solid fa-home"></i> Home & Living
              <i className={`fa-solid fa-chevron-down ${openDropdown === "home" ? "active" : ""}`}></i>
            </button>
            <div className={`dropdown-menu ${openDropdown === "home" ? "active" : ""}`}>
              <Link to="/category/wood-craft">Wood Craft</Link>
              <Link to="/category/pooja-articles">Pooja Articles</Link>
              <Link to="/category/wall-decor">Wall Decor</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="category-toggle" onClick={() => toggleDropdown("jewellery")}>
              <i className="fa-solid fa-ring"></i> Jewellery
              <i className={`fa-solid fa-chevron-down ${openDropdown === "jewellery" ? "active" : ""}`}></i>
            </button>
            <div className={`dropdown-menu ${openDropdown === "jewellery" ? "active" : ""}`}>
              <Link to="/category/resin-jewellery">Resin Jewellery</Link>
              <Link to="/category/handmade-earrings">Handmade Earrings</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="category-toggle" onClick={() => toggleDropdown("painting")}>
              <i className="fa-solid fa-palette"></i> Painting
              <i className={`fa-solid fa-chevron-down ${openDropdown === "painting" ? "active" : ""}`}></i>
            </button>
            <div className={`dropdown-menu ${openDropdown === "painting" ? "active" : ""}`}>
              <Link to="/category/madhubani-painting">Madhubani Painting</Link>
              <Link to="/category/glass-painting">Glass Painting</Link>
            </div>
          </li>
          <li className="dropdown">
            <button className="category-toggle" onClick={() => toggleDropdown("gifts")}>
              <i className="fa-solid fa-gift"></i> Gifts
              <i className={`fa-solid fa-chevron-down ${openDropdown === "gifts" ? "active" : ""}`}></i>
            </button>
            <div className={`dropdown-menu ${openDropdown === "gifts" ? "active" : ""}`}>
              <Link to="/category/lamps">Lamps</Link>
              <Link to="/category/photo-frames">Photo Frames</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
