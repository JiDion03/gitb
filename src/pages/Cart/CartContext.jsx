import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prevCart => {
            const existingIndex = prevCart.findIndex(item => item.product._id === product._id);
            if (existingIndex >= 0) {
                const newCart = [...prevCart];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + 1
                };
                return newCart;
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevCart => prevCart.filter(item => item.product._id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        console.log("Cart after update:", cartItems);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
