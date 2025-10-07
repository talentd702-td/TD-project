import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
import { PhoneIcon, MailIcon, LocationIcon } from '../../components/common/Icons';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: '',
    companyName: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.enquiryType || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('td_enquiries')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          enquiry_type: formData.enquiryType,
          company_name: formData.companyName || null,
          message: formData.message,
          status: 'New'
        }]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        enquiryType: '',
        companyName: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003566 0%, #001122 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Get In <span style={{ color: '#FF4500' }}>Touch</span>
            </h2>
            <div className="w-20 h-0.5 bg-orange-400 mx-auto mb-3"></div>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Have a question or ready to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              {submitSuccess ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-sm text-gray-300">We'll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  <form onSubmit={handleSubmit} className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Send us a Message</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                          <input 
                            id="fullName" 
                            type="text" 
                            name="fullName" 
                            required 
                            value={formData.fullName} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                            placeholder="John Doe" 
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                          <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                            placeholder="john@company.com" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                          <input 
                            id="phone" 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                            placeholder="+91 98765 43210" 
                          />
                        </div>
                        <div>
                          <label htmlFor="enquiryType" className="block text-sm font-semibold text-gray-300 mb-2">Enquiry Type *</label>
                          <select 
                            id="enquiryType" 
                            name="enquiryType" 
                            required 
                            value={formData.enquiryType} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-orange-400 focus:outline-none cursor-pointer transition-all text-sm"
                          >
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
                        <label htmlFor="companyName" className="block text-sm font-semibold text-gray-300 mb-2">Company Name</label>
                        <input 
                          id="companyName" 
                          type="text" 
                          name="companyName" 
                          value={formData.companyName} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none transition-all text-sm"
                          placeholder="Your Company" 
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
                        <textarea 
                          id="message" 
                          name="message" 
                          required 
                          rows={4} 
                          value={formData.message} 
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none resize-none transition-all text-sm"
                          placeholder="Tell us more about your enquiry..."
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        style={{ backgroundColor: '#FF4500' }}
                      >
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
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                    <PhoneIcon className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-2">Call Us</h4>
                  <p className="text-gray-300 text-sm">+91 (0) 123 456 7890</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                    <MailIcon className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-2">Email Us</h4>
                  <p className="text-gray-300 text-sm">hello@talentdiscoveri.com</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
                <div className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #FF4500 0%, #FF6A33 100%)' }}>
                    <LocationIcon className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-2">Visit Us</h4>
                  <p className="text-gray-300 text-sm">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;