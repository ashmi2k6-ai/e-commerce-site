import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Account from './pages/Account';
import Notifications from './pages/Notifications';
import HelpCentre from './pages/HelpCentre';
import Coupons from './pages/Coupons';
import Chatbot from './components/Chatbot';
import HomeButton from './components/HomeButton';
import RecentlyViewed from './pages/RecentlyViewed';
import Payment from './pages/Payment';


function App() {
    return (
        <ShopProvider>
            <Router basename={import.meta.env.PROD ? '/e-commerce-site' : '/'}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:domain" element={<ProductListing />} />
                    <Route path="/search" element={<ProductListing />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/help" element={<HelpCentre />} />
                    <Route path="/coupons" element={<Coupons />} />
                    <Route path="/recently-viewed" element={<RecentlyViewed />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>

                <Chatbot />
                <HomeButton />
            </Router>
        </ShopProvider>
    );
}

export default App;
