import React from 'react';

export const SuggestionSkeleton: React.FC = () => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-16 mb-1" />
        <div className="h-2 bg-gray-100 rounded w-20" />
      </div>
    </div>
    <div className="h-8 w-20 bg-gray-200 rounded-lg" />
  </div>
); 