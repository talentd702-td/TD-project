// components/ContactUs.js
export default function ContactUs({ onBack = null }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
        {/* Ambient Lighting */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/5 via-orange-500/2 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-orange-500/3 via-red-500/1 to-transparent blur-3xl"></div>
        </div>
  
        {/* Header */}
        <div className="border-b border-gray-800 p-4 relative z-20">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {onBack && (
              <button 
                onClick={onBack}
                className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 touch-manipulation active:scale-95 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
  
        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="max-w-lg mx-auto w-full">
            <div className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 text-center">
              
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
  
              {/* Title */}
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              
              <p className="text-gray-400 mb-8 text-sm">
                We're here to help with any questions about Ask the Stars
              </p>
  
              {/* Contact Information */}
              <div className="space-y-4 text-left">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                  <h3 className="font-semibold text-white mb-3">Company Details</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p className="font-medium">NEW EUROPEAN MEDIA LTD</p>
                    <p>Suite C, 4-6 Canfield Place</p>
                    <p>London NW6 3BT, United Kingdom</p>
                    <p>Company number: 07212256</p>
                  </div>
                </div>
  
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/30 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-400 mb-3">Email Support</h3>
                  <a 
                    href="mailto:info@askthestarsapp.com" 
                    className="text-orange-300 hover:text-orange-200 transition-colors font-medium flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@askthestarsapp.com</span>
                  </a>
                </div>
              </div>
  
              {/* Support Note */}
              <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our cosmic support team typically responds within 24-48 hours. 
                  For the fastest response, please include details about your question or issue.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <style jsx>{`
          .bg-gradient-radial {
            background: radial-gradient(circle, var(--tw-gradient-stops));
          }
        `}</style>
      </div>
    );
  }