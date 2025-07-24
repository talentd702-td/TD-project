import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function UserForm({ user }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthPlace: ''
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);

  useEffect(() => {
    // Check if user already has data saved
    const checkExistingData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFormData({
            name: userData.name || '',
            gender: userData.gender || '',
            dateOfBirth: userData.dateOfBirth || '',
            timeOfBirth: userData.timeOfBirth || '',
            birthPlace: userData.birthPlace || ''
          });
          setHasExistingData(true);
        }
      }
    };

    checkExistingData();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firebase Firestore
      await setDoc(doc(db, 'users', user.uid), {
        ...formData,
        email: user.email,
        updatedAt: new Date().toISOString()
      });

      setSaved(true);
      setHasExistingData(true);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {hasExistingData ? 'Update Your Information' : 'Complete Your Profile'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Time of Birth
          </label>
          <input
            type="time"
            id="timeOfBirth"
            name="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">
            Birth Place
          </label>
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, Country"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          {loading ? 'Saving...' : hasExistingData ? 'Update Information' : 'Save Information'}
        </button>

        {saved && (
          <div className="text-green-600 text-center font-medium">
            ✓ Information saved successfully!
          </div>
        )}
      </form>
    </div>
  );
}