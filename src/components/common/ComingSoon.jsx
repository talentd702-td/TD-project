import React from 'react';

export const ComingSoon = ({ title }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
      <span className="text-3xl">⏳</span>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title} Coming Soon</h2>
    <p className="text-gray-500 max-w-md mx-auto">
      This feature is currently under development. We're working hard to bring you the best experience.
    </p>
  </div>
);