import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

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
              <Route path="/products" element={<Home />}  />
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