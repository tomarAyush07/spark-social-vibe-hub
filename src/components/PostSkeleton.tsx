import React from 'react';

export const PostSkeleton: React.FC = () => (
  <div className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gray-200" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-1/2" />
    <div className="flex gap-4 mt-4">
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-4 w-12 bg-gray-200 rounded" />
    </div>
  </div>
); 