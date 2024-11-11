import { useState } from 'react';
import { ArrowPathIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
const { ipcRenderer } = window.require('electron');

interface LoginForm {
  username: string;
  password: string;
}

export default function Browser() {
  const [url, setUrl] = useState('');
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // Send URL to main process for navigation
      ipcRenderer.send('navigate-url', url.trim());
      setShowLogin(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log('Login attempted with:', loginForm);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      <div className="flex flex-col space-y-4">
        {/* Browser Controls */}
        <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
          <button 
            className="p-2 hover:bg-gray-600 rounded"
            onClick={() => ipcRenderer.send('navigate-url', url)}
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-300" />
          </button>
          <form onSubmit={handleNavigate} className="flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (e.g., coursera.com)"
              className="w-full px-3 py-2 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </form>
        </div>

        {/* Login Form */}
        {showLogin && (
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Login Required</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </button>
            </form>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-700 rounded p-4">
          <div className="text-center text-gray-400">
            {!url ? (
              "Enter a URL above to open it in your default browser"
            ) : (
              "URL will open in your default browser"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}