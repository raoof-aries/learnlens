import React from 'react';
import { ArrowRight, Award, Video } from 'lucide-react';
import bg2Image from '../assets/BG 2.png';
import './PrizeSection.css';

export const PrizeSection = () => {
  return (
    <section 
      id="prizes" 
      className="prize-section-stacked"
      style={{ backgroundImage: `url("${bg2Image}")` }}
    >
      <div className="prize-container-stacked">
        {/* Top Centered Row: Grand Prize Showcase */}
        <div className="prize-top-showcase">
          <span className="prize-hero-label">GRAND PRIZE POOL</span>
          <h2 className="prize-hero-amount">₹ 1,00,000</h2>
          <p className="prize-hero-sub">
            Total cash prize pool for winning schools and student creators nationwide.
          </p>
          <div className="prize-cta-row">
            <a href="#register" className="btn-gold prize-btn-main">
              <span>Register Your School</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        {/* Bottom Row: 2 Benefit Cards Side-by-Side */}
        <div className="prize-bottom-cards-grid">
          {/* Benefit Card 1 */}
          <div className="prize-benefit-card">
            <div className="feature-icon-box">
              <Award size={26} className="feature-icon" />
            </div>
            <div className="feature-text-block">
              <h3 className="feature-item-title">Certificate of Participation for Every School</h3>
              <p className="feature-item-desc">
                Official national recognition certificates awarded to all participating institutions, teachers, and student creators.
              </p>
            </div>
          </div>

          {/* Benefit Card 2 */}
          <div className="prize-benefit-card">
            <div className="feature-icon-box">
              <Video size={26} className="feature-icon" />
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



