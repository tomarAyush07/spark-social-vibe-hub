import React from 'react';
import { Plus, Search, TrendingUp } from 'lucide-react';

export const QuickActionsBar: React.FC = () => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-6 bg-white/90 shadow-xl rounded-full px-6 py-3 border border-gray-200 items-center justify-center lg:hidden animate-fade-in">
    <button className="flex flex-col items-center text-indigo-600 hover:text-indigo-800 transition">
      <Plus className="w-6 h-6 mb-1" />
      <span className="text-xs font-medium">New</span>
    </button>
    <button className="flex flex-col items-center text-purple-600 hover:text-purple-800 transition">
      <Search className="w-6 h-6 mb-1" />
      <span className="text-xs font-medium">Search</span>
    </button>
    <button className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition">
      <TrendingUp className="w-6 h-6 mb-1" />
      <span className="text-xs font-medium">Trending</span>
    </button>
  </div>
); 