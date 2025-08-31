// pages/terms.js or components/TermsOfService.js
import { useState } from 'react';

export default function TermsOfService({ onBack = null }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-red-500/5 via-orange-500/2 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-orange-500/3 via-red-500/1 to-transparent blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="border-b border-gray-800 p-4 relative z-20">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
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
            Terms of Service
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <div className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Terms of Service – Ask The Stars</h2>
            <p className="text-gray-400">Last updated August 31, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-gray-300 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Ask The Stars provided by NEW EUROPEAN MEDIA LTD. By downloading or using the app, you agree to these Terms.
            </p>

            {/* Section 1 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">1. Eligibility</h3>
              <p className="text-gray-300">
                You must be at least 18 years old to use the app. By using it, you confirm you meet this requirement.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">2. License</h3>
              <p className="text-gray-300">
                We grant you a limited, non-exclusive, non-transferable license to use Ask The Stars for personal, non-commercial purposes in accordance with these Terms.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">3. Prohibited Use</h3>
              <p className="text-gray-300 mb-3">You agree not to:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Use the app for unlawful or fraudulent purposes.</li>
                <li>Attempt to reverse-engineer or modify the app.</li>
                <li>Use automated tools (bots, scrapers) to extract data.</li>
                <li>Infringe on intellectual property rights.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">4. In-App Purchases</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Payments are processed via App Store or Google Play.</li>
                <li>All purchases are final and non-refundable, except as required by law or platform rules.</li>
                <li>Subscription terms (if any) are managed through your app store account.</li>
              </ul>
            </div>

            {/* Section 5 - Disclaimer */}
            <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-400 mb-3">5. Disclaimer</h3>
              <p className="text-gray-300">
                Ask The Stars provides entertainment and self-reflection services. It does not provide medical, legal, or professional advice. We do not guarantee accuracy of astrological interpretations. Use is at your own discretion.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">6. Limitation of Liability</h3>
              <p className="text-gray-300 mb-3">To the maximum extent permitted by law:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>We are not liable for indirect, incidental, or consequential damages.</li>
                <li>Our total liability shall not exceed the amount you paid for the app/services in the last 12 months.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">7. Termination</h3>
              <p className="text-gray-300">
                We may suspend or terminate access if you violate these Terms or misuse the app.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">8. Intellectual Property</h3>
              <p className="text-gray-300">
                All rights in the Ask The Stars app, content, trademarks, and branding are owned by NEW EUROPEAN MEDIA LTD.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">9. Governing Law</h3>
              <p className="text-gray-300">
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of UK courts.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">10. Updates to Terms</h3>
              <p className="text-gray-300">
                We may revise these Terms periodically. Continued use after updates constitutes acceptance.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/30 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Contact</h3>
              <p className="text-gray-300">
                For questions about these Terms:<br />
                <a href="mailto:info@askthestarsapp.com" className="text-orange-300 underline hover:text-orange-200">
                  info@askthestarsapp.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}