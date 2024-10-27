import React from 'react';
import { Brain } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Task Emotional Manager
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Optimiza tu tiempo y energía
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;