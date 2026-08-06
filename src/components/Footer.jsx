import React from 'react';
import Logo from './Logo';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-simple">
      <div className="footer-simple-container">
        <div className="footer-logo-wrap">
          <Logo />
        </div>
        <div className="footer-copyright">
          © {currentYear} Aries e-Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
