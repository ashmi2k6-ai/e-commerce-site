import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaUser, FaHeart, FaShoppingBag, FaBoxOpen, FaTicketAlt, FaQuestionCircle, FaBell, FaHistory } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: var(--white);
  z-index: 1000;
  padding: 2rem;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--pastel-blue);
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-dark);
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 1rem;
  color: var(--text-dark);
  transition: color 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    color: var(--pastel-pink);
  }

  svg {
    color: var(--pastel-blue);
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SidebarContainer
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Header>
              Menu
              <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>
            </Header>

            <NavItem to="/account" onClick={onClose}><FaUser /> My Account</NavItem>
            <NavItem to="/wishlist" onClick={onClose}><FaHeart /> My Wishlist</NavItem>
            <NavItem to="/orders" onClick={onClose}><FaBoxOpen /> My Orders</NavItem>
            <NavItem to="/cart" onClick={onClose}><FaShoppingBag /> My Cart</NavItem>
            <NavItem to="/coupons" onClick={onClose}><FaTicketAlt /> Coupons Zone</NavItem>
            <NavItem to="/notifications" onClick={onClose}><FaBell /> Notifications</NavItem>
            <NavItem to="/help" onClick={onClose}><FaQuestionCircle /> Help Centre</NavItem>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
