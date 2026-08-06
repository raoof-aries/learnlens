import React from 'react';
import { ArrowRight, Award, Video } from 'lucide-react';
import bg2Image from '../assets/BG 2.png';
import './PrizeSection.css';

export const PrizeSection = () => {
  return (
    <section 
      id="prizes" 
      className="prize-section-2col"
      style={{ backgroundImage: `url("${bg2Image}")` }}
    >
      {/* Background Ambient Glow */}
      <div className="prize-glow-bg"></div>

      <div className="prize-container-2col">
        {/* Left Column: Grand Prize Showcase */}
        <div className="prize-col-left">
          <div className="prize-hero-content">
            <span className="prize-hero-label">GRAND PRIZE POOL</span>
            <h2 className="prize-hero-amount title-gold-glow">₹1,00,000</h2>
            <p className="prize-hero-sub">
              Total cash prize pool for winning schools and student creators nationwide.
            </p>
            <div className="prize-cta-row">
              <a href="#register" className="btn-gold">
                <span>Register Your School</span>
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Recognition Highlights */}
        <div className="prize-col-right">
          {/* Benefit 1 */}
          <div className="prize-feature-block">
            <div className="feature-icon-box">
              <Award size={28} className="feature-icon" />
            </div>
            <div className="feature-text-block">
              <h3 className="feature-item-title">Certificate of Participation for Every School</h3>
              <p className="feature-item-desc">
                Official national recognition certificates awarded to all participating institutions, teachers, and student creators.
              </p>
            </div>
          </div>

          {/* Divider Line */}
          <div className="right-items-divider">
            <span className="divider-glow-dot"></span>
          </div>

          {/* Benefit 2 */}
          <div className="prize-feature-block">
            <div className="feature-icon-box">
              <Video size={28} className="feature-icon" />
            </div>
            <div className="feature-text-block">
              <h3 className="feature-item-title">Winning Videos Featured in LearnLens Showcase</h3>
              <p className="feature-item-desc">
                Top-rated video projects will be showcased in the official LearnLens Digital Showcase for nationwide access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizeSection;

