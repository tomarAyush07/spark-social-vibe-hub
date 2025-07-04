
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Search, User, Users, Edit } from 'lucide-react';

const navItems = [
  { name: 'Feed', path: '/', icon: Users },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Post', path: '/create', icon: Edit },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Profile', path: '/profile', icon: User },
];

export const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-4 py-2 z-50">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-500'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
