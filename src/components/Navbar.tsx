import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-400 rounded-xl shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-400">Headline Widget Design Studio</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

