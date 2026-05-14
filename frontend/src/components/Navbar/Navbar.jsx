import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const {
    getTotalCartAmount,
    token,
    setToken,
    setSearchText,
    searchText,
  } = useContext(StoreContext);

  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Hide search + clear when leaving menu
  useEffect(() => {
    if (location.pathname !== "/menu") {
      setShowSearch(false);
      setSearchText("");
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>

        {/* Menu */}
        <ul className="navbar-menu">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            home
          </Link>

          <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>
            menu
          </Link>

          <Link to="/mobile-app" className={location.pathname === "/mobile-app" ? "active" : ""}>
            mobile-app
          </Link>

          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            contact us
          </Link>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          {/* 🔍 SEARCH ICON */}
          <img
            src={assets.search_icon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/menu");        // go to menu
              setShowSearch(true);      // always show search
            }}
          />

          {/* Cart */}
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {/* Auth */}
          {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 🔍 SEARCH INPUT */}
      {showSearch && location.pathname === "/menu" && (
        <div className="search-bar">
          <input
            type="text"
            value={searchText}
            placeholder="Search food..."
            autoFocus
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;