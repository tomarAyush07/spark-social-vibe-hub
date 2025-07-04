
import React, { useState } from 'react';
import { Edit, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import { Post } from '@/components/Post';
import { Button } from '@/components/Button';

const userPosts = [
  {
    author: {
      name: 'You',
      username: 'yourhandle',
      avatar: ''
    },
    content: 'Just shared my latest project! Excited to see what everyone thinks. Building in public has been such an amazing journey 🚀',
    timestamp: '1h',
    likes: 42,
    comments: 12,
    isLiked: false
  },
  {
    author: {
      name: 'You',  
      username: 'yourhandle',
      avatar: ''
    },
    content: 'Beautiful morning walk through the city. Sometimes the best inspiration comes from stepping outside and experiencing the world around us ☀️',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    timestamp: '3h',
    likes: 78,
    comments: 5
  }
];

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="pb-20 lg:pb-0">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 mb-8 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 relative">
          <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-lg text-white hover:bg-opacity-70 transition-all">
            <Edit className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                J
              </div>
            </div>
            <Button variant="outline" className="mb-4">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">John Doe</h1>
            <p className="text-gray-600 mb-3">@johndoe</p>
            <p className="text-gray-800 mb-4">
              Full-stack developer passionate about creating amazing user experiences. 
              Love to share knowledge and learn from the community! ✨
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Joined March 2023</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="text-purple-600 hover:underline">johndoe.dev</a>
              </div>
            </div>

            <div className="flex space-x-6">
              <div>
                <span className="font-bold text-gray-900">1,234</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">5,678</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-white rounded-xl p-1 shadow-sm border border-purple-100">
        {[
          { id: 'posts', label: 'Posts' },
          { id: 'liked', label: 'Liked' },
          { id: 'saved', label: 'Saved' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'posts' && (
        <div>
          {userPosts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      )}

      {(activeTab === 'liked' || activeTab === 'saved') && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {activeTab} posts yet
          </h3>
          <p className="text-gray-600">
            When you {activeTab === 'liked' ? 'like' : 'save'} posts, they'll appear here
          </p>
        </div>
      )}
    </div>
  );
};
