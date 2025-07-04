
import React, { useState } from 'react';
import { Search as SearchIcon, Hash, User, TrendingUp, Filter } from 'lucide-react';

const trendingTopics = [
  { tag: '#VibeCheck', posts: '12.4K posts', trend: '+15%', category: 'Lifestyle' },
  { tag: '#TechTrends', posts: '8.7K posts', trend: '+23%', category: 'Technology' },
  { tag: '#MondayMotivation', posts: '15.2K posts', trend: '+8%', category: 'Motivation' },
  { tag: '#CodeLife', posts: '6.3K posts', trend: '+45%', category: 'Programming' },
  { tag: '#DesignInspiration', posts: '9.8K posts', trend: '+12%', category: 'Design' }
];

const suggestedUsers = [
  { name: 'Tech Guru', username: 'techguru', followers: '125K', verified: true, category: 'Technology', bio: 'AI & Tech enthusiast' },
  { name: 'Design Master', username: 'designmaster', followers: '89K', verified: false, category: 'Design', bio: 'UI/UX Designer' },
  { name: 'Code Wizard', username: 'codewizard', followers: '67K', verified: true, category: 'Programming', bio: 'Full-stack developer' },
  { name: 'UI Artist', username: 'uiartist', followers: '45K', verified: false, category: 'Design', bio: 'Creative director' }
];

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent mb-2">
              Explore
            </h1>
            <p className="text-gray-600">Discover new people and trending topics</p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300"
          >
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </button>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for people, posts, or hashtags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg focus:shadow-xl"
          />
        </div>
        
        {/* Search Suggestions Dropdown */}
        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 z-50">
            <div className="p-4 space-y-3">
              <div className="text-sm font-medium text-gray-500 mb-2">Quick suggestions</div>
              {['#vibecheck', '@techguru', 'UI design tips'].map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50/50 cursor-pointer transition-all duration-200">
                  <SearchIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
          <div className="flex flex-wrap gap-2">
            {['All', 'Technology', 'Design', 'Programming', 'Lifestyle', 'Motivation'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Tabs */}
      <div className="flex space-x-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        {[
          { id: 'trending', label: 'Trending', icon: TrendingUp },
          { id: 'people', label: 'People', icon: User },
          { id: 'posts', label: 'Posts', icon: Hash }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'trending' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            <span className="text-sm text-gray-500">Updated 2 minutes ago</span>
          </div>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-purple-200 group-hover:to-indigo-200 transition-all duration-300">
                    <Hash className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {topic.tag}
                    </h3>
                    <p className="text-sm text-gray-500">{topic.posts}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                      {topic.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {topic.trend}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">trending</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'people' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Suggested for you</h2>
          {suggestedUsers.map((user, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {user.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                    <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">{user.followers} followers</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {user.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <SearchIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Search for posts</h3>
          <p className="text-gray-600 mb-6">Use the search bar above to find specific posts and content</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Start exploring
          </button>
        </div>
      )}
    </div>
  );
};
