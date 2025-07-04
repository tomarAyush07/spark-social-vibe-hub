
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        
        {/* Right Sidebar - Trending/Suggestions */}
        <div className="hidden xl:block w-80 p-6">
          <div className="sticky top-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Trending</h3>
              <div className="space-y-3">
                {['#VibeCheck', '#TechTrends', '#MondayMotivation'].map((tag) => (
                  <div key={tag} className="text-sm text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};
