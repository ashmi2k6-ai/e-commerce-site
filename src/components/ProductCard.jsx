import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaStar, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

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
  height: 480px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }

  @media (max-width: 1024px) {
    height: 460px;
  }

  @media (max-width: 768px) {
    height: auto;
    border-radius: 15px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: #f9f9f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }

  @media (max-width: 1024px) {
    height: 180px;
  }

  @media (max-width: 768px) {
    height: 130px; /* Reduced from 150px */
  }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: 1.5px solid #000;
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

const DiscountBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
`;

const Content = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0.5rem; /* Reduced from 0.8rem */
  }
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

  @media (max-width: 768px) {
    font-size: 0.8rem;
    height: 2.2rem;
    margin-bottom: 0.3rem;
  }
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

const PriceSection = styled.div`
  margin-bottom: 0.8rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.3rem;
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--pastel-blue);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #999;
  text-decoration: line-through;
`;

const OfferText = styled.div`
  font-size: 0.75rem;
  color: #27ae60;
  font-weight: 600;
  margin-top: 0.2rem;
`;

const DeliveryInfo = styled.div`
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  span {
    color: #27ae60;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const AddToCartBtn = styled.button`
  flex: 1;
  background: var(--pastel-blue);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #6fc6f0;
    box-shadow: 0 4px 12px rgba(135,206,235,0.3);
  }
`;

const BuyNowBtn = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.6rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(135deg, #ee5a6f, #ff6b6b);
    box-shadow: 0 4px 12px rgba(238, 90, 111, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.4rem 0.3rem;
  }
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist, addToCart, buyNow } = useShop();
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

  const handleBuyNow = (e) => {
    console.log('=== BUY NOW CLICKED ===');
    e.preventDefault();
    e.stopPropagation();

    if (buyNow) {
      console.log('Calling buyNow function');
      buyNow(product, navigate);
    } else {
      console.error('buyNow function not found in context!');
    }
  };

  const deliveryText = product.deliveryDays === 1
    ? 'Tomorrow'
    : product.deliveryDays === 2
      ? 'In 2 days'
      : `In ${product.deliveryDays} days`;

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container wrapped in Link */}
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ImageContainer>
          <img src={product.image} alt={product.name} />
          {product.discount && (
            <DiscountBadge>{product.discount}% OFF</DiscountBadge>
          )}
        </ImageContainer>
      </Link>

      {/* Heart button - OUTSIDE Link */}
      <HeartBtn onClick={toggleWishlist} isWishlisted={isWishlisted}>
        {isWishlisted ? <FaHeart color="var(--pastel-pink)" /> : <FaRegHeart color="#000" />}
      </HeartBtn>

      <Content>
        {/* Product info wrapped in Link */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title title={product.name}>{product.name}</Title>
          <Rating>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.floor(product.rating) ? "#ffc107" : "#eee"} />
              ))}
            </div>
            <span className="count">({product.reviewCount})</span>
          </Rating>
          <PriceSection>
            <PriceRow>
              <Price>${product.price}</Price>
              {product.originalPrice && (
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
              )}
            </PriceRow>
            {product.specialOffer && (
              <OfferText>🎉 {product.specialOffer}</OfferText>
            )}
            {product.lowestPriceOfYear && (
              <OfferText>⭐ Lowest Price of the Year!</OfferText>
            )}
          </PriceSection>
          <DeliveryInfo>
            Delivery: <span>{deliveryText}</span>
            {product.deliveryCharge === 0 && ' • FREE'}
          </DeliveryInfo>
        </Link>

        {/* CRITICAL: ButtonGroup OUTSIDE the Link above */}
        <ButtonGroup>
          <AddToCartBtn
            type="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </AddToCartBtn>
          <BuyNowBtn
            type="button"
            onClick={handleBuyNow}
          >
            Buy Now
          </BuyNowBtn>
        </ButtonGroup>
      </Content>
    </Card>
  );
};

export default ProductCard;
