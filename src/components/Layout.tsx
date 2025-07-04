
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
              <h3 className="font-semibold text-gray-900 mb-4">Trending</h3>
              <div className="space-y-3">
                {['#VibeCheck', '#TechTrends', '#MondayMotivation', '#CreativeLife', '#InspireDaily'].map((tag) => (
                  <div key={tag} className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <div className="font-medium">{tag}</div>
                    <div className="text-xs text-gray-400">12.5K posts</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
              <h3 className="font-semibold text-gray-900 mb-4">Suggested for you</h3>
              <div className="space-y-4">
                {['Alex Johnson', 'Maria Garcia', 'David Chen'].map((name, index) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{name}</div>
                        <div className="text-xs text-gray-500">Suggested for you</div>
                      </div>
                    </div>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                      Follow
                    </button>
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
