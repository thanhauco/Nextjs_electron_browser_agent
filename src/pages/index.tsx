import { useState } from 'react';
import BrowserNavigation from '../components/BrowserNavigation';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const handleNavigate = (url: string) => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.navigateUrl(url);
      setShowLogin(true);
    }
  };

  const handleLogin = (username: string, password: string) => {
    console.log('Login attempted with:', { username, password });
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">Web Browser Navigation</h1>
        
        <BrowserNavigation onNavigate={handleNavigate} />
        
        {showLogin && <LoginForm onSubmit={handleLogin} />}
        
        <div className="bg-gray-700 rounded p-4">
          <div className="text-center text-gray-400">
            Enter a URL above to open it in your default browser
          </div>
        </div>
      </div>
    </div>
  );
}