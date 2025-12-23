import React from 'react';
import styled from 'styled-components';
import { FaTicketAlt, FaCopy } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--text-dark);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--pastel-blue);
  padding-bottom: 1rem;
`;

const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CouponCard = styled.div`
  background: white;
  border: 2px dashed ${props => props.color || 'var(--pastel-pink)'};
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  /* Rimmed edges effect */
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--bg-pastel);
    border-radius: 50%;
  }

  &::before { left: -10px; top: 50%; transform: translateY(-50%); }
  &::after { right: -10px; top: 50%; transform: translateY(-50%); }
`;

const Discount = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.color || 'var(--pastel-pink)'};
  margin-bottom: 0.5rem;
`;

const Brand = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.2rem;
`;

const Product = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const CodeWrapper = styled.div`
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: monospace;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #eee;
  }
`;

const coupons = [
    { id: 1, discount: "50% OFF", brand: "Pastel Wear", product: "Classic Hoodie", code: "HOODIE50", color: "#FADADD" },
    { id: 2, discount: "30% OFF", brand: "Glow Skin", product: "Facial Serum", code: "GLOW30", color: "#FFB7B2" },
    { id: 3, discount: "20% OFF", brand: "Tech Flow", product: "Wireless Earbuds", code: "TECH20", color: "#87CEEB" },
    { id: 4, discount: "40% OFF", brand: "Home Bliss", product: "Scented Candle", code: "HOME40", color: "#E2F0CB" },
    { id: 5, discount: "15% OFF", brand: "Pet Joy", product: "Soft Pet Bed", code: "PET15", color: "#B39EB5" },
    { id: 6, discount: "60% OFF", brand: "Style Feet", product: "Canvas Sneakers", code: "STYLE60", color: "#FFDAB9" },
    { id: 7, discount: "25% OFF", brand: "Pure Hair", product: "Herbal Shampoo", code: "HAIR25", color: "#90EE90" },
    { id: 8, discount: "45% OFF", brand: "Luxe Decor", product: "Accent Pillow", code: "LUXE45", color: "#F5F5DC" }
];

const Coupons = () => {
    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Code ${code} copied to clipboard!`);
    };

    return (
        <Container>
            <Title>Coupons Zone</Title>
            <CouponGrid>
                {coupons.map(coupon => (
                    <CouponCard key={coupon.id} color={coupon.color}>
                        <FaTicketAlt size={30} color={coupon.color} style={{ marginBottom: '1rem' }} />
                        <Discount color={coupon.color}>{coupon.discount}</Discount>
                        <Brand>{coupon.brand}</Brand>
                        <Product>on {coupon.product}</Product>
                        <CodeWrapper onClick={() => copyCode(coupon.code)}>
                            {coupon.code} <FaCopy size={12} color="#999" />
                        </CodeWrapper>
                    </CouponCard>
                ))}
            </CouponGrid>
        </Container>
    );
};

export default Coupons;
