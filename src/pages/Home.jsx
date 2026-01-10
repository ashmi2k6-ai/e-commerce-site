import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 2rem 5rem;

  @media (max-width: 768px) {
    padding: 120px 1rem 3rem;
  }
`;

const SalesSlider = styled.div`
  height: 250px;
  margin: 1rem 0;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, var(--pastel-pink), var(--pastel-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;

  h2 { font-size: 3rem; margin-bottom: 1rem; text-shadow: 2px 2px 10px rgba(0,0,0,0.1); }
  p { font-size: 1.5rem; opacity: 0.9; }
`;

const SliderNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(5px);
  transition: background 0.3s;
  &:hover { background: rgba(255, 255, 255, 0.5); }
  ${props => props.left ? 'left: 20px;' : 'right: 20px;'}
`;

const Section = styled.div`
  padding: 3rem 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 2rem;
    color: var(--text-dark);
    position: relative;
    padding-bottom: 0.5rem;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--pastel-blue);
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const ViewMoreBtn = styled(Link)`
  background: white;
  border: 2px solid var(--pastel-blue);
  color: var(--pastel-blue);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  &:hover {
    background: var(--pastel-blue);
    color: white;
    transform: scale(1.05);
  }
`;

const CircleImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.color || '#eee'};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const CategoryCard = styled(Link)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }

  h3 {
    margin-top: 1rem;
    color: var(--text-dark);
    font-size: 1.2rem;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
`;

const sales = [
  { title: "Summer Blossom Sale", text: "Up to 50% Off on Beauty & Skincare" },
  { title: "Pastel Dreams Collection", text: "New Arrivals in Clothing & Accessories" },
  { title: "Pet Paradise Deals", text: "Free Delivery on All Pet Care Orders" },
  { title: "Stay Minimal Essentials", text: "Quality Home Furnishings at Great Prices" }
];

const highlightCategories = [
  { id: 'clothing', label: 'Clothing' },
  { id: 'footwear', label: 'Footwear' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'electronics', label: 'Electronics' }
];

const mainCategories = [
  { name: 'Clothing', path: '/products/clothing', color: '#FADADD', icon: '👗' },
  { name: 'Accessories', path: '/products/accessories', color: '#87CEEB', icon: '💍' },
  { name: 'Footwear', path: '/products/footwear', color: '#90EE90', icon: '👠' },
  { name: 'Essentials', path: '/products/essentials', color: '#F5F5DC', icon: '🧴' },
  { name: 'Beauty', path: '/products/beauty', color: '#FFB7B2', icon: '💄' },
  { name: 'Haircare', path: '/products/haircare', color: '#E2F0CB', icon: '💇‍♀️' },
  { name: 'Electronics', path: '/products/electronics', color: '#D8BFD8', icon: '🎧' },
  { name: 'Furniture and Home', path: '/products/furniture-and-home', color: '#F5DEB3', icon: '🛋️' },
  { name: 'Pet Care', path: '/products/pet-care', color: '#98FB98', icon: '🐾' },
  { name: 'Mobiles', path: '/products/mobiles', color: '#E0FFFF', icon: '📱' },
];

const Home = () => {
  const { recentlyViewed } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sales.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Generate recommended products based on recently viewed
  useEffect(() => {
    if (recentlyViewed.length > 0) {
      // Get categories from recently viewed products
      const viewedCategories = [...new Set(recentlyViewed.map(p => p.category || p.domain))];
      const viewedIds = recentlyViewed.map(p => p.id);

      // Find products from same categories that user hasn't viewed
      const recommended = products.filter(product => {
        // Exclude already viewed products
        if (viewedIds.includes(product.id)) return false;

        // Include if same category as viewed products
        return viewedCategories.includes(product.category || product.domain);
      });

      // Shuffle and limit to 8 products
      const shuffled = recommended.sort(() => 0.5 - Math.random()).slice(0, 8);
      setRecommendedProducts(shuffled);
    }
  }, [recentlyViewed]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sales.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sales.length) % sales.length);

  return (
    <HomeContainer>
      <SalesSlider>
        <SliderNav left onClick={prevSlide}><FaChevronLeft /></SliderNav>
        <AnimatePresence mode="wait">
          <Slide
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {sales[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {sales[currentSlide].text}
            </motion.p>
          </Slide>
        </AnimatePresence>
        <SliderNav onClick={nextSlide}><FaChevronRight /></SliderNav>
      </SalesSlider>

      {/* Recently Viewed Section - Only show if user has viewed products */}
      {recentlyViewed.length > 0 && (
        <Section>
          <SectionHeader>
            <h2>Recently Viewed</h2>
            {recentlyViewed.length > 8 && (
              <ViewMoreBtn to="/recently-viewed">View All</ViewMoreBtn>
            )}
          </SectionHeader>
          <ProductGrid>
            {recentlyViewed.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </Section>
      )}

      {/* Recommended Section - Only show if user has viewed products */}
      {recentlyViewed.length > 0 && recommendedProducts.length > 0 && (
        <Section>
          <SectionHeader>
            <h2>Recommended for You</h2>
          </SectionHeader>
          <ProductGrid>
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </Section>
      )}

      {highlightCategories.map(cat => {
        const categoryProducts = products.filter(p => p.category === cat.id).slice(0, 4);
        return (
          <Section key={cat.id}>
            <SectionHeader>
              <h2>Best in {cat.label}</h2>
              <ViewMoreBtn to={`/products/${cat.id}`}>View More</ViewMoreBtn>
            </SectionHeader>
            <ProductGrid>
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Section>
        );
      })}

      <Section>
        <SectionHeader>
          <h2>Explore Categories</h2>
        </SectionHeader>
        <CategoryGrid>
          {mainCategories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <CategoryCard to={cat.path}>
                <CircleImage color={cat.color}>{cat.icon}</CircleImage>
                <h3>{cat.name}</h3>
              </CategoryCard>
            </motion.div>
          ))}
        </CategoryGrid>
      </Section>
    </HomeContainer>
  );
};

export default Home;
