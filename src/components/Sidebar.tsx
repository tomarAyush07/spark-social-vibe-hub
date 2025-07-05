import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bell, 
  Bookmark, 
  Heart, 
  Search, 
  User, 
  Users,
  Edit,
  Sparkles,
  LogOut
} from 'lucide-react';
import { toast } from './ui/use-toast';
import { AuthModal } from './AuthModal';
import { PostCreateModal } from './PostCreateModal';

const navItems = [
  { name: 'Feed', path: '/feed', icon: Users },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  { name: 'Liked', path: '/liked', icon: Heart },
  { name: 'Profile', path: '/profile', icon: User },
];

export const Sidebar: React.FC<{
  authModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  authMode: 'signin' | 'signup';
  setAuthMode: React.Dispatch<React.SetStateAction<'signin' | 'signup'>>;
  user?: { name: string; email: string } | null;
  logout?: () => void;
  onNewPost?: (post: any) => void;
}> = ({ authModalOpen, setAuthModalOpen, authMode, setAuthMode, user, logout, onNewPost }) => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");

  // Get profile from localStorage for avatar
  const profileData = localStorage.getItem('profileData');
  const profile = profileData ? JSON.parse(profileData) : null;
  
  useEffect(() => {
    // Set initial avatar
    if (profile?.avatar) {
      setUserAvatar(profile.avatar);
    }
    
    // Listen for profile image updates
    const handleProfileImageUpdate = (event: CustomEvent) => {
      setUserAvatar(event.detail.avatar);
    };
    
    window.addEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    };
  }, [profile?.avatar]);

  const handlePostCreated = (post: any) => {
    // Call the parent's onNewPost function
    onNewPost?.(post);
    
    // Show success toast
    toast({
      title: "Post created successfully!",
      description: "Your post has been published.",
    });
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="mb-8">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vibe Social
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Spark your creativity</p>
            </div>
          </div>
          {/* Show user info if logged in */}
          {user && (
            <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-900/20">
              <img src={userAvatar} alt="Handsome Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-200 dark:border-indigo-700 object-cover" />
              <div>
                <div className="font-semibold text-indigo-700 dark:text-indigo-300">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </div>
          )}
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover-lift ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-2">
          {!user && <>
            <button
              className="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 py-3 px-6 rounded-xl font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-200 flex items-center justify-center space-x-2 hover-lift shadow"
              onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
            >
              <span>Sign In</span>
            </button>
            <button
              className="w-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 py-3 px-6 rounded-xl font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-200 flex items-center justify-center space-x-2 hover-lift shadow"
              onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            >
              <span>Sign Up</span>
            </button>
          </>}
          {user && logout && (
            <button
              className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-3 px-6 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 flex items-center justify-center space-x-2 hover-lift shadow"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
        <button 
          className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 hover-lift shadow-lg hover:shadow-xl"
          onClick={() => setPostModalOpen(true)}
        >
          <Edit className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Post Create Modal */}
      <PostCreateModal
        open={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        user={user}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};
