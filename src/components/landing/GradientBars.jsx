import React from 'react';

export const GradientBars = () => {
  const bars = Array.from({ length: 15 }, (_, index) => {
    const position = index / 14;
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);
    const height = 30 + (100 - 30) * heightPercentage;

    return (
      <div
        key={index}
        className="animate-pulse"
        style={{
          width: '6.67%',
          height: '100%',
          background: 'linear-gradient(to top, #FF4500, transparent)',
          transform: `scaleY(${height / 100})`,
          transformOrigin: 'bottom',
          animationDelay: `${index * 100}ms`,
          animationDuration: '2s',
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="flex h-full w-full">
        {bars}
      </div>
    </div>
  );
};