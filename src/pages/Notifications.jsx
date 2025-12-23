import React from 'react';
import styled from 'styled-components';
import { FaTag, FaGift, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--text-dark);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--pastel-pink);
  padding-bottom: 1rem;
`;

const NotificationCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  gap: 1.5rem;
  transition: transform 0.2s;
  cursor: pointer;
  border-left: 5px solid ${props => props.color || 'var(--pastel-blue)'};

  &:hover {
    transform: translateX(5px);
  }
`;

const IconWrapper = styled.div`
  background: ${props => props.bg || '#f0f0f0'};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: var(--text-dark);
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  .date {
    font-size: 0.8rem;
    color: #999;
    margin-top: 0.5rem;
    display: block;
  }
`;

const notifications = [
    {
        id: 1,
        title: "Big Sales Mela!",
        message: "Don't miss out on our biggest sales mela of the year. Up to 70% off on all clothing items.",
        date: "Dec 20 - Dec 30",
        icon: <FaTag />,
        color: "#FADADD",
        bg: "#FFF0F5"
    },
    {
        id: 2,
        title: "Christmas Offers 🎄",
        message: "Merry Christmas! Enjoy special discounts on gifts and accessories. Limited time offer.",
        date: "Dec 24 - Dec 26",
        icon: <FaGift />,
        color: "#90EE90",
        bg: "#F0FFF0"
    },
    {
        id: 3,
        title: "Year End Sale",
        message: "Clearance sale! Grab your favorites before they are gone. Everything must go!",
        date: "Dec 28 - Jan 01",
        icon: <FaStar />,
        color: "#87CEEB",
        bg: "#F0F8FF"
    },
    {
        id: 4,
        title: "Black Friday Rewind",
        message: "Missed Black Friday? We are bringing back some of the best deals for 24 hours only.",
        date: "Today Only",
        icon: <FaTag />,
        color: "#D8BFD8",
        bg: "#F8F0FF"
    },
    {
        id: 5,
        title: "New Year Bash",
        message: "Step into the new year with style. New collection launching soon with early bird offers.",
        date: "Jan 01 Onwards",
        icon: <FaGift />,
        color: "#F5DEB3",
        bg: "#FFFAF0"
    }
];

const Notifications = () => {
    return (
        <Container>
            <Title>Notifications</Title>
            {notifications.map(note => (
                <NotificationCard key={note.id} color={note.color}>
                    <IconWrapper bg={note.bg}>{note.icon}</IconWrapper>
                    <Content>
                        <h4>{note.title}</h4>
                        <p>{note.message}</p>
                        <span className="date">{note.date}</span>
                    </Content>
                </NotificationCard>
            ))}
        </Container>
    );
};

export default Notifications;
