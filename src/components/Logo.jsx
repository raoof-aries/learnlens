import React from 'react';
import logoSvg from '../assets/logo.svg';
import './Logo.css';

export const Logo = ({ size = 'medium' }) => {
  return (
    <a href="#home" className={`brand-logo-container brand-logo-${size}`}>
      <img
        src={logoSvg}
        alt="Indywood Talent Club LearnLens Logo"
        className="brand-logo-svg"
      />
    </a>
  );
};

export default Logo;
