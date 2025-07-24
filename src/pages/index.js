import { useState, useEffect } from 'react';
import AuthWrapper from '../components/AuthWrapper';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <AuthWrapper>
      {({ user }) => (
        <div className="min-h-screen bg-white">
          {!user ? (
            <LandingPage />
          ) : (
            <Dashboard user={user} />
          )}
        </div>
      )}
    </AuthWrapper>
  );
}