import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  background-color: #f7f7f7;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
// height: 30%;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  left:0;
  bottom:0;
  right:0;

  @media (max-width: 768px) {
    position: relative; 
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;

  @media (max-width: 768px) {
    flex: none;
    width: 70%;
    margin: 2rem auto;
  }

  @media and (min-width: 769px) and (max-width: 990px) {
    flex: none;
    width: 70%;
    margin: 1.3rem auto;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #ffff;
  text-decoration: none;
  font-size: 1rem;
`;

const FooterComponent = () => {
  return (
    <footer>
      <Footer className='bg-dark text-white py-5 px-5 w-100'>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="#">Company</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Press Releases</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink href="#">Help & FAQ</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Returns & Refunds</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Shop</FooterTitle>
          <FooterLink href="#">All Products</FooterLink>
          <FooterLink href="#">Categories</FooterLink>
          <FooterLink href="#">Deals</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
        </FooterSection>
      </Footer>
    </footer>
  );
};

export default FooterComponent;
