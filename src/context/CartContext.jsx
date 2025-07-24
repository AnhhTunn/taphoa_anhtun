import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [userId, setUserId] = useState('guest');
    const [cartItems, setCartItems] = useState([]);
    // Theo dõi thay đổi user từ localStorage
    useEffect(() => {
        const checkUser = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUserId(storedUser?.id || 'guest');
        };
        // Lấy user lần đầu
        checkUser();
        // Theo dõi khi tab khác hoặc code khác cập nhật user
        window.addEventListener('storage', checkUser);

        return () => window.removeEventListener('storage', checkUser);
    }, []);

    const storageKey = `cart_user_${userId}`;
    // Load cart theo userId
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        setCartItems(saved ? JSON.parse(saved) : []);
    }, [userId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(storageKey, JSON.stringify(cartItems));
        }
    }, [cartItems, userId]);
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter(item => item.id !== id));
    };
    const increaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };
    const decreaseQuantity = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };
    const clearCart = () => setCartItems([]);
    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
