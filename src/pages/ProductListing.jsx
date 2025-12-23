import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { FaArrowLeft, FaFilter, FaSort } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--pastel-blue);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--pastel-blue);
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    background: var(--pastel-blue);
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
`;

const ProductListing = () => {
  const { domain } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Extract query parameter ?q=...
  const query = new URLSearchParams(search).get('q')?.toLowerCase() || '';

  useEffect(() => {
    let items = products;

    // 1. Filter by Domain (if browsing a category)
    if (domain) {
      items = items.filter(p => p.domain === domain);
    }

    // 2. Filter by Search Query (if searching)
    if (query) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.domain.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    // Sorting Logic
    if (sortType === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(items);
  }, [domain, query, sortType]);

  const handleSort = () => {
    // Simple toggle for demo; a real app would have a dropdown
    if (sortType === 'relevant') setSortType('price-low');
    else if (sortType === 'price-low') setSortType('price-high');
    else setSortType('relevant');
  };

  return (
    <Container>
      <TopBar>
        <Controls>
          <Button onClick={handleSort}>
            <FaSort /> Sort: {sortType.replace('-', ' ')}
          </Button>
          <Button onClick={() => alert('Filter Modal would open here')}>
            <FaFilter /> Filter
          </Button>
        </Controls>
      </TopBar>

      <h2>
        {query ? `Search Results for "${query}"` : (domain ? domain.charAt(0).toUpperCase() + domain.slice(1).replace('-', ' ') : 'All Products')}
      </h2>

      <Grid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListing;
