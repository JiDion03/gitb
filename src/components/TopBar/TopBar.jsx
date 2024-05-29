import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopBar.less";
import Button from "../button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../pages/login/AuthContext";
import { useNotification } from "../notifications/NotificationContext";

const TopBar = ({ setProducts }) => {
  const { auth, setAuth } = useAuth();
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null, token: null });
    localStorage.removeItem("token");
    showNotification("Logged out successfully!", "info");
    navigate("/login");
  };

  const handleAddProductClick = () => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else if (auth.user && auth.user.role === "distributor") {
      navigate("/add-product");
    }
  };

  return (
    <div className="top-bar">
      <div className="left-button-group">
        <Link to="/products" className="header-button-link">
          <Button className="header-button">Products</Button>
        </Link>
        {auth.isLoggedIn && auth.user && auth.user.role === "distributor" && (
          <Button className="header-button" onClick={handleAddProductClick}>
            Add Product
          </Button>
        )}
      </div>
      <div className="center-container">
        <SearchBar setProducts={setProducts} />
      </div>
      <div className="button-group">
        {auth.isLoggedIn && auth.user ? (
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
            <Button className="header-button">My Account</Button>
          </Link>
        )}
        <Link to="/cart" className="header-button-link">
          <Button className="header-button">Cart</Button>
        </Link>
        <Link to="/favorites" className="header-button-link">
          <Button className="header-button">Favorites</Button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
