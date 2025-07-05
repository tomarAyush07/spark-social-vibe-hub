import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserAvatarMenu } from "./UserAvatarMenu";
import { TrendingCarousel } from "./TrendingCarousel";
import { AuthModal } from './AuthModal';
import { Bell } from 'lucide-react';
import { QuickActionsBar } from './QuickActionsBar';

export const Layout = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState(null);
  const [logout, setLogout] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleAuth = (user) => {
    setUser(user);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setLogout(true);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setShowLogoutModal(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleNewPost = (post) => {
    // Get profile from localStorage for avatar
    const profileData = localStorage.getItem('profileData');
    const profile = profileData ? JSON.parse(profileData) : null;
    const userAvatar = profile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
    
    // Use the profile avatar for all new posts
    const formattedPost = {
      id: post.id,
      author: {
        name: post.user.name,
        username: post.user.username,
        avatar: userAvatar,
        verified: false
      },
      content: post.content,
      image: post.image,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isBookmarked: false,
      initialComments: [],
      isNew: true
    };
    
    setNewPosts(prev => [formattedPost, ...prev]);
  };

  // Add mock data for Live Now and Recent Activity
  const liveNow = [
    { name: 'Priya Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', status: 'Live: Q&A' },
    { name: 'Liam Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liam&gender=male&mood=happy', status: 'Live: Coding' }
  ];
  const recentActivity = [
    { user: 'Emma Watson', action: 'liked your post', time: '2m' },
    { user: 'James Lee', action: 'commented: "Great work!"', time: '10m' },
    { user: 'Luna Park', action: 'started following you', time: '1h' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30">
      {/* Auth Modal at the top level */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} setMode={setAuthMode} onAuth={handleAuth} />
      {/* Beautiful Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm relative text-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-400">Log out?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to log out? You'll need to sign in again to access your account.</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition" onClick={cancelLogout}>Cancel</button>
              <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition" onClick={confirmLogout}>Log Out</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            authModalOpen={authModalOpen} 
            setAuthModalOpen={setAuthModalOpen} 
            authMode={authMode} 
            setAuthMode={setAuthMode} 
            user={user} 
            logout={handleLogout}
            onNewPost={handleNewPost}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-64">
          <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8">
            <div className="flex justify-end items-center gap-4 mb-4">
              <div className="relative">
                <Bell className="w-7 h-7 text-indigo-500 animate-bounce-slow cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">3</span>
              </div>
              <UserAvatarMenu user={user} />
            </div>
            <Outlet context={{ user, newPosts, setNewPosts }} />
          </div>
        </main>
        
        {/* Center Column - Additional Interactive Content */}
        <div className="hidden xl:block w-80 p-6">
          <div className="sticky top-6 space-y-6 max-h-screen overflow-y-auto scrollbar-hide">
            {/* User Stats Dashboard */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-2xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                Your Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">1.2k</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">847</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Following</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">234</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Posts</div>
                </div>
                <div className="text-center p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">89</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Likes</div>
                </div>
              </div>
            </div>

            {/* Recent Conversations */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Recent Conversations
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', lastMessage: 'Thanks for the help!', time: '2m ago', unread: true },
                  { name: 'Mike Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike&gender=male&mood=happy', lastMessage: 'Great post!', time: '1h ago', unread: false },
                  { name: 'Emma Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', lastMessage: 'See you tomorrow!', time: '3h ago', unread: true },
                  { name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex&gender=male&mood=happy', lastMessage: 'Love your content!', time: '5h ago', unread: false }
                ].map((conversation, i) => (
                  <div key={conversation.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
                    <div className="relative">
                      <img src={conversation.avatar} alt={conversation.name} className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-slate-600 group-hover:scale-110 transition-transform" />
                      {conversation.unread && <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{conversation.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                View all messages
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-800 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl text-left transition-all duration-200 hover:scale-105 flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Create Post</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Share your thoughts</div>
                  </div>
                </button>
                <button className="w-full p-3 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl text-left transition-all duration-200 hover:scale-105 flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Go Live</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Start streaming</div>
                  </div>
                </button>
                <button className="w-full p-3 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl text-left transition-all duration-200 hover:scale-105 flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">Find Friends</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Connect with people</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  { topic: '#TechNews', posts: '2.3k posts', trending: true, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
                  { topic: '#DesignInspiration', posts: '1.8k posts', trending: true, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
                  { topic: '#CodingLife', posts: '956 posts', trending: false, color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
                  { topic: '#CreativeFlow', posts: '1.2k posts', trending: true, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300' }
                ].map((item, i) => (
                  <div key={item.topic} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.topic}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.posts}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.trending && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}>
                        {item.trending ? 'Trending' : 'Popular'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Communities */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Popular Communities
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Design Enthusiasts', members: '12.5k', avatar: '🎨', category: 'Design' },
                  { name: 'Tech Innovators', members: '8.9k', avatar: '💻', category: 'Technology' },
                  { name: 'Creative Writers', members: '6.2k', avatar: '✍️', category: 'Writing' },
                  { name: 'Photography Pros', members: '15.1k', avatar: '📸', category: 'Photography' }
                ].map((community, i) => (
                  <div key={community.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                      {community.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{community.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{community.members} members • {community.category}</div>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg font-medium transition-all duration-200 hover:scale-105">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - Enhanced with more interactivity */}
        <div className="hidden xl:block w-80 p-6">
          <div className="sticky top-6 space-y-6 max-h-screen overflow-y-auto scrollbar-hide">
            <ThemeSwitcher />
            {/* Trending Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Trending Now</h3>
              <TrendingCarousel />
            </div>
            {/* Live Now Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-pink-800 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-pink-600 dark:text-pink-400 mb-4 text-lg flex items-center gap-2">Live Now <span className="animate-pulse w-2 h-2 bg-pink-500 rounded-full"></span></h3>
              <div className="space-y-4">
                {liveNow.map((user, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50/50 dark:hover:bg-pink-900/20 transition-all duration-200 group">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-pink-200 dark:border-pink-700 group-hover:scale-110 transition-transform" />
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">{user.name}</div>
                      <div className="text-xs text-pink-500 dark:text-pink-400">{user.status}</div>
                    </div>
                    <button className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white text-xs rounded-lg font-medium transition-all duration-200 hover:scale-105">Join</button>
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Activity Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-100 dark:border-indigo-800 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-4 text-lg">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all duration-200">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-indigo-700 dark:text-indigo-400">{item.user}</span>
                      <span className="ml-1">{item.action}</span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{item.time} ago</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Enhanced Suggestions */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Who to follow</h3>
              <div className="space-y-4">
                {[
                  { name: 'Alex Johnson', handle: 'alexj', verified: true, mutual: 'Sarah & 3 others', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex&gender=male&mood=happy' },
                  { name: 'Maria Garcia', handle: 'mariag', verified: false, mutual: 'David & 2 others', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria' },
                  { name: 'David Chen', handle: 'davidc', verified: true, mutual: 'Alex & 5 others', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david&gender=male&mood=happy' }
                ].map((user, index) => (
                  <div key={user.name} className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-700 group-hover:scale-110 transition-transform" />
                        {user.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">@{user.handle}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">Followed by {user.mutual}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:scale-105">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm transition-colors">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Quick Actions Bar */}
      <QuickActionsBar />
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center p-2">
          <ThemeSwitcher />
          <UserAvatarMenu user={user} />
        </div>
        <MobileNav />
      </div>
    </div>
  );
};
