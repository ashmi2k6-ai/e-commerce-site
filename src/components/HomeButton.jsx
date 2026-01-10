import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

const FloatingHomeBtn = styled(motion.div)`
  position: fixed;
  top: 95px; /* Clearly below the cart button */
  right: 25px; 
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: var(--pastel-pink);
  color: white;
  border: 3px solid white;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 9999;
  font-size: 1.5rem;

  &:hover {
    background: #f8b9c4;
  }
`;

const HomeButton = () => {
    const handleNavigation = () => {
        console.log('Home button clicked - navigating to /');
        window.location.href = '/';
    };

    return (
        <FloatingHomeBtn
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNavigation}
            title="Return to Home Page"
        >
            <FaHome />
        </FloatingHomeBtn>
    );
};

export default HomeButton;
