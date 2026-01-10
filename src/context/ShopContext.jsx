import React, { createContext, useState, useContext, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // Initialize state from localStorage or default to empty array
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading cart:", e);
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading wishlist:", e);
            return [];
        }
    });

    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem('myOrders');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading orders:", e);
            return [];
        }
    });

    const [checkoutProduct, setCheckoutProduct] = useState(null);


    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        try {
            const saved = localStorage.getItem('recentlyViewed');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error loading recently viewed:", e);
            return [];
        }
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('myOrders', JSON.stringify(orders));
    }, [orders]);


    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

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

    const buyNow = (product, navigate) => {
        console.log('=== BUYNOW FUNCTION CALLED ===');
        console.log('Product received:', product);
        console.log('Navigate function:', navigate);

        setCheckoutProduct(product);
        // Save to localStorage as backup
        localStorage.setItem('checkoutProduct', JSON.stringify(product));
        console.log('Checkout product set and saved to localStorage');

        if (navigate) {
            console.log('Navigating to /payment...');
            navigate('/payment');
        } else {
            console.error('Navigate not provided, using fallback');
            window.location.href = '/payment';
        }
    };


    const value = {
        cart,
        wishlist,
        orders,
        recentlyViewed,
        checkoutProduct,
        setOrders,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        addToRecentlyViewed,
        placeOrder,
        buyNow
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
