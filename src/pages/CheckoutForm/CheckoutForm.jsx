import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { useNotification } from '../../components/notifications/NotificationContext';
import './CheckoutForm.less';

const CheckoutForm = () => {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Cash',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prevData) => ({ ...prevData, paymentMethod: method }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      console.error('Cart items are undefined or empty.');
      showNotification('Cart is empty', 'error');
      return;
    }

    const items = cartItems.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
      distributor: item.product.distributor // Ensure distributor is included
    }));
    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login');
        return;
      }

      const orderData = {
        items,
        address: formData,
        paymentMethod: formData.paymentMethod,
        totalPrice,
      };

      console.log('Order data being sent:', orderData);

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      clearCart();
      showNotification('Order placed successfully!', 'success');
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/profile/orders');
      }, 5000);
    } catch (error) {
      showNotification('Failed to place order', 'error');
      console.error('Error placing order:', error.response ? error.response.data : error.message);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success-container">
        <div className="order-success-message">
          <div className="checkmark">✓</div>
          <h2>Order Successfully Placed!</h2>
          <p>Thank you for your purchase.</p>
          <button onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-form-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input name="addressLine" value={formData.addressLine} onChange={handleChange} placeholder="Address" required />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
        <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />

        <div className="payment-method">
          <button
            type="button"
            className={formData.paymentMethod === 'Cash' ? 'selected' : ''}
            onClick={() => handlePaymentMethodChange('Cash')}
          >
            Cash
          </button>
          <button
            type="button"
            className={formData.paymentMethod === 'Card' ? 'selected' : ''}
            onClick={() => handlePaymentMethodChange('Card')}
          >
            Card
          </button>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
