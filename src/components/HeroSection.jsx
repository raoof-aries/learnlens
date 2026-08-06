import React from 'react';
import { Download, ArrowRight, Trophy } from 'lucide-react';
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
        {/* Main Content Area: Centered Layout */}
        <div className="hero-center-content-area">
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

          {/* Action Buttons */}
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

        {/* Seamless Bottom Showcase (Clean, Border-Top Divider without dark block) */}
        <div className="hero-bottom-showcase-clean">
          {/* Left: Grand Prize Pool */}
          <div className="clean-prize-block">
            <div className="prize-eyebrow-row">
              <Trophy size={16} className="prize-trophy-icon" />
              <span className="clean-eyebrow">GRAND PRIZE POOL</span>
            </div>
            <span className="clean-prize-amount">₹1,00,000</span>
          </div>

          {/* Right: Registration Countdown */}
          <div className="clean-countdown-block">
            <div className="countdown-eyebrow-row">
              <span className="dot-pulse-live"></span>
              <span className="clean-eyebrow">REGISTRATION CLOSING IN</span>
            </div>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;





