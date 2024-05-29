import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Button from "./button/Button";
import { useAuth } from "../pages/login/AuthContext";
import SearchBar from "./SearchBar/SearchBar";

const Layout = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  const isProfileOrFavoritesPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites");

  const isCartPage = location.pathname.startsWith("/cart");
  const isProductPage =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/add-product");

  const isDistributorProfilePage =
    auth.user?.role === "distributor" &&
    (location.pathname.startsWith("/distributor") ||
      location.pathname.startsWith("/profile"));

  const layoutStyles = isProfileOrFavoritesPage
    ? { paddingTop: "15vh", paddingLeft: "15vw", boxSizing: "border-box" }
    : isCartPage || isProductPage
    ? { paddingTop: "15vh" }
    : {};

  return (
    <div style={layoutStyles}>
      <div className="top-bar">
        <div className="left-button-group">
          <Link to="/products" className="header-button-link">
            <Button className="header-button">Products</Button>
          </Link>
        </div>
        <SearchBar />
        <div className="button-group">
          {auth.isLoggedIn && auth.user?.id ? (
            <div className="dropdown">
              <Button className="header-button">My Account</Button>
              <div className="dropdown-content">
                <Link to={`/profile/${auth.user.id}`}>View Profile</Link>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header-button-link">
              <Button className="header-button">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {!isDistributorProfilePage &&
        !isProfileOrFavoritesPage &&
        !isCartPage && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
