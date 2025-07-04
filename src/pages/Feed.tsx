
import React, { useState } from 'react';
import { Post } from '@/components/Post';
import { Plus, Sparkles, TrendingUp } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      verified: true
    },
    content: 'Just finished an amazing coding session! Built a new feature for our social platform. The satisfaction of seeing clean code come together is unmatched 💻✨ #coding #webdev',
    timestamp: '2h',
    likes: 24,
    comments: 8,
    reposts: 3,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 2,
    author: {
      name: 'Alex Chen',
      username: 'alexc',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      verified: false
    },
    content: 'Beautiful sunset from my balcony today. Sometimes we need to pause and appreciate the simple moments in life 🌅',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    timestamp: '4h',
    likes: 156,
    comments: 23,
    reposts: 12,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 3,
    author: {
      name: 'Maya Patel',
      username: 'mayap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
      verified: true
    },
    content: 'Excited to share that I just launched my first mobile app! 🚀 It\'s been months of hard work, late nights, and countless cups of coffee. Thank you to everyone who supported me on this journey!',
    timestamp: '6h',
    likes: 89,
    comments: 15,
    reposts: 8,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 4,
    author: {
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      verified: false
    },
    content: 'Working on some UI designs for a new project. Love how modern interfaces can be both beautiful and functional. What do you think makes a great user experience?',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    timestamp: '8h',
    likes: 67,
    comments: 12,
    reposts: 5,
    isLiked: true,
    isBookmarked: false
  }
];

export const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="pb-20 lg:pb-0">
      {/* Enhanced Header with Interactive Elements */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent mb-2">
              Your Feed
            </h1>
            <p className="text-gray-600">Discover what's happening in your network</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-all duration-200 hover:scale-105">
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-all duration-200 hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
          {[
            { id: 'all', label: 'All Posts', count: '234' },
            { id: 'following', label: 'Following', count: '89' },
            { id: 'trending', label: 'Trending', count: '12' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                activeFilter === filter.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Stories Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-white/90 to-indigo-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
          Stories
        </h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          <div className="flex-shrink-0 text-center cursor-pointer group">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold border-4 border-white shadow-lg group-hover:scale-110 transition-all duration-300">
                <Plus className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2 block font-medium">Your Story</span>
          </div>
          {[
            { name: 'Emma', color: 'from-pink-400 to-red-500', online: true },
            { name: 'James', color: 'from-blue-400 to-indigo-500', online: true },
            { name: 'Sofia', color: 'from-purple-400 to-pink-500', online: false },
            { name: 'Ryan', color: 'from-green-400 to-blue-500', online: true },
            { name: 'Luna', color: 'from-yellow-400 to-orange-500', online: false }
          ].map((story) => (
            <div key={story.name} className="flex-shrink-0 text-center cursor-pointer group">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center text-white font-semibold border-4 ${story.online ? 'border-green-400' : 'border-white'} shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  {story.name.charAt(0)}
                </div>
                {story.online && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="text-xs text-gray-600 mt-2 block font-medium">{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts with Enhanced Interactivity */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Enhanced Load More Section */}
      <div className="text-center mt-8">
        <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
          <span className="flex items-center">
            Load More Posts
            <div className="ml-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </span>
        </button>
      </div>
    </div>
  );
};
