import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Button from './button/Button';
import { useAuth } from '../pages/login/AuthContext';
import SearchBar from './SearchBar/SearchBar';

const Layout = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  // Check if the current path matches the profile or favorites page pattern
  const isProfileOrFavoritesPage = 
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/favorites');
    

  // Check if the current path matches the cart page pattern
  const isCartPage = location.pathname.startsWith('/cart');

  // Check if the current path matches the product page pattern
  const isProductPage = location.pathname.startsWith('/product')||
  location.pathname.startsWith('/add-product');
  const layoutStyles = isProfileOrFavoritesPage
    ? { paddingTop: '15vh', paddingLeft: '15vw', boxSizing: 'border-box' }
    : isCartPage || isProductPage
    ? { paddingTop: '15vh' }
    : {};

  return (
    <div style={layoutStyles}>
      <div className="top-bar">
        <div className="left-button-group">
          <Link to="/products" className="header-button-link">
            <Button className="header-button">Products</Button>
          </Link>
          <Link to="/offers" className="header-button-link">
            <Button className="header-button">Offers</Button>
          </Link>
        </div>
        <SearchBar />
        <div className="button-group">
          {auth.isLoggedIn && auth.user?.id ? (
            <div className="dropdown">
              <Button className="header-button">My Account</Button>
              <div className="dropdown-content">
                <Link to={`/profile/${auth.user.id}`}>View Profile</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          ) : (
            <Link to="/login" className="header-button-link">
              <Button className="header-button">Login</Button>
            </Link>
          )}
        </div>
      </div>
      {(!isProfileOrFavoritesPage && !isCartPage) && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
