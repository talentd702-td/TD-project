// pages/privacy.js or components/PrivacyPolicy.js
import { useState } from 'react';

export default function PrivacyPolicy({ onBack = null }) {
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
            Privacy Policy
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <div className="bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Privacy Policy – Ask The Stars</h2>
            <p className="text-gray-400">Last updated August 31, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-gray-300 leading-relaxed">
              This Privacy Notice for NEW EUROPEAN MEDIA LTD ("we," "us," or "our") explains how and why we collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including our mobile app Ask The Stars.
            </p>

            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
              <p className="text-red-300 font-medium">
                If you do not agree with this Privacy Policy, please do not use the app.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">1. Information We Collect</h3>
              <div className="space-y-3 text-gray-300">
                <p><strong>Information you provide:</strong> name, birth details, relationship information, email, payment data (processed via App Store / Google Play).</p>
                <p><strong>Automatically collected information:</strong> device type, IP address, OS, app usage, crash logs.</p>
                <p><strong>Optional data:</strong> push notification preferences, in-app interaction data.</p>
                <p className="text-orange-300 font-medium">We do not knowingly collect data from minors under 18.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">2. How We Use Your Information</h3>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Provide and personalize astrology services.</li>
                <li>Process in-app purchases securely.</li>
                <li>Improve app functionality and security.</li>
                <li>Communicate with you (updates, reminders, offers – only with consent).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">3. Legal Basis for Processing</h3>
              <p className="text-gray-300 mb-3">Under GDPR/UK GDPR, we process data based on:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li><strong>Consent</strong> (optional features, newsletters, push notifications).</li>
                <li><strong>Contract</strong> (to deliver Services you requested).</li>
                <li><strong>Legal obligations</strong> (regulatory compliance).</li>
                <li><strong>Legitimate interests</strong> (improving and securing the app).</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">4. Sharing of Information</h3>
              <p className="text-gray-300 mb-3">We may share data with:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Trusted service providers (hosting, analytics, payments).</li>
                <li>Business transfers (if we merge, sell, or restructure).</li>
                <li>Legal authorities (if required by law).</li>
              </ul>
              <p className="text-orange-300 font-medium mt-3">We do not sell or rent your personal data.</p>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">5. Data Retention</h3>
              <p className="text-gray-300">
                We retain personal data only as long as necessary for the purposes outlined. Once no longer needed, data is deleted or anonymized.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">6. International Transfers</h3>
              <p className="text-gray-300">
                Data may be stored in the UK, EU, or with providers abroad. Safeguards (e.g. Standard Contractual Clauses) are applied.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">7. Data Security</h3>
              <p className="text-gray-300">
                We use technical and organizational safeguards. However, no system is 100% secure. Use of the app is at your own risk.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">8. Your Rights</h3>
              <p className="text-gray-300 mb-3">Depending on your jurisdiction, you may:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Access or obtain a copy of your data.</li>
                <li>Correct or delete your data.</li>
                <li>Restrict or object to processing.</li>
                <li>Withdraw consent at any time.</li>
              </ul>
              <p className="text-orange-300 font-medium mt-3">
                Requests: <a href="mailto:info@askthestarsapp.com" className="underline hover:text-orange-200">info@askthestarsapp.com</a>
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">9. Do-Not-Track</h3>
              <p className="text-gray-300">
                We currently do not respond to browser DNT signals.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-3">10. Changes to this Policy</h3>
              <p className="text-gray-300">
                We may update this Privacy Policy. The "Last Updated" date reflects the latest version.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/30 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p className="font-semibold">NEW EUROPEAN MEDIA LTD</p>
                <p>Suite C, 4-6 Canfield Place</p>
                <p>London NW6 3BT, United Kingdom</p>
                <p>Company number: 07212256</p>
                <p>
                  Email: <a href="mailto:info@askthestarsapp.com" className="text-orange-300 underline hover:text-orange-200">
                    info@askthestarsapp.com
                  </a>
                </p>
              </div>
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