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

  // Check if the current path matches the profile page pattern
  const isProfilePage = location.pathname.startsWith('/profile');

  return (
    <div>
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
      {!isProfilePage && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
