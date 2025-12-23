import React from 'react';
import styled from 'styled-components';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { FaHistory, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--pastel-blue);
  padding-bottom: 1rem;

  h2 {
    color: var(--text-dark);
    margin: 0;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--pastel-blue);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  
  &:hover { text-decoration: underline; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #888;
  
  h3 { font-size: 1.5rem; margin-bottom: 1rem; }
  p { margin-bottom: 2rem; }
`;

const RecentlyViewed = () => {
    const { recentlyViewed } = useShop();

    return (
        <Container>
            <BackLink to="/"><FaArrowLeft /> Back to Shop</BackLink>
            <Header>
                <FaHistory size={24} color="var(--pastel-blue)" />
                <h2>Recently Viewed Products</h2>
            </Header>

            {recentlyViewed.length === 0 ? (
                <EmptyState>
                    <h3>You haven't viewed any products yet.</h3>
                    <p>Explore our pastel collections and they will appear here!</p>
                    <Link to="/" style={{ color: 'var(--pastel-blue)', fontWeight: 'bold' }}>Start Browsing</Link>
                </EmptyState>
            ) : (
                <Grid>
                    {recentlyViewed.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default RecentlyViewed;
