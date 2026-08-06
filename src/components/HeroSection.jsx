import React from 'react';
import { Download, ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import bgImage from '../assets/BG.png';
import aiiLogo from '../assets/AII.png';
import aimriLogo from '../assets/AIMRI.png';
import guidelinesPdf from '../assets/Guidelines.pdf';
import './HeroSection.css';

export const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="hero-section-fullscreen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-viewport-container">
        {/* Main Content Area (Unblocked Artwork on Right) */}
        <div className="hero-main-content">
          <div className="hero-left-col">
            {/* Powered By Pill */}
            <div className="hero-badge-pill hero-powered-pill">
              <span className="badge-glow-dot"></span>
              <span className="badge-text powered-label">POWERED BY</span>
              <div className="powered-logos-group">
                <img src={aiiLogo} alt="AII Logo" className="powered-logo-img logo-aii" />
                <img src={aimriLogo} alt="AIMRI Logo" className="powered-logo-img logo-aimri" />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="hero-main-title">
              <span className="hero-brand-name title-gold-glow">LearnLens</span>
              <span className="hero-title-sub">Educational Video Making Competition</span>
            </h1>

            {/* Description Paragraph */}
            <p className="hero-summary-text">
              A national-level educational video making competition encouraging schools across India to create informative, engaging and future-ready educational videos by combining storytelling, creativity, Artificial Intelligence and modern production techniques.
            </p>

            {/* Action Buttons (Download Guidelines & Register Now) */}
            <div className="hero-action-row">
              <a href="#register" className="btn-gold hero-btn-main">
                <span>Register Now</span>
                <ArrowRight size={16} />
              </a>

              <a 
                href={guidelinesPdf} 
                download="LearnLens_Competition_Guidelines_2026.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline-gold hero-btn-sub"
              >
                <Download size={16} />
                <span>Download Guidelines</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pure Text-Based Bottom Showcase */}
        <div className="hero-bottom-text-showcase">
          {/* Left Block: Pure Text Prize Amount */}
          <div className="prize-and-meta-block">
            {/* Pure Text Prize */}
            <div className="pure-text-prize">
              <span className="prize-eyebrow-tag">GRAND PRIZE POOL</span>
              <span className="prize-amount-num gold-accent-text-gradient">₹1,00,000</span>
            </div>
          </div>

          {/* Right Block: Pure Text Countdown */}
          <div className="countdown-text-block">
            <div className="countdown-text-header">
              <span className="countdown-header-title">REGISTRATION CLOSING IN</span>
            </div>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
