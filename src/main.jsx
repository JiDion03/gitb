import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { AuthProvider } from './pages/login/AuthContext'; 
import { CartProvider } from './pages/Cart/CartContext';
import { ProductProvider } from './components/hooks/useProducts';
import Layout from './components/Layout';
import Home from "./pages/home/home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ItemList from './components/Items/ItemList';
import ItemForm from './components/Items/ItemForm';
import Profile from './pages/profile/Profile';
import AddProduct from "./pages/addProduct/AddProduct";
import DisplayProducts from "./pages/DisplayProduct/DisplayProduct";
import CartPage from './pages/Cart/Cart';
import FavoritesPage from './pages/Favorite/Favorite';
import EmailVerify from "./pages/verifyEmail/verifyEmail";
import DistributorProfile from './pages/profile/DistributorProfile';
import "./index.css";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage products={products} />} />
      <Route path="/usershop" element={<div>usershop tab</div>} />
      <Route path="/about" element={<div>About Frontend</div>} />
      <Route path="/daily_offers" element={<div>The daily offers</div>} />
      <Route path="/support" element={<div>SUPPORT</div>} />
      <Route path="/account" element={<div>If you're logged in, otherwise create an account</div>} />
      <Route path="/account/register" element={<Register />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgot_password" element={<div>Nu avem ce face:)</div>} />
      <Route path="/items" element={<ItemList />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-item" element={<ItemForm />} />
      <Route path="/verify/:userId/:token" element={<EmailVerify />} />
      <Route path="/products" element={<DisplayProducts products={products} setProducts={setProducts} />} />
      <Route path="/404" element={<div>404 Not Found</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/usershop" element={<div>usershop tab</div>} />
                <Route path="/about" element={<div>About Frontend</div>} />
                <Route path="/daily_offers" element={<div>The daily offers</div>} />
                <Route path="/support" element={<div>SUPPORT</div>} />
                <Route path="/account" element={<div>If you're logged in, otherwise create an account</div>} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/forgot_password" element={<div>Nu avem ce face:)</div>} />
                <Route path="/items" element={<ItemList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/add-item" element={<ItemForm />} />
                <Route path="/products" element={<Home />} />
                <Route path="/distributor/:userId" element={<DistributorProfile />} />
                <Route path="/verify/:userId/:token" element={<EmailVerify />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/404" element={<div>404 Not Found</div>} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
