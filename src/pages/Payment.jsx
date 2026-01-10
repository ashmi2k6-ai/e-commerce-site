import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

import { useShop } from '../context/ShopContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const drawCheck = keyframes`
  to { stroke-dashoffset: 0; }
`;

const fillCircle = keyframes`
  from { fill: transparent; }
  to { fill: #4CAF50; }
`;

const fall = keyframes`
  from { top: -10%; opacity: 1; transform: rotate(0deg); }
  to { top: 100%; opacity: 0; transform: rotate(720deg); }
`;

const GlobalStyle = createGlobalStyle`
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: ${fall} 3s linear forwards;
    z-index: 10000;
  }
`;

const PaymentContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 50px;
  background: linear-gradient(135deg, #FFF5F7 0%, #E8F5FF 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 80px 15px 30px;
  }
`;

const PaymentBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 30px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const Title = styled.h2`
  color: var(--text-dark);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const OptionCard = styled.div`
  background: white;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  border: 2px solid ${props => props.selected ? 'var(--pastel-blue)' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.selected ? '0 5px 15px rgba(0,0,0,0.05)' : 'none'};

  &:hover {
    border-color: var(--pastel-blue);
    transform: translateY(-2px);
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Radio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--pastel-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background: var(--pastel-blue);
    border-radius: 50%;
    display: ${props => props.selected ? 'block' : 'none'};
  }
`;

const OptionName = styled.span`
  font-weight: 600;
  color: #444;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border: 2px solid var(--pastel-beige);
  border-radius: 12px;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.3s;

  &:focus {
    border-color: var(--pastel-blue);
  }
`;

const ProceedButton = styled.button`
  width: 100%;
  margin-top: 2.5rem;
  padding: 1rem;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background: ${props => props.disabled ? '#ccc' : 'linear-gradient(45deg, var(--pastel-blue), var(--pastel-pink))'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.02)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 10px 20px rgba(0,0,0,0.1)'};
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
`;

const SuccessContent = styled.div`
  background: linear-gradient(135deg, #FFF5F7 0%, #E8F5FF 100%);
  padding: 60px 80px;
  border-radius: 30px;
  text-align: center;
  animation: ${scaleIn} 0.5s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CheckmarkCircle = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
  
  svg {
    width: 100%;
    height: 100%;
  }

  .circle {
    fill: none;
    stroke: #4CAF50;
    stroke-width: 2;
    stroke-dasharray: 157;
    stroke-dashoffset: 157;
    animation: ${drawCheck} 0.6s ease forwards;
  }

  .filled-circle {
    fill: #4CAF50;
    animation: ${fillCircle} 0.4s ease 0.6s forwards;
  }

  .check {
    fill: none;
    stroke: white;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: ${drawCheck} 0.4s ease 0.8s forwards;
  }
`;

const SuccessMsg = styled.h2`
  color: var(--text-dark);
  margin-bottom: 0.5rem;
`;

const SuccessSubMsg = styled.p`
  color: #666;
`;

const paymentOptions = [
  { id: 'cod', name: 'Cash on Delivery (CoD)', requiresInput: false },
  { id: 'netbanking', name: 'Net Banking', requiresInput: true, placeholder: 'Enter Account Number' },
  { id: 'gpay', name: 'Google Pay (GPay)', requiresInput: true, placeholder: 'Enter UPI ID' },
  { id: 'upi', name: 'UPI', requiresInput: true, placeholder: 'Enter UPI ID' },
  { id: 'razorpay', name: 'Razorpay', requiresInput: true, placeholder: 'Enter Payment Details' },
  { id: 'credit', name: 'Credit Card', requiresInput: true, placeholder: 'Enter Card Number' },
  { id: 'debit', name: 'Debit Card', requiresInput: true, placeholder: 'Enter Card Number' },
  { id: 'giftcard', name: 'Gift Card', requiresInput: true, placeholder: 'Enter Gift Card Code' },
  { id: 'wallet', name: 'Wallet', requiresInput: true, placeholder: 'Enter Wallet Details' }
];

const Payment = () => {
  const navigate = useNavigate();
  let { checkoutProduct, setOrders } = useShop();

  // If checkoutProduct is null, try to get it from localStorage
  if (!checkoutProduct) {
    const stored = localStorage.getItem('checkoutProduct');
    if (stored) {
      checkoutProduct = JSON.parse(stored);
      console.log('Loaded checkout product from localStorage:', checkoutProduct);
    }
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentInput, setPaymentInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProceedActive, setIsProceedActive] = useState(false);

  useEffect(() => {
    console.log('Payment useEffect - checkoutProduct:', checkoutProduct);
    if (!checkoutProduct) {
      console.log('No checkout product found, redirecting to home');
      navigate('/');
    } else {
      console.log('Checkout product exists:', checkoutProduct.name);
    }
  }, [checkoutProduct, navigate]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setPaymentInput('');
    const option = paymentOptions.find(opt => opt.id === optionId);
    setIsProceedActive(!option.requiresInput);
  };

  const handleInputChange = (value) => {
    setPaymentInput(value);
    setIsProceedActive(value.trim().length > 0);
  };

  const createConfetti = () => {
    const colors = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFD8B3'];
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-10%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 8 + 4}px`;
      confetti.style.height = confetti.style.width;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  };

  const handleProceed = () => {
    setShowSuccess(true);
    createConfetti();

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'Confirmed',
      items: [checkoutProduct],
      total: checkoutProduct.price,
      paymentMethod: paymentOptions.find(o => o.id === selectedOption).name
    };

    setOrders(prev => [newOrder, ...prev]);

    // Clear checkout product from localStorage
    localStorage.removeItem('checkoutProduct');
    console.log('Checkout product cleared from localStorage');

    setTimeout(() => {
      navigate('/orders');
    }, 4000);
  };

  console.log('About to render payment page');
  if (!checkoutProduct) {
    console.log('Returning null because no checkout product');
    return null;
  }
  console.log('Rendering payment options for:', checkoutProduct.name);

  return (
    <PaymentContainer>
      <GlobalStyle />
      <PaymentBox>
        <Title>Payment Options</Title>
        {paymentOptions.map(option => (
          <div key={option.id}>
            <OptionCard
              selected={selectedOption === option.id}
              onClick={() => handleOptionSelect(option.id)}
            >
              <OptionHeader>
                <Radio selected={selectedOption === option.id} />
                <OptionName>{option.name}</OptionName>
              </OptionHeader>
              {selectedOption === option.id && option.requiresInput && (
                <InputField
                  type="text"
                  placeholder={option.placeholder}
                  value={paymentInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              )}
            </OptionCard>
          </div>
        ))}
        <ProceedButton
          type="button"
          disabled={!isProceedActive}
          onClick={handleProceed}
        >
          Proceed to Pay
        </ProceedButton>
      </PaymentBox>

      {showSuccess && (
        <SuccessOverlay>
          <SuccessContent>
            <CheckmarkCircle>
              <svg viewBox="0 0 52 52">
                <circle className="filled-circle" cx="26" cy="26" r="25" />
                <path className="check" d="M14 27l7 7 16-16" />
              </svg>
            </CheckmarkCircle>
            <SuccessMsg>Payment Successful!</SuccessMsg>
            <SuccessSubMsg>Your order has been placed</SuccessSubMsg>
          </SuccessContent>
        </SuccessOverlay>
      )}
    </PaymentContainer>
  );
};

export default Payment;
