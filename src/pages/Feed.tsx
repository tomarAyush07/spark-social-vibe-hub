
import React from 'react';
import { Post } from '@/components/Post';

const mockPosts = [
  {
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    content: 'Just finished an amazing coding session! Built a new feature for our social platform. The satisfaction of seeing clean code come together is unmatched 💻✨ #coding #webdev',
    timestamp: '2h',
    likes: 24,
    comments: 8,
    isLiked: true
  },
  {
    author: {
      name: 'Alex Chen',
      username: 'alexc',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
    },
    content: 'Beautiful sunset from my balcony today. Sometimes we need to pause and appreciate the simple moments in life 🌅',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    timestamp: '4h',
    likes: 156,
    comments: 23
  },
  {
    author: {
      name: 'Maya Patel',
      username: 'mayap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya'
    },
    content: 'Excited to share that I just launched my first mobile app! 🚀 It\'s been months of hard work, late nights, and countless cups of coffee. Thank you to everyone who supported me on this journey!',
    timestamp: '6h',
    likes: 89,
    comments: 15,
    isSaved: true
  },
  {
    author: {
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
    },
    content: 'Working on some UI designs for a new project. Love how modern interfaces can be both beautiful and functional. What do you think makes a great user experience?',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    timestamp: '8h',
    likes: 67,
    comments: 12
  }
];

export const Feed = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Feed</h1>
        <p className="text-gray-600">Discover what's happening in your network</p>
      </div>

      {/* Stories */}
      <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-purple-100">
        <h3 className="font-semibold text-gray-900 mb-4">Stories</h3>
        <div className="flex space-x-4 overflow-x-auto">
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold border-4 border-white shadow-lg">
              +
            </div>
            <span className="text-xs text-gray-600 mt-2 block">Your Story</span>
          </div>
          {['Emma', 'James', 'Sofia', 'Ryan'].map((name) => (
            <div key={name} className="flex-shrink-0 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-semibold border-4 border-white shadow-lg">
                {name.charAt(0)}
              </div>
              <span className="text-xs text-gray-600 mt-2 block">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div>
        {mockPosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors font-medium">
          Load More Posts
        </button>
      </div>
    </div>
  );
};
