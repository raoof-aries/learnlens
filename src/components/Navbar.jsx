import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Trophy, 
  Home, 
  Info, 
  Award, 
  Layers, 
  UserPlus, 
  Download 
} from 'lucide-react';
import Logo from './Logo';
import guidelinesPdf from '../assets/Guidelines.pdf';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Prizes', href: '#prizes', icon: Award },
    { name: 'Process', href: '#process', icon: Layers },
    { name: 'Register', href: '#register', icon: UserPlus },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Action CTA */}
        <div className="navbar-cta-group">
          <a href="#register" className="btn-gold navbar-btn">
            <span>Register Now</span>
            <ArrowRight className="btn-icon" size={17} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="mobile-nav-content">
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <Logo />
              <button 
                className="mobile-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Body */}
            <nav className="mobile-nav-body">
              <ul className="mobile-nav-list">
                {navLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="mobile-link-icon-box">
                          <LinkIcon size={17} />
                        </div>
                        <span>{link.name}</span>
                        <ArrowRight size={14} className="mobile-link-arrow" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer Footer */}
            <div className="mobile-drawer-footer">
              <div className="prize-badge-mini">
                <Trophy size={16} className="prize-icon" />
                <span>₹ 1,00,000 Grand Prize Pool</span>
              </div>
              <div className="mobile-drawer-actions">
                <a
                  href="#register"
                  className="btn-gold mobile-cta-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href={guidelinesPdf}
                  download="LearnLens_Competition_Guidelines_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold mobile-guidelines-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download size={16} />
                  <span>Download Guidelines</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
