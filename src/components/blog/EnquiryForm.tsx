import React, { useState } from 'react';
import './BlogComponents.css';
import { ENV } from '@/config/env';

interface EnquiryFormProps {
  blogId: string;
  blogTitle: string;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ blogId, blogTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // FormSubmit endpoint
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/support@dsecuretech.com";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const now = new Date();
      const timestampLocal = now.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
      const timestampISO = now.toISOString();

      // Prepare FormSubmit data
      const formSubmitData = new FormData();
      formSubmitData.append("_webhook", "https://api.dsecuretech.com/api/formsubmit/webhook");
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");
      formSubmitData.append("_replyto", formData.email.trim());
      formSubmitData.append("_subject", `Blog Enquiry: ${blogTitle} - D-Secure Tech`);
      formSubmitData.append("_cc", "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com");
      
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("phone", formData.phone?.trim() || "");
      formSubmitData.append("message", formData.message.trim());
      formSubmitData.append("blogId", blogId);
      formSubmitData.append("blogTitle", blogTitle);
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", "Blog Enquiry Form");

      // Submit to backend API
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || "",
        message: formData.message.trim(),
        blogId: blogId,
        blogTitle: blogTitle,
        source: "Blog Enquiry Form",
        timestamp: timestampISO,
      };

      // Submit to backend
      const API_BASE = ENV.API_BASE_URL;
      const apiResponse = await fetch(`${API_BASE}/api/ContactFormSubmissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Submit to FormSubmit for email notifications
      await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formSubmitData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!apiResponse.ok) {
        console.warn('Backend submission had issues, but FormSubmit was sent');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setSubmitError(error.message || "Failed to send enquiry. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="enquiry-form-container">
        <div className="enquiry-success">
          <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h3>Thank You!</h3>
          <p>Your enquiry has been submitted successfully. We'll get back to you soon.</p>
          <button 
            className="enquiry-btn secondary"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="enquiry-form-container">
      <h3 className="enquiry-title">Have Questions About This Topic?</h3>
      <p className="enquiry-subtitle">Send us an enquiry regarding: <strong>{blogTitle}</strong></p>
      
      <form onSubmit={handleSubmit} className="enquiry-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone (Optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your question or enquiry..."
            rows={4}
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>
        
        {submitError && (
          <div className="error-message" style={{ color: '#dc2626', padding: '12px', background: '#fef2f2', borderRadius: '8px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}
        
        <button 
          type="submit" 
          className="enquiry-btn primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
