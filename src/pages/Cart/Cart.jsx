import React from 'react';
import { useCart } from './CartContext';  
import { useNavigate } from 'react-router-dom';  
import './Cart.less'; 

function CartPage() {
    const { cart } = useCart();
    const navigate = useNavigate(); 

    const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <p>Your cart is empty.</p>
                <div className="cart-footer">
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {cart.map(({ product, quantity }) => (
                <div key={product._id} className="cart-item">
                    <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} style={{ width: "100px", height: "auto" }} />
                    <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Total: ${product.price * quantity}</p>
                    </div>
                </div>
            ))}
            <div className="cart-footer">
                <button onClick={() => navigate('/')}>Back to Home</button>
                <span className="total-price">Total: ${totalPrice.toFixed(2)}</span>
                <button className="checkout-button" onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
        </div>
    );
}

export default CartPage;
