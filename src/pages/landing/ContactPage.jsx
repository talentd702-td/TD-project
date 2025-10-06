import React, { useState } from 'react';
import { PhoneIcon, MailIcon, LocationIcon } from '../../components/common/Icons';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: '',
    companyName: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the privacy policy and terms of service');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          fullName: '', email: '', phone: '', enquiryType: '',
          companyName: '', message: '', agreeToTerms: false
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Get In Touch</h2>
            <div className="w-16 h-0.5 bg-orange-400 mx-auto mb-2"></div>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              Have a question or ready to partner with us? We'd love to hear from you.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-400/30 rounded-xl px-6 py-8 text-center backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-1.5">Message Sent Successfully!</h3>
              <p className="text-sm text-green-200">We'll get back to you soon.</p>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-5 md:p-6 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name *</label>
                    <input id="fullName" type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address *</label>
                    <input id="email" type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                      placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 mb-1.5">Phone Number</label>
                    <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                      placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="enquiryType" className="block text-xs font-semibold text-gray-300 mb-1.5">Enquiry Type *</label>
                    <select id="enquiryType" name="enquiryType" required value={formData.enquiryType} onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-400 focus:outline-none cursor-pointer transition-all text-sm">
                      <option value="" className="bg-gray-900">Select type</option>
                      <option value="hiring" className="bg-gray-900">Hiring Services</option>
                      <option value="job" className="bg-gray-900">Job Opportunity</option>
                      <option value="partnership" className="bg-gray-900">Partnership</option>
                      <option value="media" className="bg-gray-900">Media Enquiry</option>
                      <option value="general" className="bg-gray-900">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-xs font-semibold text-gray-300 mb-1.5">Company Name</label>
                  <input id="companyName" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                    placeholder="Your Company" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-300 mb-1.5">Message *</label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleInputChange}
                    className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none resize-none transition-all text-sm"
                    placeholder="Tell us more about your enquiry..."></textarea>
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <input type="checkbox" id="privacy" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleCheckboxChange}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 text-orange-500 focus:ring-1 focus:ring-orange-400 cursor-pointer" />
                  <label htmlFor="privacy" className="text-xs text-gray-300 cursor-pointer select-none leading-tight">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="w-full px-6 py-2.5 rounded-lg font-semibold text-white transition-all hover:scale-[1.01] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{ backgroundColor: '#FF4500' }}>
                  <span className="relative z-10 text-sm">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </form>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="group p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-orange-400/50 transition-all hover:scale-105 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:rotate-6 transition-transform">
                <PhoneIcon className="text-white w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs mb-1">Call Us</h4>
              <p className="text-gray-300 text-xs">+91 (0) 123 456 7890</p>
            </div>

            <div className="group p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-orange-400/50 transition-all hover:scale-105 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:rotate-6 transition-transform">
                <MailIcon className="text-white w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs mb-1">Email Us</h4>
              <p className="text-gray-300 text-xs">hello@talentdiscovery.com</p>
            </div>

            <div className="group p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-orange-400/50 transition-all hover:scale-105 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:rotate-6 transition-transform">
                <LocationIcon className="text-white w-4 h-4" />
              </div>
              <h4 className="font-bold text-white text-xs mb-1">Visit Us</h4>
              <p className="text-gray-300 text-xs">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};