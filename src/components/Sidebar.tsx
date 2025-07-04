
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bell, 
  Bookmark, 
  Heart, 
  Search, 
  User, 
  Users,
  Edit
} from 'lucide-react';

const navItems = [
  { name: 'Feed', path: '/', icon: Users },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  { name: 'Liked', path: '/liked', icon: Heart },
  { name: 'Profile', path: '/profile', icon: User },
];

export const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-purple-100 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
          Vibe Social
        </h1>
        <p className="text-sm text-gray-500">Spark your creativity</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <button className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
        <Edit className="w-5 h-5" />
        <span>New Post</span>
      </button>
    </div>
  );
};
