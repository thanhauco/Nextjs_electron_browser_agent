import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface BrowserNavigationProps {
  onNavigate: (url: string) => void;
}

export default function BrowserNavigation({ onNavigate }: BrowserNavigationProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onNavigate(url.trim());
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
      <button 
        className="p-2 hover:bg-gray-600 rounded"
        onClick={() => url && onNavigate(url)}
      >
        <ArrowPathIcon className="h-5 w-5 text-gray-300" />
      </button>
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL (e.g., coursera.com)"
          className="w-full px-3 py-2 bg-gray-900 text-white rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </form>
    </div>
  );
}