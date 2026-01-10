import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaRegHeart, FaShoppingCart, FaTruck, FaStore, FaTag, FaTicketAlt } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

const DetailContainer = styled.div`
  max-width: 1400px;
  margin: 100px auto 40px;
  padding: 0 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 80px auto 20px;
    padding: 0 15px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  height: 600px;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  background: #f9f9f9;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  height: 100%;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--pastel-blue);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    overflow-y: visible;
    padding-right: 0;
  }
`;

const Category = styled.span`
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--pastel-blue);
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  .stars {
    display: flex;
    color: #ffc107;
    gap: 2px;
  }
  
  .reviews {
    color: #999;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const PriceSection = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1.5rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const OriginalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  color: #999;
  text-decoration: line-through;
`;

const DiscountBadge = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
`;

const SpecialTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #27ae60;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const InfoBox = styled.div`
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 0.9rem;
  
  .label {
    color: #666;
  }
  
  .value {
    color: #333;
    font-weight: 600;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PrimaryButton = styled(motion.button)`
  flex: 1;
  background: var(--pastel-blue);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(135,206,235,0.3);

  &:hover {
    background: #6fc6f0;
  }
`;

const BuyNowButton = styled(motion.button)`
  flex: 1;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(238, 90, 111, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ee5a6f, #ff6b6b);
  }
`;

const WishlistButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  border: 2px solid #eee;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.$isWishlisted ? 'var(--pastel-pink)' : '#333'};
  transition: all 0.3s;

  &:hover {
    border-color: var(--pastel-pink);
    color: var(--pastel-pink);
  }
`;

const ReviewsSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
`;

const ReviewCard = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 0.8rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px;
`;

const ReviewComment = styled.p`
  font-size: 0.85rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.3rem;
`;

const ReviewDate = styled.span`
  font-size: 0.75rem;
  color: #999;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist, addToRecentlyViewed, buyNow } = useShop();

  const product = products.find(p => p.id === parseInt(id));
  const isWishlisted = wishlist.some(item => item.id === product?.id);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <DetailContainer>
        <Title>Product not found</Title>
        <PrimaryButton onClick={() => navigate('/')}>Back to Home</PrimaryButton>
      </DetailContainer>
    );
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };


  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + product.deliveryDays);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <DetailContainer>

      <ContentGrid>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageSection>
            <img src={product.image} alt={product.name} />
          </ImageSection>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DetailsSection>
            <Category>{product.domain}</Category>
            <Title>{product.name}</Title>

            <RatingRow>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(parseFloat(product.rating)) ? "#ffc107" : "#eee"} />
                ))}
              </div>
              <span className="reviews">{product.rating} / 5 ({product.reviewCount} reviews)</span>
            </RatingRow>

            <PriceSection>
              <PriceRow>
                <Price>${product.price}</Price>
                {product.originalPrice && (
                  <>
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    <DiscountBadge>{product.discount}% OFF</DiscountBadge>
                  </>
                )}
              </PriceRow>
              {product.specialOffer && (
                <SpecialTag>
                  <FaTag /> {product.specialOffer}
                </SpecialTag>
              )}
              {product.lowestPriceOfYear && (
                <SpecialTag>
                  ⭐ Lowest Price of the Year!
                </SpecialTag>
              )}
              {product.couponAvailable && (
                <SpecialTag>
                  <FaTicketAlt /> Coupons Available - Apply at Checkout
                </SpecialTag>
              )}
            </PriceSection>

            <Description>{product.description}</Description>

            <InfoBox>
              <InfoTitle><FaTruck /> Delivery Details</InfoTitle>
              <InfoRow>
                <span className="label">Delivery By:</span>
                <span className="value">{formattedDeliveryDate}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Delivery Mode:</span>
                <span className="value">{product.deliveryMode}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Delivery Charge:</span>
                <span className="value">{product.deliveryCharge === 0 ? 'FREE' : `$${product.deliveryCharge}`}</span>
              </InfoRow>
            </InfoBox>

            <InfoBox>
              <InfoTitle><FaStore /> Product Information</InfoTitle>
              <InfoRow>
                <span className="label">Manufacturer:</span>
                <span className="value">{product.manufacturer}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Material/Info:</span>
                <span className="value">{product.materialInfo}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Seller:</span>
                <span className="value">{product.seller.name} ({product.seller.rating}★)</span>
              </InfoRow>
            </InfoBox>

            <ButtonGroup>
              <PrimaryButton
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
              >
                <FaShoppingCart /> Add to Cart
              </PrimaryButton>


              <WishlistButton
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleWishlist}
                $isWishlisted={isWishlisted}
              >
                {isWishlisted ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              </WishlistButton>

            </ButtonGroup>

            <ReviewsSection>
              <InfoTitle>Customer Reviews</InfoTitle>
              {product.reviews && product.reviews.slice(0, 5).map((review, index) => (
                <ReviewCard key={index}>
                  <ReviewHeader>
                    <ReviewerName>{review.userName}</ReviewerName>
                    <ReviewRating>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          color={i < Math.floor(parseFloat(review.rating)) ? "#ffc107" : "#eee"}
                        />
                      ))}
                    </ReviewRating>
                  </ReviewHeader>
                  <ReviewComment>{review.comment}</ReviewComment>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewCard>
              ))}
            </ReviewsSection>
          </DetailsSection>
        </motion.div>
      </ContentGrid>
    </DetailContainer>
  );
};

export default ProductDetail;
