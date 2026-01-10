import React from 'react';
import styled from 'styled-components';
import { useShop } from '../context/ShopContext';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

const CartItem = styled.div`
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

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  
  &:hover {
    color: red;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
  }
`;

const Summary = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  text-align: right;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--pastel-blue);
  }
`;

const CheckoutBtn = styled.button`
  background: var(--pastel-blue);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Cart = () => {
  const { cart, removeFromCart, placeOrder } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const sortedCart = [...cart].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

  const handleCheckout = () => {
    if (cart.length === 0) return;
    placeOrder(cart);
    alert('Order Placed Successfully!');
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Title>My Cart</Title>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          <h3>Your cart is empty</h3>
          <p>Add some pastel goodies to brighten your day!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Cart ({cart.length} items)</Title>
      {sortedCart.map((item, index) => (
        <CartItem key={`${item.id}-${index}`}>
          <img src={item.image} alt={item.name} />
          <ItemInfo>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p style={{ fontSize: '0.8rem', color: '#999' }}>Added on: {new Date(item.addedAt).toLocaleString()}</p>
          </ItemInfo>
          <RemoveBtn onClick={() => removeFromCart(item.id)}>
            <FaTrash />
          </RemoveBtn>
        </CartItem>
      ))}

      <Summary>
        <h3>Total: ${total.toFixed(2)}</h3>
        <CheckoutBtn onClick={handleCheckout}>
          <FaCheckCircle /> Place Order
        </CheckoutBtn>
      </Summary>
    </Container>
  );
};

export default Cart;
