import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  RefreshCw,
  Download,
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import guidelinesPdf from '../assets/Guidelines.pdf';
import getDynamicBasename from '../utils/basename';
import './RegisterSection.css';

export const RegisterSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: '',
    board: 'CBSE',
    cityState: '',
    schoolEmail: '',
    schoolPhone: '',
    coordinatorName: '',
    designation: 'Teacher Coordinator',
    coordinatorEmail: '',
    coordinatorPhone: '',
    submissionCount: '1 Video',
    isAuthorized: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [serverSuccessMsg, setServerSuccessMsg] = useState('');
  const [registrationRef, setRegistrationRef] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: null }));
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDownloadGuidelines = () => {
    const element = document.createElement("a");
    element.href = guidelinesPdf;
    element.download = "LearnLens_Competition_Guidelines_2026.pdf";
    element.target = "_blank";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!formData.cityState.trim()) newErrors.cityState = 'City & State is required';
    if (!formData.schoolEmail.trim()) {
      newErrors.schoolEmail = 'Official email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
      newErrors.schoolEmail = 'Enter a valid email address';
    }
    if (!formData.schoolPhone.trim()) {
      newErrors.schoolPhone = 'Contact number is required';
    } else if (formData.schoolPhone.trim().replace(/\D/g, '').length < 7) {
      newErrors.schoolPhone = 'Enter a valid contact number (at least 7 digits)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.coordinatorName.trim()) newErrors.coordinatorName = 'Coordinator name is required';
    if (!formData.coordinatorEmail.trim()) {
      newErrors.coordinatorEmail = 'Coordinator email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.coordinatorEmail)) {
      newErrors.coordinatorEmail = 'Enter a valid email address';
    }
    if (!formData.coordinatorPhone.trim()) {
      newErrors.coordinatorPhone = 'WhatsApp / Mobile number is required';
    } else if (formData.coordinatorPhone.trim().replace(/\D/g, '').length < 7) {
      newErrors.coordinatorPhone = 'Enter a valid mobile number (at least 7 digits)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.isAuthorized) {
      newErrors.isAuthorized = 'You must declare authorized representation';
    }
    if (!captchaToken) {
      newErrors.captcha = 'Please complete the reCAPTCHA verification';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const base = getDynamicBasename();
      const endpoint = base.endsWith('/') 
        ? `${base}learnlens-reg-action.php` 
        : `${base}/learnlens-reg-action.php`;

      const postData = new FormData();
      postData.append('schoolName', formData.schoolName);
      postData.append('school_name', formData.schoolName);
      postData.append('board', formData.board);
      postData.append('cityState', formData.cityState);
      postData.append('city_state', formData.cityState);
      postData.append('schoolEmail', formData.schoolEmail);
      postData.append('school_email', formData.schoolEmail);
      postData.append('email', formData.schoolEmail);
      postData.append('schoolPhone', formData.schoolPhone);
      postData.append('school_phone', formData.schoolPhone);
      postData.append('coordinatorName', formData.coordinatorName);
      postData.append('coordinator_name', formData.coordinatorName);
      postData.append('designation', formData.designation);
      postData.append('coordinatorEmail', formData.coordinatorEmail);
      postData.append('coordinator_email', formData.coordinatorEmail);
      postData.append('coordinatorPhone', formData.coordinatorPhone);
      postData.append('coordinator_phone', formData.coordinatorPhone);
      postData.append('submissionCount', formData.submissionCount);
      postData.append('submission_count', formData.submissionCount);
      if (captchaToken) {
        postData.append('g-recaptcha-response', captchaToken);
        postData.append('recaptchaToken', captchaToken);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: postData,
      });

      const responseText = await response.text();
      let resData;
      try {
        resData = JSON.parse(responseText);
      } catch (parseErr) {
        console.error('Invalid JSON response from server:', responseText);
        throw new Error('Server returned an unexpected format.');
      }

      if (resData.status == '1' || resData.status === 1) {
        const refCode = resData.refCode || resData.registrationRef || `REG-2026-IND-${Math.floor(100000 + Math.random() * 900000)}`;
        setRegistrationRef(refCode);
        setServerSuccessMsg(resData.message || 'Registration submitted successfully');
        setIsSubmitted(true);
      } else {
        const errorMsg = resData.message || 'Mail sending failed. Please enter correct Email ID';
        setSubmitError(errorMsg);
      }
    } catch (err) {
      console.error('Registration submit error:', err);
      setSubmitError(err.message === 'Server returned an unexpected format.'
        ? 'Server error occurred during processing. Please try again later.'
        : 'Failed to submit registration. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      schoolName: '',
      board: 'CBSE',
      cityState: '',
      schoolEmail: '',
      schoolPhone: '',
      coordinatorName: '',
      designation: 'Teacher Coordinator',
      coordinatorEmail: '',
      coordinatorPhone: '',
      submissionCount: '1 Video',
      isAuthorized: false
    });
    setCaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setErrors({});
    setSubmitError('');
    setServerSuccessMsg('');
    setStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <section id="register" className="register-section">
      {/* Background Ambient Glows */}
      <div className="register-ambient-glow glow-top-left"></div>
      <div className="register-ambient-glow glow-bottom-right"></div>

      <div className="register-container">
        {/* 2-COLUMN GRID: LEFT HEADER & DESCRIPTION, RIGHT FORM CARD */}
        <div className="register-grid-layout">
          {/* LEFT SIDE: TITLE & DESCRIPTION */}
          <div className="register-left-header">
            <div className="register-badge-pill">
              <span className="badge-glow-dot"></span>
              <span className="badge-text">OFFICIAL ENROLLMENT 2026</span>
            </div>

            <h2 className="register-main-title">
              Register Your <span className="title-gold-glow">School</span>
            </h2>

            <p className="register-summary-text">
              Enroll your institution for the National LearnLens Educational Video Making Competition.
              Free registration for all recognized schools.
            </p>
          </div>

          {/* RIGHT SIDE: INTERACTIVE FORM CARD */}
          <div className="register-form-card glass-panel">
            {!isSubmitted ? (
              <>
                {/* STEP TRACKER HEADER */}
                <div className="form-steps-tracker">
                  <div className={`step-pill ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                    <span className="step-num">{step > 1 ? <Check size={14} /> : '1'}</span>
                    <span className="step-label">School Details</span>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step-pill ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                    <span className="step-num">{step > 2 ? <Check size={14} /> : '2'}</span>
                    <span className="step-label">Coordinator</span>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step-pill ${step === 3 ? 'active' : ''}`}>
                    <span className="step-num">3</span>
                    <span className="step-label">Submissions</span>
                  </div>
                </div>

                {/* STEP 1: SCHOOL DETAILS */}
                {step === 1 && (
                  <div className="form-step-content animate-fade-in">
                    <div className="step-title-group">
                      <h3>School Information</h3>
                      <p>Enter official school details for national registration records.</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="schoolName">School Name *</label>
                      <div className="input-wrapper">
                        <Building2 size={18} className="input-icon" />
                        <input
                          type="text"
                          id="schoolName"
                          name="schoolName"
                          placeholder="e.g. St. Xavier's International School"
                          value={formData.schoolName}
                          onChange={handleInputChange}
                          className={errors.schoolName ? 'input-error' : ''}
                        />
                      </div>
                      {errors.schoolName && <span className="error-text">{errors.schoolName}</span>}
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="board">Affiliation Board *</label>
                        <div className="input-wrapper">
                          <GraduationCap size={18} className="input-icon" />
                          <select
                            id="board"
                            name="board"
                            value={formData.board}
                            onChange={handleInputChange}
                          >
                            <option value="CBSE">CBSE Board</option>
                            <option value="ICSE">ICSE / ISC Board</option>
                            <option value="State Board">State Secondary Board</option>
                            <option value="IB / Cambridge">IB / Cambridge International</option>
                            <option value="Other">Other Recognized Board</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cityState">City & State *</label>
                        <div className="input-wrapper">
                          <MapPin size={18} className="input-icon" />
                          <input
                            type="text"
                            id="cityState"
                            name="cityState"
                            placeholder="e.g. Bengaluru, Karnataka"
                            value={formData.cityState}
                            onChange={handleInputChange}
                            className={errors.cityState ? 'input-error' : ''}
                          />
                        </div>
                        {errors.cityState && <span className="error-text">{errors.cityState}</span>}
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="schoolEmail">Official School Email *</label>
                        <div className="input-wrapper">
                          <Mail size={18} className="input-icon" />
                          <input
                            type="email"
                            id="schoolEmail"
                            name="schoolEmail"
                            placeholder="e.g. info@stxaviers.edu.in"
                            value={formData.schoolEmail}
                            onChange={handleInputChange}
                            className={errors.schoolEmail ? 'input-error' : ''}
                          />
                        </div>
                        {errors.schoolEmail && <span className="error-text">{errors.schoolEmail}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="schoolPhone">School Contact Phone *</label>
                        <div className="input-wrapper">
                          <Phone size={18} className="input-icon" />
                          <input
                            type="tel"
                            id="schoolPhone"
                            name="schoolPhone"
                            placeholder="e.g. +91 080-23456789"
                            value={formData.schoolPhone}
                            onChange={handleInputChange}
                            className={errors.schoolPhone ? 'input-error' : ''}
                          />
                        </div>
                        {errors.schoolPhone && <span className="error-text">{errors.schoolPhone}</span>}
                      </div>
                    </div>

                    <div className="form-actions right-align">
                      <button type="button" className="btn-gold" onClick={handleNext}>
                        <span>Continue to Coordinator</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: TEACHER COORDINATOR DETAILS */}
                {step === 2 && (
                  <div className="form-step-content animate-fade-in">
                    <div className="step-title-group">
                      <h3>Teacher Coordinator Details</h3>
                      <p>Assign the primary educator responsible for student team communication.</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="coordinatorName">Coordinator Full Name *</label>
                      <div className="input-wrapper">
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="coordinatorName"
                          name="coordinatorName"
                          placeholder="e.g. Dr. Ananya Sharma"
                          value={formData.coordinatorName}
                          onChange={handleInputChange}
                          className={errors.coordinatorName ? 'input-error' : ''}
                        />
                      </div>
                      {errors.coordinatorName && <span className="error-text">{errors.coordinatorName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="designation">Designation / Role *</label>
                      <div className="input-wrapper">
                        <GraduationCap size={18} className="input-icon" />
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          placeholder="e.g. Senior Educator / HOD Innovation"
                          value={formData.designation}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div className="form-group">
                        <label htmlFor="coordinatorEmail">Coordinator Email *</label>
                        <div className="input-wrapper">
                          <Mail size={18} className="input-icon" />
                          <input
                            type="email"
                            id="coordinatorEmail"
                            name="coordinatorEmail"
                            placeholder="e.g. ananya.sharma@school.edu.in"
                            value={formData.coordinatorEmail}
                            onChange={handleInputChange}
                            className={errors.coordinatorEmail ? 'input-error' : ''}
                          />
                        </div>
                        {errors.coordinatorEmail && <span className="error-text">{errors.coordinatorEmail}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="coordinatorPhone">WhatsApp / Mobile Number *</label>
                        <div className="input-wrapper">
                          <Phone size={18} className="input-icon" />
                          <input
                            type="tel"
                            id="coordinatorPhone"
                            name="coordinatorPhone"
                            placeholder="e.g. +91 98765 43210"
                            value={formData.coordinatorPhone}
                            onChange={handleInputChange}
                            className={errors.coordinatorPhone ? 'input-error' : ''}
                          />
                        </div>
                        {errors.coordinatorPhone && <span className="error-text">{errors.coordinatorPhone}</span>}
                      </div>
                    </div>

                    <div className="form-actions space-between">
                      <button type="button" className="btn-outline-gold" onClick={handleBack}>
                        <ArrowLeft size={17} />
                        <span>Back</span>
                      </button>
                      <button type="button" className="btn-gold" onClick={handleNext}>
                        <span>Continue to Submissions</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: SUBMISSIONS & CONFIRMATION */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="form-step-content animate-fade-in">
                    <div className="step-title-group">
                      <h3>Submission Preferences & Declaration</h3>
                      <p>Select your intended participation scope and complete registration.</p>
                    </div>

                    <div className="form-group">
                      <label>Estimated Number of Video Submissions *</label>
                      <div className="radio-cards-grid">
                        {['1 Video', '2-3 Videos (Max)'].map((option) => (
                          <label
                            key={option}
                            className={`radio-card ${formData.submissionCount === option ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="submissionCount"
                              value={option}
                              checked={formData.submissionCount === option}
                              onChange={handleInputChange}
                            />
                            <span className="radio-title">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="guidelines-download-card">
                      <div className="guidelines-card-content">
                        <FileText size={20} className="guidelines-card-icon" />
                        <div className="guidelines-card-text">
                          <span className="guidelines-card-title">Competition Guidelines 2026</span>
                          <span className="guidelines-card-desc">Review full submission criteria, rules, and timelines before submitting.</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="btn-outline-gold btn-download-guidelines"
                        onClick={handleDownloadGuidelines}
                      >
                        <Download size={16} />
                        <span>Download Guidelines</span>
                      </button>
                    </div>

                    <div className="declaration-card">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="isAuthorized"
                          checked={formData.isAuthorized}
                          onChange={handleInputChange}
                        />
                        <span className="checkbox-text">
                          I confirm that I am an authorized representative of <strong>{formData.schoolName || 'the school'}</strong> and agree to receive competition updates and coordinator toolkits.
                        </span>
                      </label>
                      {errors.isAuthorized && <span className="error-text block-error">{errors.isAuthorized}</span>}
                    </div>

                    <div className="recaptcha-container">
                      <label className="recaptcha-label">Security Verification *</label>
                      <div className="recaptcha-wrapper">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6LeChP0mAAAAAINyJjJ-oRRsOzsNKgVizZyCtv8z"
                          onChange={handleCaptchaChange}
                          onExpired={handleCaptchaExpired}
                          theme="dark"
                        />
                      </div>
                      {errors.captcha && <span className="error-text block-error">{errors.captcha}</span>}
                    </div>

                    {submitError && (
                      <div className="server-error-banner">
                        <AlertCircle size={20} className="server-error-icon" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="form-actions space-between">
                      <button type="button" className="btn-outline-gold" onClick={handleBack} disabled={isSubmitting}>
                        <ArrowLeft size={17} />
                        <span>Back</span>
                      </button>
                      <button type="submit" className="btn-gold" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span>Submitting...</span>
                            <Loader2 size={18} className="btn-spinner" />
                          </>
                        ) : (
                          <>
                            <span>Submit Registration</span>
                            <CheckCircle2 size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* SUCCESS STATE VIEW */
              <div className="registration-success-card animate-fade-in">
                <div className="success-badge-wrap">
                  <CheckCircle2 size={54} className="success-check-icon" />
                </div>

                <h3 className="success-title">School Registration Completed!</h3>
                {serverSuccessMsg && (
                  <div className="server-success-pill">
                    <CheckCircle2 size={16} />
                    <span>{serverSuccessMsg}</span>
                  </div>
                )}
                <p className="success-subtitle">
                  Congratulations! <strong>{formData.schoolName}</strong> has been officially enrolled in the National Competition 2026.
                </p>

                <div className="ref-code-box">
                  <span className="ref-label">REGISTRATION REFERENCE CODE</span>
                  <div className="ref-code-display">
                    <code>{registrationRef}</code>
                  </div>
                  <span className="ref-note">Please save this reference code for team submission tracking.</span>
                </div>

                <div className="summary-details-box">
                  <div className="summary-row">
                    <span className="s-label">School:</span>
                    <span className="s-val">{formData.schoolName} ({formData.board})</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-label">Coordinator:</span>
                    <span className="s-val">{formData.coordinatorName} ({formData.coordinatorPhone})</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-label">Email:</span>
                    <span className="s-val">{formData.coordinatorEmail}</span>
                  </div>
                  <div className="summary-row">
                    <span className="s-label">Submissions:</span>
                    <span className="s-val">{formData.submissionCount}</span>
                  </div>
                </div>

                <div className="success-actions">
                  <button type="button" className="btn-outline-gold" onClick={handleReset}>
                    <RefreshCw size={16} />
                    <span>Register Another School</span>
                  </button>
                  <a href="#process" className="btn-gold">
                    <span>Review Competition Process</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
