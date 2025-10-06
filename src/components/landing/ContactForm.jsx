import React, { useState } from 'react';

export const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-full">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="flex-1 px-8 py-4 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-white outline-none text-white text-base placeholder-white placeholder-opacity-70 backdrop-blur-sm transition-all duration-300"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-base font-medium ${
              isSubmitting
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-white hover:bg-gray-100 text-black'
            }`}
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
            ) : (
              'Get In Touch'
            )}
          </button>
        </form>
      ) : (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 text-green-300 rounded-full px-8 py-4 text-center text-base">
          Thanks! We'll be in touch soon.
        </div>
      )}
    </div>
  );
};