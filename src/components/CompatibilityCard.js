import { useState, useEffect } from 'react';

export default function CompatibilityCard({ userData, soulmateImage }) {
  const [compatibilityScore, setCompatibilityScore] = useState(0);
  const [userZodiac, setUserZodiac] = useState('');
  const [partnerZodiac, setPartnerZodiac] = useState('');

  useEffect(() => {
    if (userData?.dateOfBirth) {
      const zodiac = getZodiacSign(userData.dateOfBirth);
      setUserZodiac(zodiac);
      
      // Generate partner zodiac based on compatibility
      const compatibleSigns = getCompatibleSigns(zodiac);
      const randomPartner = compatibleSigns[Math.floor(Math.random() * compatibleSigns.length)];
      setPartnerZodiac(randomPartner);
      
      // Calculate compatibility score (92-98% for cosmic matches)
      const score = Math.floor(Math.random() * 7) + 92;
      setCompatibilityScore(score);
    }
  }, [userData]);

  const getZodiacSign = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
    return '';
  };

  const getCompatibleSigns = (sign) => {
    const compatibility = {
      'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
      'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
      'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      'Aquarius': ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
      'Pisces': ['Cancer', 'Scorpio', 'Capricorn', 'Taurus']
    };
    return compatibility[sign] || ['Gemini', 'Libra', 'Aquarius'];
  };

  const getZodiacSymbol = (sign) => {
    const symbols = {
      'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
      'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return symbols[sign] || '⭐';
  };

  const getCompatibilityMessage = (score) => {
    if (score >= 96) return "Your shared cosmic energies ignite playful banter, while their grounding nature complements your emotional depths, creating a vibrant harmony that dances with love and curiosity.";
    if (score >= 92) return "The stars have aligned perfectly for your connection. Your energies create a beautiful balance of passion and understanding.";
    return "A strong cosmic bond awaits you both, filled with mutual growth and celestial harmony.";
  };

  if (!userData?.dateOfBirth || !userZodiac) {
    return null;
  }

  return (
    <div className="bg-black rounded-2xl p-6 shadow-xl border border-gray-800 relative overflow-hidden">
      {/* Background cosmic elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-4xl">✨</div>
        <div className="absolute bottom-4 left-4 text-2xl">⭐</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-5">💫</div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">Lunatica App</h3>
        </div>

        {/* Portrait */}
        {soulmateImage ? (
          <div className="relative mx-auto mb-6 w-48 h-48">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
            <img 
              src={soulmateImage.url} 
              alt="Soulmate Portrait" 
              className="relative w-full h-full object-cover rounded-2xl border-2 border-purple-500 shadow-xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl border-2 border-purple-500 items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-sm">Portrait Preview</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto mb-6 w-48 h-48">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">👤</div>
                <div className="text-sm">Generate Portrait</div>
              </div>
            </div>
          </div>
        )}

        {/* Compatibility Score */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">
            {compatibilityScore}% compatible
          </div>
        </div>

        {/* Zodiac Signs */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <div className="text-center">
            <div className="text-2xl mb-1">{getZodiacSymbol(userZodiac)}</div>
            <div className="text-white text-sm font-medium">{userZodiac}</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-1">)</div>
            <div className="text-white text-sm font-medium">{partnerZodiac}</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl mb-1">↑</div>
            <div className="text-white text-sm font-medium">Aquarius</div>
          </div>
        </div>

        {/* Compatibility Description */}
        <div className="text-center mb-6">
          <p className="text-gray-300 text-sm leading-relaxed px-2">
            {getCompatibilityMessage(compatibilityScore)}
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
            <span>Tap to learn more</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}