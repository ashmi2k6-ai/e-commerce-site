import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaQuestionCircle, FaShippingFast, FaUndo, FaLock } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: var(--text-dark);
    margin-bottom: 1rem;
  }
`;

const SearchBar = styled.div`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #eee;
    border-radius: 30px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: var(--pastel-blue);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const HelpCard = styled.div`
  background: white;
  padding: 2rem;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  
  svg {
    font-size: 2.5rem;
    color: var(--pastel-pink);
    margin-bottom: 1rem;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const FAQSection = styled.div`
  h2 {
    margin-bottom: 1.5rem;
  }
  
  details {
    background: white;
    margin-bottom: 1rem;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    cursor: pointer;
    
    summary {
      font-weight: 600;
      outline: none;
    }
    
    p {
      margin-top: 1rem;
      color: #555;
      line-height: 1.5;
    }
  }
`;

const HelpCentre = () => {
    return (
        <Container>
            <Header>
                <h1>How can we help you?</h1>
                <SearchBar>
                    <FaSearch />
                    <input type="text" placeholder="Search for help..." />
                </SearchBar>
            </Header>

            <Grid>
                <HelpCard>
                    <FaQuestionCircle />
                    <h3>Getting Started</h3>
                    <p>Guide on how to create an account and start shopping.</p>
                </HelpCard>
                <HelpCard>
                    <FaShippingFast />
                    <h3>Shipping & Delivery</h3>
                    <p>Track your orders and understand our delivery timelines.</p>
                </HelpCard>
                <HelpCard>
                    <FaUndo />
                    <h3>Returns & Refunds</h3>
                    <p>Policy on returns, exchanges, and refund clearance.</p>
                </HelpCard>
                <HelpCard>
                    <FaLock />
                    <h3>Account Security</h3>
                    <p>Manage your password and security settings.</p>
                </HelpCard>
            </Grid>

            <FAQSection>
                <h2>Frequently Asked Questions</h2>
                <details>
                    <summary>How do I place an order?</summary>
                    <p>Simply browse our products, click 'Add to Cart' or 'Buy Now', and proceed to checkout. You can review your items in the cart before finalizing payment.</p>
                </details>
                <details>
                    <summary>How can I track my order?</summary>
                    <p>Go to 'My Orders' in the sidebar menu. You will see the status of all your active and past orders there.</p>
                </details>
                <details>
                    <summary>What payment methods do you accept?</summary>
                    <p>We accept all major credit/debit cards, UPI, and net banking options. All transactions are secure.</p>
                </details>
                <details>
                    <summary>How do I return an item?</summary>
                    <p>If you are not satisfied with your purchase, you can initiate a return from the 'My Orders' page within 7 days of delivery.</p>
                </details>
            </FAQSection>
        </Container>
    );
};

export default HelpCentre;
