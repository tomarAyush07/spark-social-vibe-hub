
import React, { useState } from 'react';
import { Edit, MapPin, Calendar, Link as LinkIcon, Camera, Settings, Share } from 'lucide-react';
import { Post } from '@/components/Post';
import { Button } from '@/components/Button';

const userPosts = [
  {
    id: 1,
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: '',
      verified: true
    },
    content: 'Just shared my latest project! Excited to see what everyone thinks. Building in public has been such an amazing journey 🚀',
    timestamp: '1h',
    likes: 42,
    comments: 12,
    reposts: 5,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 2,
    author: {
      name: 'John Doe',  
      username: 'johndoe',
      avatar: '',
      verified: true
    },
    content: 'Beautiful morning walk through the city. Sometimes the best inspiration comes from stepping outside and experiencing the world around us ☀️',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    timestamp: '3h',
    likes: 78,
    comments: 5,
    reposts: 8,
    isLiked: true,
    isBookmarked: false
  }
];

const achievements = [
  { title: 'Early Adopter', icon: '🚀', description: 'Joined in the first month' },
  { title: 'Trendsetter', icon: '📈', description: 'Created 5 trending posts' },
  { title: 'Community Builder', icon: '👥', description: '1000+ followers' }
];

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Enhanced Profile Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <button className="absolute top-4 right-4 p-3 bg-black/30 backdrop-blur-sm rounded-xl text-white hover:bg-black/50 transition-all duration-300 group">
            <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button className="absolute top-4 left-4 p-3 bg-black/30 backdrop-blur-sm rounded-xl text-white hover:bg-black/50 transition-all duration-300 group">
            <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  J
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-3 mb-4">
              <Button variant="outline" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
              <Button className="flex items-center space-x-2 hover:scale-105 transition-transform">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                Pro
              </span>
            </div>
            <p className="text-gray-600 mb-1">@johndoe</p>
            <p className="text-gray-800 mb-4 leading-relaxed">
              Full-stack developer passionate about creating amazing user experiences. 
              Love to share knowledge and learn from the community! ✨ Building the future, one line of code at a time.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2 hover:text-purple-600 transition-colors cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-purple-600 transition-colors cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2023</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-purple-600 transition-colors cursor-pointer">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="text-purple-600 hover:underline">johndoe.dev</a>
              </div>
            </div>

            <div className="flex space-x-8 mb-6">
              <div className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200">
                <span className="font-bold text-gray-900 text-lg">1,234</span>
                <span className="text-gray-600 ml-2">Following</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200">
                <span className="font-bold text-gray-900 text-lg">5,678</span>
                <span className="text-gray-600 ml-2">Followers</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200">
                <span className="font-bold text-gray-900 text-lg">89</span>
                <span className="text-gray-600 ml-2">Posts</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {achievement.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{achievement.title}</div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="flex space-x-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        {[
          { id: 'posts', label: 'Posts', count: '89' },
          { id: 'liked', label: 'Liked', count: '234' },
          { id: 'saved', label: 'Saved', count: '45' },
          { id: 'media', label: 'Media', count: '23' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
              activeTab === tab.id 
                ? 'bg-white/20' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      )}

      {(activeTab === 'liked' || activeTab === 'saved' || activeTab === 'media') && (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            No {activeTab} {activeTab === 'media' ? 'files' : 'posts'} yet
          </h3>
          <p className="text-gray-600 mb-6">
            When you {activeTab === 'liked' ? 'like' : activeTab === 'saved' ? 'save' : 'share media in'} posts, they'll appear here
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Start exploring
          </button>
        </div>
      )}
    </div>
  );
};
