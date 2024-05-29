import React from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Cart.less";
import Navbar from "../../components/navbar/Navbar";

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites") ||
    location.pathname.startsWith("/cart");

  const pageStyles = isSpecialPage ? { boxSizing: "border-box" } : {};

  const totalPrice =
    cartItems?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) || 0;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container" style={pageStyles}>
        <Navbar />
        <p className="empty-cart-message">Your cart is empty.</p>
        <div className="cart-footer">
          <button onClick={() => navigate(-1)} className="back-button">
            Back to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container" style={pageStyles}>
      <Navbar />
      <h2 className="cart-text">Your Shopping Cart</h2>
      {cartItems.map(({ product, quantity }) => (
        <div key={product._id} className="cart-item">
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt={product.name}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {quantity}</p>
            <p>Total: ${product.price * quantity}</p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="remove-cart-button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-footer">
        <button onClick={() => navigate(-1)} className="back-button">
          Back to shopping
        </button>
        <span className="total-price">Total: ${totalPrice.toFixed(2)}</span>
        <button
          className="checkout-button"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
