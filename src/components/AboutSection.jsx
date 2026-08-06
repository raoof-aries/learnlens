import React from 'react';
import { 
  Clapperboard, 
  GraduationCap, 
  Brain, 
  Rocket 
} from 'lucide-react';
import './AboutSection.css';

export const AboutSection = () => {
  const pillars = [
    {
      id: 'storytelling',
      title: 'Creative Storytelling',
      description: 'Turn a lesson into a story worth watching — structure, pacing, visuals and voice.',
      icon: Clapperboard,
    },
    {
      id: 'excellence',
      title: 'Educational Excellence',
      description: 'Accurate, curriculum-aligned content that genuinely teaches something new.',
      icon: GraduationCap,
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      description: 'Use AI responsibly for research, scripting, visuals and editing — and disclose it.',
      icon: Brain,
    },
    {
      id: 'skills',
      title: 'Future Skills',
      description: 'Production, collaboration, communication and digital literacy for the next decade.',
      icon: Rocket,
    },
  ];

  return (
    <section id="about" className="about-section">
      {/* Background Ambient Glows */}
      <div className="about-ambient-glow glow-top-center"></div>
      <div className="about-ambient-glow glow-bottom-right"></div>

      <div className="about-container">
        {/* Header Block */}
        <div className="about-header-block">
          <div className="about-badge-pill">
            <span className="badge-glow-dot"></span>
            <span className="badge-text">ABOUT</span>
          </div>

          <h2 className="about-main-title">
            Why <span className="title-gold-glow">LearnLens?</span>
          </h2>

          <p className="about-summary-text">
            LearnLens empowers students to communicate knowledge through engaging educational videos that 
            combine creativity, storytelling, technical excellence and future-ready learning.
          </p>
        </div>

        {/* 4 Pillars Showcase Grid */}
        <div className="about-cards-grid">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.id} className="pillar-card">
                <div className="pillar-card-header">
                  <div className="pillar-icon-wrapper">
                    <IconComponent className="pillar-icon" size={22} />
                  </div>
                </div>

                <div className="pillar-card-body">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-description">{pillar.description}</p>
                </div>

                <div className="pillar-hover-line"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
