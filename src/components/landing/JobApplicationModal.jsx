import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
import { DocumentIcon } from '../common/Icons';

export const JobApplicationModal = ({ 
  isOpen, 
  onClose, 
  job 
}) => {
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    current_location: '',
    total_experience: '',
    current_company: '',
    current_designation: '',
    expected_salary: '',
    notice_period: '',
    linkedin_url: '',
    skills: '',
    cover_letter: ''
  });

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const uploadResume = async (file) => {
    if (!file) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      return { url: publicUrl, filename: file.name };
    } catch (error) {
      console.error('Error uploading resume:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (!resumeFile) {
      alert('Please upload your resume');
      return;
    }

    setLoading(true);

    try {
      // Upload resume
      const resumeData = await uploadResume(resumeFile);
      if (!resumeData) {
        alert('Error uploading resume. Please try again.');
        setLoading(false);
        return;
      }

      // Check if candidate exists
      const { data: existingCandidate, error: checkError } = await supabase
        .from('td_candidates')
        .select('id')
        .eq('email', formData.email)
        .single();

      let candidateId;

      if (existingCandidate) {
        // Update existing candidate
        candidateId = existingCandidate.id;
        const { error: updateError } = await supabase
          .from('td_candidates')
          .update({
            full_name: formData.full_name,
            phone: formData.phone,
            current_location: formData.current_location,
            total_experience: formData.total_experience,
            current_company: formData.current_company,
            current_designation: formData.current_designation,
            expected_salary: formData.expected_salary,
            notice_period: formData.notice_period,
            linkedin_url: formData.linkedin_url,
            skills: formData.skills,
            resume_url: resumeData.url,
            resume_filename: resumeData.filename,
            status: 'New'
          })
          .eq('id', candidateId);

        if (updateError) throw updateError;
      } else {
        // Create new candidate
        const { data: newCandidate, error: insertError } = await supabase
          .from('td_candidates')
          .insert([{
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            current_location: formData.current_location,
            total_experience: formData.total_experience,
            current_company: formData.current_company,
            current_designation: formData.current_designation,
            expected_salary: formData.expected_salary,
            notice_period: formData.notice_period,
            linkedin_url: formData.linkedin_url,
            skills: formData.skills,
            resume_url: resumeData.url,
            resume_filename: resumeData.filename,
            status: 'New'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        candidateId = newCandidate.id;
      }

      // Create application
      const { error: appError } = await supabase
        .from('td_applications')
        .insert([{
          candidate_id: candidateId,
          job_id: job.id,
          status: 'Applied',
          cover_letter: formData.cover_letter
        }]);

      if (appError) {
        // If application already exists, that's okay
        if (appError.code !== '23505') {
          throw appError;
        }
      }

      alert('Application submitted successfully! We will contact you soon.');
      handleClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      current_location: '',
      total_experience: '',
      current_company: '',
      current_designation: '',
      expected_salary: '',
      notice_period: '',
      linkedin_url: '',
      skills: '',
      cover_letter: ''
    });
    setResumeFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-6 rounded-t-xl sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Apply for Position</h3>
              <p className="text-orange-100 mt-1">{job.job_title}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white text-opacity-80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.current_location}
                  onChange={(e) => setFormData({...formData, current_location: e.target.value})}
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Experience
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.total_experience}
                  onChange={(e) => setFormData({...formData, total_experience: e.target.value})}
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.current_company}
                  onChange={(e) => setFormData({...formData, current_company: e.target.value})}
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Designation
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.current_designation}
                  onChange={(e) => setFormData({...formData, current_designation: e.target.value})}
                  placeholder="Job title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notice Period
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.notice_period}
                  onChange={(e) => setFormData({...formData, notice_period: e.target.value})}
                  placeholder="e.g., 30 days"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Salary
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.expected_salary}
                  onChange={(e) => setFormData({...formData, expected_salary: e.target.value})}
                  placeholder="e.g., ₹15-20 LPA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                  placeholder="LinkedIn profile URL"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Skills
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              placeholder="e.g., JavaScript, React, Node.js (comma-separated)"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume * (PDF, DOC, DOCX - Max 5MB)
            </label>
            <label className="cursor-pointer">
              <div className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors bg-gray-50">
                <DocumentIcon className="w-6 h-6 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">
                  {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </label>
            {resumeFile && (
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove file
              </button>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter (Optional)
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              value={formData.cover_letter}
              onChange={(e) => setFormData({...formData, cover_letter: e.target.value})}
              placeholder="Tell us why you're a great fit for this role..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};