import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { FaArrowLeft, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto 100px; /* Space for fixed buttons */
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-dark);
  &:hover { color: var(--pastel-blue); }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageArea = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img { 
    width: 100%; 
    height: 400px; 
    object-fit: contain; 
  }
`;

const HeartBtnDetail = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1.5px solid #000;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  color: ${props => props.isWishlisted ? 'var(--pastel-pink)' : '#000'};
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);

  svg {
      font-size: 1.3rem;
  }
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
`;

const Price = styled.div`
  font-size: 1.8rem;
  color: var(--pastel-blue);
  font-weight: 700;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #ffc107;
  gap: 0.5rem;
  font-size: 1.1rem;
  span { color: #999; font-size: 0.95rem; font-weight: 500; }
`;

const Desc = styled.p`
  line-height: 1.8;
  color: #555;
  font-size: 1.05rem;
`;

const FixedBottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 1.2rem 2rem;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.05);
  display: flex;
  gap: 1.5rem;
  z-index: 500;
  justify-content: center;
`;

const ActionBtn = styled.button`
  flex: 1;
  max-width: 400px;
  padding: 1.1rem;
  border-radius: 40px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover { transform: translateY(-3px); }
  &:active { transform: scale(0.95); }
`;

const CartBtn = styled(ActionBtn)`
  background: white;
  color: #333;
  border: 2px solid #333;
  &:hover { background: #f9f9f9; }
`;

const BuyBtn = styled(ActionBtn)`
  background: var(--pastel-blue);
  color: white;
  box-shadow: 0 4px 15px rgba(135,206,235,0.3);
  &:hover { background: #6fc6f0; }
`;

const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
`;

const PaymentModal = styled(motion.div)`
    background: white;
    padding: 2.5rem;
    border-radius: 30px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    
    h2 { margin-top: 0; color: #333; }
`;

const PaymentOption = styled.button`
    width: 100%;
    padding: 1.2rem;
    margin-bottom: 0.8rem;
    border: 2px solid ${props => props.selected ? 'var(--pastel-blue)' : '#eee'};
    background: ${props => props.selected ? '#f0faff' : 'white'};
    border-radius: 15px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
    
    &:hover { border-color: var(--pastel-blue); }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist, addToRecentlyViewed, placeOrder } = useShop();
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const product = products.find(p => p.id === parseInt(id));

  React.useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) return <Container>Product not found.</Container>;

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleWishlist = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart! ✨`);
  };

  const handleFinishOrder = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }
    placeOrder([product]);
    setPaymentModalOpen(false);
    alert("Order Placed Successfully! 🎉");
    navigate('/orders');
  };

  return (
    <Container>

      <DetailGrid>
        <ImageArea>
          <img src={product.image} alt={product.name} />
          <HeartBtnDetail onClick={handleWishlist} isWishlisted={isWishlisted}>
            {isWishlisted ? <FaHeart /> : <FaRegHeart />}
          </HeartBtnDetail>
        </ImageArea>

        <InfoArea>
          <Title>{product.name}</Title>

          <Rating>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.floor(product.rating) ? "#ffc107" : "#eee"} />
              ))}
            </div>
            <span>({product.reviewCount} verified reviews)</span>
          </Rating>

          <Price>${product.price}</Price>

          <Desc>
            Experience the premium quality and exceptional design of our {product.name}.
            Carefully crafted for those who appreciate both functionality and aesthetics.
            Perfectly fits into your pastel-themed lifestyle.
          </Desc>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <div style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem' }}>Free Shipping</div>
            <div style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem' }}>Premium Quality</div>
            <div style={{ background: '#f0f0f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem' }}>Sustainable</div>
          </div>
        </InfoArea>
      </DetailGrid>

      <FixedBottomBar>
        <CartBtn onClick={handleAddToCart}>Add to Cart</CartBtn>
        <BuyBtn onClick={() => setPaymentModalOpen(true)}>Buy Now</BuyBtn>
      </FixedBottomBar>

      <AnimatePresence>
        {isPaymentModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PaymentModal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2>Select Payment Method</h2>
              <div style={{ margin: '1.5rem 0' }}>
                {['Cash on Delivery', 'GPay', 'RazorPay', 'UPI'].map(method => (
                  <PaymentOption
                    key={method}
                    selected={selectedMethod === method}
                    onClick={() => setSelectedMethod(method)}
                  >
                    {method}
                    {selectedMethod === method && <FaStar size={14} />}
                  </PaymentOption>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <ActionBtn style={{ background: '#eee', flex: 1 }} onClick={() => setPaymentModalOpen(false)}>Cancel</ActionBtn>
                <BuyBtn style={{ flex: 2 }} onClick={handleFinishOrder}>Place Order</BuyBtn>
              </div>
            </PaymentModal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ProductDetail;
