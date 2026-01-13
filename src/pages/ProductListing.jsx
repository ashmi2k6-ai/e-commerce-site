import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import FilterModal from '../components/FilterModal';
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
  position: relative;
  cursor: pointer;
  
  &:hover {
    background: var(--pastel-blue);
    color: white;
  }
`;

const FilterBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--pastel-pink);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
`;

const Grid = styled.div`
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

const ResultsInfo = styled.div`
  margin-bottom: 1.5rem;
  color: #666;
  font-size: 0.95rem;
  
  strong {
    color: #333;
    font-weight: 600;
  }
`;

const ProductListing = () => {
  const { domain } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRanges: [],
    ratings: [],
    deliveryDays: []
  });

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

    // 3. Apply Price Filters
    if (filters.priceRanges.length > 0) {
      items = items.filter(p =>
        filters.priceRanges.some(range =>
          p.price >= range.min && p.price < range.max
        )
      );
    }

    // 4. Apply Rating Filters
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      items = items.filter(p => parseFloat(p.rating) >= minRating);
    }

    // 5. Apply Delivery Filters
    if (filters.deliveryDays.length > 0) {
      items = items.filter(p => {
        if (filters.deliveryDays.includes(1)) {
          if (p.deliveryDays === 1) return true;
        }
        if (filters.deliveryDays.includes(2)) {
          if (p.deliveryDays === 2) return true;
        }
        if (filters.deliveryDays.includes(7)) {
          if (p.deliveryDays >= 3 && p.deliveryDays <= 7) return true;
        }
        if (filters.deliveryDays.includes(100)) {
          if (p.deliveryDays > 7) return true;
        }
        return false;
      });
    }

    // Sorting Logic
    if (sortType === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortType === 'rating') {
      items = [...items].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    setFilteredProducts(items);
  }, [domain, query, sortType, filters]);

  const handleSort = () => {
    // Cycle through sort options
    if (sortType === 'relevant') setSortType('price-low');
    else if (sortType === 'price-low') setSortType('price-high');
    else if (sortType === 'price-high') setSortType('rating');
    else setSortType('relevant');
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const activeFilterCount =
    filters.priceRanges.length +
    filters.ratings.length +
    filters.deliveryDays.length;

  const getSortLabel = () => {
    switch (sortType) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'rating': return 'Rating: High to Low';
      default: return 'Relevant';
    }
  };

  return (
    <Container>
      <TopBar>
        <Controls>
          <Button onClick={handleSort}>
            <FaSort /> {getSortLabel()}
          </Button>
          <Button onClick={() => setIsFilterModalOpen(true)}>
            <FaFilter /> Filter
            {activeFilterCount > 0 && <FilterBadge>{activeFilterCount}</FilterBadge>}
          </Button>
        </Controls>
      </TopBar>

      <h2>
        {query ? `Search Results for "${query}"` : (domain ? domain.charAt(0).toUpperCase() + domain.slice(1).replace('-', ' ') : 'All Products')}
      </h2>

      <ResultsInfo>
        Showing <strong>{filteredProducts.length}</strong> products
        {activeFilterCount > 0 && ` with ${activeFilterCount} active filter${activeFilterCount > 1 ? 's' : ''}`}
      </ResultsInfo>

      <Grid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </Container>
  );
};

export default ProductListing;
