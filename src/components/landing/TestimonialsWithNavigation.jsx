import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons';

export const TestimonialsWithNavigation = ({ testimonials }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRotation = (index) => {
    const rotations = [3, -2, 5, -4, 2, 4];
    return rotations[index % rotations.length];
  };

  return (
    <div className="max-w-sm md:max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center md:justify-end">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === active
                    ? 'opacity-100 scale-100'
                    : 'opacity-70 scale-95'
                }`}
                style={{
                  transform: `rotate(${index === active ? 0 : getRotation(index)}deg) translateY(${
                    index === active ? 0 : 20
                  }px)`,
                  zIndex: index === active ? 999 : testimonials.length + 2 - index
                }}
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-full h-full object-cover object-center rounded-full shadow-xl border-4 border-white"
                  style={{
                    objectPosition: 'center center',
                    transform: 'scale(1.2)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 md:pl-6">
          <div
            key={active}
            className="transition-all duration-300 ease-in-out"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {testimonials[active].name}
            </h3>
            <p className="text-base text-blue-300 mb-6 font-medium">
              {testimonials[active].designation}
            </p>
            <div className="max-h-48 md:max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-thumb-opacity-20">
              <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                {testimonials[active].quote}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm flex items-center justify-center group transition-all duration-200 border border-white border-opacity-20"
            >
              <ArrowLeftIcon className="text-white group-hover:scale-110 transition-all duration-200" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm flex items-center justify-center group transition-all duration-200 border border-white border-opacity-20"
            >
              <ArrowRightIcon className="text-white group-hover:scale-110 transition-all duration-200" />
            </button>
            <div className="ml-4 flex space-x-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === active ? 'bg-white' : 'bg-white bg-opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};