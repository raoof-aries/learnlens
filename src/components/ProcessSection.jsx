import React from 'react';
import { 
  Flag,
  Building2,
  Video,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Award
} from 'lucide-react';
import './ProcessSection.css';

export const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Register',
      description: 'Enrol your school and nominate a teacher coordinator.',
    },
    {
      number: '02',
      title: 'Choose Topic',
      description: 'Pick a subject or theme your students want to reimagine.',
    },
    {
      number: '03',
      title: 'Write Script',
      description: 'Research, outline and write the video narrative.',
    },
    {
      number: '04',
      title: 'Create Video',
      description: 'Shoot, edit, and integrate AI & modern visual tools.',
    },
    {
      number: '05',
      title: 'Submit',
      description: 'Upload the final video project before the deadline.',
    },
    {
      number: '06',
      title: 'Win Awards',
      description: 'Get evaluated by industry experts and celebrated nationally.',
    },
  ];

  const highlights = [
    {
      title: 'National-Level Competition',
      subtitle: 'Compete with leading institutions nationwide',
      icon: Flag,
    },
    {
      title: 'Open to Schools Across India',
      subtitle: 'Pan-India participation for all recognized schools',
      icon: Building2,
    },
    {
      title: 'Maximum 3 Videos per School',
      subtitle: 'Submit up to 3 distinct video projects',
      icon: Video,
    },
    {
      title: 'Individual & Team Participation',
      subtitle: 'Collaborate as student-led teams or single creators',
      icon: Users,
    },
    {
      title: 'Maximum Duration 7 Minutes',
      subtitle: 'Engaging, concise educational video content',
      icon: Clock,
    },
    {
      title: 'AI Integrated Learning',
      subtitle: 'Leverage modern tools responsibly for script & visuals',
      icon: Sparkles,
    },
    {
      title: 'Industry Expert Evaluation',
      subtitle: 'Juried by domain leaders & academicians',
      icon: CheckCircle2,
    },
    {
      title: 'Certificate for Every School',
      subtitle: 'Official national recognition for all participants',
      icon: Award,
    },
  ];

  return (
    <section id="process" className="process-section">
      {/* Background Ambient Glows */}
      <div className="process-ambient-glow glow-center-left"></div>
      <div className="process-ambient-glow glow-top-right"></div>

      <div className="process-container">
        {/* UNIFIED HEADER */}
        <div className="process-header-block">
          <div className="process-badge-pill">
            <span className="badge-glow-dot"></span>
            <span className="badge-text">COMPETITION OVERVIEW</span>
          </div>

          <h2 className="process-main-title">
            Process & <span className="title-gold-glow">Highlights</span>
          </h2>

          <p className="process-summary-text">
            From school enrollment to national recognition—explore the 6-step journey and key competition features.
          </p>
        </div>

        {/* HORIZONTAL STEPPER TIMELINE */}
        <div className="stepper-timeline-container">
          <div className="stepper-track-line"></div>
          <div className="stepper-nodes-grid">
            {steps.map((step) => {
              return (
                <div key={step.number} className="stepper-node-item">
                  <div className="node-circle-badge">
                    <span className="circle-step-num">{step.number}</span>
                  </div>
                  <div className="node-content">
                    <h3 className="node-title">{step.title}</h3>
                    <p className="node-description">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KEY HIGHLIGHTS INTEGRATED GRID */}
        <div className="highlights-integrated-block">
          <div className="highlights-block-header">
            <span className="highlights-tag-label">KEY COMPETITION FEATURES</span>
          </div>

          <div className="highlights-compact-grid">
            {highlights.map((item, idx) => {
              const HighlightIcon = item.icon;
              return (
                <div key={idx} className="highlight-compact-card">
                  <div className="h-compact-icon">
                    <HighlightIcon size={18} />
                  </div>
                  <div className="h-compact-text">
                    <h5 className="h-compact-title">{item.title}</h5>
                    <p className="h-compact-sub">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
