import React, { useState } from "react"; 
import "./home.less";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/button/Button";
import { useAuth } from "../login/AuthContext"; 
import DisplayProducts from "../DisplayProduct/DisplayProduct";
import FilterComponent from '../../components/filter/FilterComponent';
import ErrorBoundary from '../../components/ErrorBoundary';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { auth, setAuth } = useAuth(); 

  const userId = auth.user && auth.user.id; 

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setSearchQuery(query);
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  
  const handleCategorySelect = async (category, subcategory) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/filter?category=${category}&subcategory=${subcategory}`);
      const filteredProducts = await response.json();
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); 
    }
  };

  return (
    <div className="home">
      <div className="top-bar">
        <div className="left-button-group">
          <Link to="/products" className="header-button-link">
            <Button className="header-button">Products</Button>
          </Link>
          <Link to="/offers" className="header-button-link">
            <Button className="header-button">Offers</Button>
          </Link>
        </div>
        <div className="center-container">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        </div>
        <div className="button-group">
          {auth.isLoggedIn && userId ? (
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

      <div className="navigation-container">
        <Navbar onCategorySelect={handleCategorySelect} />
        <FilterComponent setProducts={setProducts} />
      </div>


      <ErrorBoundary>
        <DisplayProducts products={products} setProducts={setProducts} />
      </ErrorBoundary>

      <h1>Proiecte Colective 2024</h1>
      <Link to="/about">Frontend</Link>
      <Link to="/add-product" className="header-button-link">
        <Button className="header-button">Add Product</Button>
      </Link>
      <Link to="/items" className="header-button-link">
        <Button className="header-button">List of Products</Button>
      </Link>
      <Button onClick={() => setAuth({ isLoggedIn: !auth.isLoggedIn })}>Toggle Login</Button> 
    </div>
  );
};

export default Home;
