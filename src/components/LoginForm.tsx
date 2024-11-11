import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials.username, credentials.password);
  };

  return (
    <div className="bg-gray-700 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Login Required</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
  );
}