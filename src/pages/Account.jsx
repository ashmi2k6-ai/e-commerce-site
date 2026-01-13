import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  margin-top: +100px;
  padding: 3rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  svg {
    font-size: 5rem;
    color: var(--pastel-blue);
  }
`;

const InfoSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

  h3 {
    margin-bottom: 1.5rem;
    color: var(--text-dark);
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  div {
    font-size: 1.1rem;
    color: var(--text-dark);
    font-weight: 500;
  }
`;

const Account = () => {
  // Mock User Data
  const [user] = useState({
    username: "PastelLover2024",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    recoveryEmail: "recovery@example.com",
    recoveryPhone: "+1 (555) 987-6543",
    memberSince: "Dec 2024"
  });

  return (
    <Container>
      <ProfileHeader>
        <FaUserCircle />
        <div>
          <h1>{user.username}</h1>
          <p>Member since {user.memberSince}</p>
        </div>
      </ProfileHeader>

      <InfoSection>
        <h3>Personal Information</h3>

        <Field>
          <label>Username</label>
          <div>{user.username}</div>
        </Field>

        <Field>
          <label>Email ID</label>
          <div>{user.email}</div>
        </Field>

        <Field>
          <label>Phone Number</label>
          <div>{user.phone}</div>
        </Field>

        <Field>
          <label>Password</label>
          <div>••••••••••••</div>
        </Field>

        <h3 style={{ marginTop: '2rem' }}>Security Recovery</h3>

        <Field>
          <label>Recovery Email</label>
          <div>{user.recoveryEmail}</div>
        </Field>

        <Field>
          <label>Recovery Number</label>
          <div>{user.recoveryPhone}</div>
        </Field>
      </InfoSection>
    </Container>
  );
};

export default Account;
