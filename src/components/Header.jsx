import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBars, FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useShop } from '../context/ShopContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  padding: 1rem 2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99999;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--pastel-blue);
  span { color: var(--pastel-pink); }
`;

const SearchBar = styled.div`
  flex: 1;
  margin: 0 2rem;
  position: relative;
  max-width: 500px;

  input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    border: 2px solid var(--pastel-beige);
    border-radius: 25px;
    outline: none;
    font-size: 0.9rem;
    transition: border-color 0.3s;

    &:focus {
      border-color: var(--pastel-blue);
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
  }

  @media (max-width: 1024px) {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    order: 3;
    margin: 0;
    max-width: 100%;
    width: 100%;
    
    input {
      padding: 0.6rem 1rem 0.6rem 2.22rem;
    }
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-dark);
  position: relative;
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  &:hover {
    color: var(--pastel-blue);
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    position: absolute;
    top: -2px;
    right: -2px;
    background: var(--pastel-pink);
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 50%;
  }
`;

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cart, wishlist } = useShop();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <HeaderContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </IconButton>
          <Logo to="/">Pastel<span>Shop</span></Logo>
        </div>

        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </SearchBar>

        <IconGroup>
          <IconButton onClick={handleWishlistClick} title="Go to Wishlist">
            <FaHeart />
            {wishlist.length > 0 && <span>{wishlist.length}</span>}
          </IconButton>
          <IconButton onClick={handleCartClick} title="Go to Cart">
            <FaShoppingCart />
            {cart.length > 0 && <span>{cart.length}</span>}
          </IconButton>
        </IconGroup>
      </HeaderContainer>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
