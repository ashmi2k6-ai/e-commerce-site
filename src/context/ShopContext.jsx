import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, { ...product, addedAt: Date.now() }]);
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const addToWishlist = (product) => {
        if (!wishlist.find(item => item.id === product.id)) {
            setWishlist((prev) => [...prev, { ...product, addedAt: Date.now() }]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter(item => item.id !== productId));
    };

    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            const filtered = prev.filter(item => item.id !== product.id);
            return [product, ...filtered].slice(0, 8);
        });
    };

    const placeOrder = (items) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            status: 'Confirmed',
            items: items,
            total: items.reduce((acc, item) => acc + item.price, 0)
        };
        setOrders((prev) => [newOrder, ...prev]);
        setCart([]);
    };

    const value = {
        cart,
        wishlist,
        orders,
        recentlyViewed,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        addToRecentlyViewed,
        placeOrder
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
