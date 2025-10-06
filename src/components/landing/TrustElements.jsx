import React from 'react';

export const TrustElements = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  ];

  return (
    <div className="inline-flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-full py-2 px-4 text-sm">
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-lg"
          >
            <img
              src={avatar}
              alt="HR Leader"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-white whitespace-nowrap">
        <span className="text-white font-semibold">500+</span> successful placements
      </p>
    </div>
  );
};