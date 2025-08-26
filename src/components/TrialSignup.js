import { useState } from 'react';

export default function TrialSignup({ onAccept, onSkip }) {
  const [notifyBeforeEnd, setNotifyBeforeEnd] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/8 via-orange-500/4 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-orange-500/6 via-red-500/3 to-transparent blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-orange-400/5 to-transparent blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-to-r from-white to-orange-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-gradient-to-r from-white to-red-400 rounded-full animate-pulse delay-300 opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-gradient-to-r from-white to-orange-500 rounded-full animate-pulse delay-700 opacity-50"></div>
        <div className="absolute bottom-60 right-10 w-1 h-1 bg-gradient-to-r from-white to-red-500 rounded-full animate-pulse delay-1000 opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-gradient-to-r from-white to-orange-400 rounded-full animate-pulse delay-500 opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-white to-red-400 rounded-full animate-pulse delay-200 opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        {/* Hand with Stars Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-6xl mb-4 filter drop-shadow-lg">
              ✋
            </div>
            {/* Floating Stars */}
            <div className="absolute -top-2 -right-2">
              <div className="text-2xl animate-bounce text-orange-400">✨</div>
            </div>
            <div className="absolute top-3 -left-4">
              <div className="text-lg animate-bounce delay-300 text-red-400">⭐</div>
            </div>
            <div className="absolute -bottom-1 right-1">
              <div className="text-sm animate-bounce delay-500 text-orange-500">✦</div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-light mb-8 leading-tight bg-gradient-to-r from-white via-orange-200 to-red-300 bg-clip-text text-transparent">
          Discover your Soulmate
        </h1>

        {/* Description */}
        <div className="max-w-lg mx-auto space-y-6 mb-8 text-white/90">
          <p className="text-lg leading-relaxed">
            Ask the Stars is your guide to your life and the universe. Whether it's finding your soulmate, working through life challenges, or becoming the best version of yourself, Ask the Stars can show you the way.
          </p>
          
          <p className="text-base leading-relaxed">
            Millions of people like you have found clarity, peace, and purpose from Ask the Stars' personalized astrological guidance.
          </p>
          
          <p className="text-base leading-relaxed">
            You can meet Ask the Stars through our free trial. You can cancel anytime, no questions asked, so if Ask the Stars is not for you, it is completely free.
          </p>
        </div>

        {/* Team Signature */}
        <div className="mb-8">
          <p className="text-lg italic font-light bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
            The Ask the Stars Team ✨
          </p>
        </div>

        {/* Notification Toggle */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-4 max-w-xs mx-auto border border-gray-700">
            <span className="text-white/90 text-sm">Notify me before my trial ends</span>
            <button
              onClick={() => setNotifyBeforeEnd(!notifyBeforeEnd)}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                notifyBeforeEnd ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  notifyBeforeEnd ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onAccept(notifyBeforeEnd)}
          className="w-full max-w-md bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-4 rounded-full text-lg hover:from-red-600 hover:to-orange-600 active:from-red-700 active:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transform hover:-translate-y-1 flex items-center justify-center space-x-2 mb-4"
        >
          <span>Try Ask the Stars for free</span>
          <span className="text-xl">👋</span>
        </button>

        {/* Pricing Info */}
        <p className="text-white/60 text-sm">
          7-day free trial, then 7,99 € per week
        </p>

        {/* Skip Option */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-6 text-white/60 hover:text-white/80 text-sm underline transition-colors"
          >
            Skip trial for now
          </button>
        )}
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}