import React from 'react';
import styled from 'styled-components';
import { useShop } from '../context/ShopContext';
import { FaTrash, FaShoppingBag } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 80px;
  }
`;

const Title = styled.h2`
  color: var(--text-dark);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--pastel-pink);
  padding-bottom: 1rem;
`;

const WishItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 8px;
    background: #fdfdfd;
    padding: 5px;
    border: 1px solid #f0f0f0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
    padding: 1rem;

    img {
      width: 100%;
      height: 200px;
    }
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text-dark);
  }
  p {
    margin: 0.2rem 0;
    color: #666;
  }
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: #666;
  transition: color 0.2s;
  
  &:hover {
    color: var(--pastel-blue);
  }

  &.delete:hover {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    &.delete {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(255,255,255,0.8);
      border-radius: 50%;
    }
  }
`;

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <Container>
        <Title>My Wishlist</Title>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite items here!</p>
        </div>
      </Container>
    );
  }

  const sortedWishlist = [...wishlist].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

  return (
    <Container>
      <Title>My Wishlist ({wishlist.length} items)</Title>
      {sortedWishlist.map(item => (
        <WishItem key={item.id}>
          <img src={item.image} alt={item.name} />
          <ItemInfo>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p style={{ fontSize: '0.8rem', color: '#999' }}>Added on: {item.addedAt ? new Date(item.addedAt).toLocaleString() : 'Recently'}</p>
          </ItemInfo>
          <ActionBtn onClick={() => handleMoveToCart(item)} title="Move to Cart">
            <FaShoppingBag />
          </ActionBtn>
          <ActionBtn className="delete" onClick={() => removeFromWishlist(item.id)} title="Remove">
            <FaTrash />
          </ActionBtn>
        </WishItem>
      ))}
    </Container>
  );
};

export default Wishlist;
