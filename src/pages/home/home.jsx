import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.less";
import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button";
import { useAuth } from "../login/AuthContext";
import { useNotification } from "../../components/notifications/NotificationContext";
import DisplayProducts from "../DisplayProduct/DisplayProduct";
import FilterComponent from "../../components/filter/FilterComponent";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useProducts } from "../../components/hooks/useProducts";
import TopBar from "../../components/TopBar/TopBar";

const Home = () => {
  const { products, setProducts } = useProducts();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth Object:", auth);
    if (auth.isLoggedIn) {
      console.log("User is logged in:", auth.user);
      if (auth.user) {
        console.log("User role:", auth.user.role);
      }
    }
  }, [auth]);

  const handleCategorySelect = async (category, subcategory) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/filter?category=${category}&subcategory=${subcategory}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const filteredProducts = await response.json();
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  return (
    <div className="home">
      <TopBar setProducts={setProducts} />
      <div className="navigation-container">
        <Navbar onCategorySelect={handleCategorySelect} />
        <FilterComponent setProducts={setProducts} />
      </div>
      <ErrorBoundary>
        <DisplayProducts products={products} setProducts={setProducts} />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
