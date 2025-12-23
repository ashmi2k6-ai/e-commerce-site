import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 400px; /* Fixed height for consistency */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px; /* Standardized height */
  overflow: hidden;
  position: relative;
  background: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure full image is visible */
    padding: 10px;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: 1.5px solid #000; /* Black border as requested */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  color: ${props => props.isWishlisted ? 'var(--pastel-pink)' : '#000'};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 1rem;
    stroke: #000;
    stroke-width: 1px;
  }
`;

const Content = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--pastel-blue);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  margin-bottom: 0.8rem;
  
  .stars {
    color: #ffc107;
    display: flex;
  }
  
  .count {
    color: #999;
    font-weight: 500;
  }
`;

const AddToCartBtn = styled.button`
  background: var(--pastel-blue);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #6fc6f0;
    box-shadow: 0 4px 12px rgba(135,206,235,0.3);
  }
`;

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
      >
        <ImageContainer>
          <img src={product.image} alt={product.name} />
          <HeartBtn onClick={toggleWishlist} isWishlisted={isWishlisted}>
            {isWishlisted ? <FaHeart color="var(--pastel-pink)" /> : <FaRegHeart color="#000" />}
          </HeartBtn>
        </ImageContainer>
        <Content>
          <div>
            <Title title={product.name}>{product.name}</Title>
            <Rating>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(product.rating) ? "#ffc107" : "#eee"} />
                ))}
              </div>
              <span className="count">({product.reviewCount})</span>
            </Rating>
          </div>
          <PriceRow>
            <Price>${product.price}</Price>
            <AddToCartBtn onClick={handleAddToCart}>Add to Cart</AddToCartBtn>
          </PriceRow>
        </Content>
      </Card>
    </Link>
  );
};

export default ProductCard;
