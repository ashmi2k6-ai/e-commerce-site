import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 20px;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 25px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &:hover {
    color: var(--pastel-blue);
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: #666;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f9f9f9;
    color: #333;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: var(--pastel-blue);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
`;

const ApplyBtn = styled.button`
  flex: 1;
  background: var(--pastel-blue);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #6fc6f0;
    box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
  }
`;

const ClearBtn = styled.button`
  flex: 1;
  background: white;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 0.9rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: var(--pastel-pink);
    color: var(--pastel-pink);
  }
`;

const ActiveCount = styled.span`
  background: var(--pastel-pink);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const FilterModal = ({ isOpen, onClose, filters, onApplyFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        rating: true,
        delivery: true
    });

    const priceRanges = [
        { label: '$0 - $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 - $250', min: 200, max: 250 },
        { label: '$250 - $500', min: 250, max: 500 },
        { label: '$500+', min: 500, max: Infinity }
    ];

    const ratingOptions = [
        { label: '5 Stars', value: 5 },
        { label: '4.5+ Stars', value: 4.5 },
        { label: '4+ Stars', value: 4 },
        { label: '3.5+ Stars', value: 3.5 },
        { label: '3+ Stars', value: 3 },
        { label: '2+ Stars', value: 2 }
    ];

    const deliveryOptions = [
        { label: '1 Day Delivery', value: 1 },
        { label: '2 Days Delivery', value: 2 },
        { label: '3-7 Days Delivery', value: 7 },
        { label: '7+ Days Delivery', value: 100 }
    ];

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handlePriceChange = (range) => {
        const newPriceRanges = localFilters.priceRanges.some(
            r => r.min === range.min && r.max === range.max
        )
            ? localFilters.priceRanges.filter(r => !(r.min === range.min && r.max === range.max))
            : [...localFilters.priceRanges, range];

        setLocalFilters({ ...localFilters, priceRanges: newPriceRanges });
    };

    const handleRatingChange = (rating) => {
        const newRatings = localFilters.ratings.includes(rating)
            ? localFilters.ratings.filter(r => r !== rating)
            : [...localFilters.ratings, rating];

        setLocalFilters({ ...localFilters, ratings: newRatings });
    };

    const handleDeliveryChange = (days) => {
        const newDelivery = localFilters.deliveryDays.includes(days)
            ? localFilters.deliveryDays.filter(d => d !== days)
            : [...localFilters.deliveryDays, days];

        setLocalFilters({ ...localFilters, deliveryDays: newDelivery });
    };

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleClear = () => {
        const clearedFilters = {
            priceRanges: [],
            ratings: [],
            deliveryDays: []
        };
        setLocalFilters(clearedFilters);
        onApplyFilters(clearedFilters);
    };

    const activeFilterCount =
        localFilters.priceRanges.length +
        localFilters.ratings.length +
        localFilters.deliveryDays.length;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <Modal
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Header>
                        <Title>
                            Filters {activeFilterCount > 0 && <ActiveCount>{activeFilterCount}</ActiveCount>}
                        </Title>
                        <CloseBtn onClick={onClose}>
                            <FaTimes />
                        </CloseBtn>
                    </Header>

                    <FilterSection>
                        <SectionTitle onClick={() => toggleSection('price')}>
                            Price Range
                            <span>{expandedSections.price ? '−' : '+'}</span>
                        </SectionTitle>
                        {expandedSections.price && (
                            <FilterOptions>
                                {priceRanges.map((range, index) => (
                                    <CheckboxLabel key={index}>
                                        <input
                                            type="checkbox"
                                            checked={localFilters.priceRanges.some(
                                                r => r.min === range.min && r.max === range.max
                                            )}
                                            onChange={() => handlePriceChange(range)}
                                        />
                                        {range.label}
                                    </CheckboxLabel>
                                ))}
                            </FilterOptions>
                        )}
                    </FilterSection>

                    <FilterSection>
                        <SectionTitle onClick={() => toggleSection('rating')}>
                            Customer Ratings
                            <span>{expandedSections.rating ? '−' : '+'}</span>
                        </SectionTitle>
                        {expandedSections.rating && (
                            <FilterOptions>
                                {ratingOptions.map((option, index) => (
                                    <CheckboxLabel key={index}>
                                        <input
                                            type="checkbox"
                                            checked={localFilters.ratings.includes(option.value)}
                                            onChange={() => handleRatingChange(option.value)}
                                        />
                                        {option.label}
                                    </CheckboxLabel>
                                ))}
                            </FilterOptions>
                        )}
                    </FilterSection>

                    <FilterSection>
                        <SectionTitle onClick={() => toggleSection('delivery')}>
                            Delivery Duration
                            <span>{expandedSections.delivery ? '−' : '+'}</span>
                        </SectionTitle>
                        {expandedSections.delivery && (
                            <FilterOptions>
                                {deliveryOptions.map((option, index) => (
                                    <CheckboxLabel key={index}>
                                        <input
                                            type="checkbox"
                                            checked={localFilters.deliveryDays.includes(option.value)}
                                            onChange={() => handleDeliveryChange(option.value)}
                                        />
                                        {option.label}
                                    </CheckboxLabel>
                                ))}
                            </FilterOptions>
                        )}
                    </FilterSection>

                    <ButtonGroup>
                        <ClearBtn onClick={handleClear}>Clear All</ClearBtn>
                        <ApplyBtn onClick={handleApply}>Apply Filters</ApplyBtn>
                    </ButtonGroup>
                </Modal>
            </Overlay>
        </AnimatePresence>
    );
};

export default FilterModal;
