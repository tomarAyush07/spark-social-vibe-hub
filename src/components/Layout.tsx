
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
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
        
        {/* Right Sidebar - Enhanced with more interactivity */}
        <div className="hidden xl:block w-80 p-6">
          <div className="sticky top-6 space-y-6">
            {/* Trending Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Trending Now</h3>
              <div className="space-y-3">
                {[
                  { tag: '#VibeCheck', posts: '12.5K', trend: '+15%' },
                  { tag: '#TechTrends', posts: '8.3K', trend: '+8%' },
                  { tag: '#MondayMotivation', posts: '15.2K', trend: '+23%' },
                  { tag: '#CreativeLife', posts: '6.7K', trend: '+12%' },
                  { tag: '#InspireDaily', posts: '9.1K', trend: '+18%' }
                ].map((item) => (
                  <div key={item.tag} className="group cursor-pointer p-3 rounded-xl hover:bg-indigo-50/50 transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                          {item.tag}
                        </div>
                        <div className="text-sm text-gray-500">{item.posts} posts</div>
                      </div>
                      <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {item.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enhanced Suggestions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Who to follow</h3>
              <div className="space-y-4">
                {[
                  { name: 'Alex Johnson', handle: 'alexj', verified: true, mutual: 'Sarah & 3 others' },
                  { name: 'Maria Garcia', handle: 'mariag', verified: false, mutual: 'David & 2 others' },
                  { name: 'David Chen', handle: 'davidc', verified: true, mutual: 'Alex & 5 others' }
                ].map((user, index) => (
                  <div key={user.name} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        {user.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">@{user.handle}</div>
                        <div className="text-xs text-gray-400">Followed by {user.mutual}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 pt-4 border-t border-gray-100 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors">
                Show more
              </button>
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
