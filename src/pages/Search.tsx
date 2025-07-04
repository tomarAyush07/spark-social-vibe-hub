
import React, { useState } from 'react';
import { Search as SearchIcon, Hash, User } from 'lucide-react';
import { Input } from '@/components/Input';

const trendingTopics = [
  { tag: '#VibeCheck', posts: '12.4K posts' },
  { tag: '#TechTrends', posts: '8.7K posts' },
  { tag: '#MondayMotivation', posts: '15.2K posts' },
  { tag: '#CodeLife', posts: '6.3K posts' },
  { tag: '#DesignInspiration', posts: '9.8K posts' }
];

const suggestedUsers = [
  { name: 'Tech Guru', username: 'techguru', followers: '125K', verified: true },
  { name: 'Design Master', username: 'designmaster', followers: '89K', verified: false },
  { name: 'Code Wizard', username: 'codewizard', followers: '67K', verified: true },
  { name: 'UI Artist', username: 'uiartist', followers: '45K', verified: false }
];

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
        <p className="text-gray-600">Discover new people and trending topics</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for people, posts, or hashtags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-purple-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-xl p-1">
        {[
          { id: 'trending', label: 'Trending' },
          { id: 'people', label: 'People' },
          { id: 'posts', label: 'Posts' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'trending' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Trending Now</h2>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{topic.tag}</h3>
                    <p className="text-sm text-gray-500">{topic.posts}</p>
                  </div>
                </div>
                <div className="text-sm text-purple-600 font-medium">Trending</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'people' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Suggested for you</h2>
          {suggestedUsers.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">@{user.username} • {user.followers} followers</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search for posts</h3>
          <p className="text-gray-600">Use the search bar above to find specific posts</p>
        </div>
      )}
    </div>
  );
};
