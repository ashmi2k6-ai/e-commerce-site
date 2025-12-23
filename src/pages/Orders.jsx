import React from 'react';
import styled from 'styled-components';
import { useShop } from '../context/ShopContext';

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--text-dark);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--pastel-pink);
  padding-bottom: 1rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f5f5f5;
  
  div {
    font-size: 0.9rem;
    color: #666;
  }
  
  .status {
    color: #90EE90;
    font-weight: bold;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 5px;
    background: #fdfdfd;
    padding: 3px;
    border: 1px solid #f0f0f0;
  }

  span {
    font-size: 0.95rem;
  }
  
  .price {
    margin-left: auto;
    font-weight: 600;
  }
`;

const TotalRow = styled.div`
  text-align: right;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f5f5f5;
  font-weight: 700;
  color: var(--pastel-blue);
`;

const Orders = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <Container>
        <Title>My Orders</Title>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          <h3>No orders yet</h3>
          <p>Start shopping to see your history!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Orders</Title>
      {orders.map(order => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <div>
              <strong>Order ID:</strong> #{order.id}<br />
              Placed on: {order.date}
            </div>
            <div className="status">{order.status}</div>
          </OrderHeader>
          {order.items.map((item, idx) => (
            <OrderItem key={idx}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
              <span className="price">${item.price}</span>
            </OrderItem>
          ))}
          <TotalRow>
            Total Paid: ${order.total.toFixed(2)}
          </TotalRow>
        </OrderCard>
      ))}
    </Container>
  );
};

export default Orders;
