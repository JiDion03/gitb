import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import { AuthProvider, useAuth } from './pages/login/AuthContext'; 
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
import CartPage from './pages/Cart/Cart';
import FavoritesPage from "./pages/Favorite/Favorite";
import DistributorProfile from './pages/profile/DistributorProfile';
import { FavoritesProvider } from './pages/Favorite/FavoritesContext';
import { NotificationProvider } from './components/notifications/NotificationContext';
import EmailVerify from './pages/verifyEmail/verifyEmail';
import "./index.css";
import Product from './pages/products/Product';
import EditItem from './components/Items/EditItem'; 
import CheckoutForm from './pages/CheckoutForm/CheckoutForm';
import DistributorOrders from './pages/profile/DistributorOrders';
import RoleBasedProfile from './pages/profile/RoleBasedProfile';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { auth } = useAuth();
  return auth.isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

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
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
           <FavoritesProvider>
           <NotificationProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/favorites" element={<FavoritesPage products={products} />} />
                    <Route path="/account/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/items" element={<ItemList />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/add-item" element={<ItemForm />} />
                    <Route path="/products" element={<Home />} />
                    <Route path="/profile/:userId/*" element={<RoleBasedProfile />} />
                    <Route path="/distributor/:userId/*" element={<RoleBasedProfile />} />
                    <Route path="/checkout" element={<ProtectedRoute element={CheckoutForm} />} /> 
                    <Route path="/distributor/orders" element={<ProtectedRoute element={DistributorOrders} />} />
                    <Route path="/verify/:userId/:token" element={<EmailVerify />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/edit-item/:productId" element={<ProtectedRoute element={EditItem} />} /> 
                    <Route path="*" element={<div>404 Not Found</div>} />
                  </Routes>
                </Layout>
              </NotificationProvider>
            </FavoritesProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
