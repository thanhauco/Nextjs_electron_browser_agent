import { GlobeAltIcon } from '@heroicons/react/24/solid';

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center gap-3">
        <GlobeAltIcon className="h-8 w-8 text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Web Browser</h1>
          <p className="text-gray-400">Navigate and Login to Websites</p>
        </div>
      </div>
    </header>
  );
}