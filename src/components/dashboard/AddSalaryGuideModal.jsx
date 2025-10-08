import React, { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

export const AddSalaryGuideModal = ({
  showAddGuide,
  editingGuide,
  formData,
  setFormData,
  loading,
  uploadingFile,
  handleSubmit,
  resetForm
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!showAddGuide) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(selectedFile);
    if (success) {
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {editingGuide ? 'Edit Salary Guide' : 'Upload New Salary Guide'}
          </h2>
          <button
            onClick={resetForm}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading || uploadingFile}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., 2025 Tech Salary Guide"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the salary guide"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File {!editingGuide && '*'}
              </label>
              
              {editingGuide && formData.file_name && !selectedFile && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{formData.file_name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(formData.file_size)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload a new file to replace the current one</p>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="hidden"
                  id="file-upload"
                  required={!editingGuide}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, XLS, XLSX (Max 50MB)
                  </p>
                  {selectedFile && (
                    <p className="text-xs text-orange-600 mt-2 font-medium">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading || uploadingFile}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={loading || uploadingFile}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {uploadingFile ? 'Uploading...' : loading ? 'Saving...' : editingGuide ? 'Update Guide' : 'Upload Guide'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalaryGuideModal;