
import React from 'react';
import { Heart, MessageSquare, User, Bell } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Johnson',
    username: 'sarahj',
    action: 'liked your post',
    content: 'Just finished an amazing coding session!',
    timestamp: '2m',
    read: false
  },
  {
    id: 2,
    type: 'comment',
    user: 'Alex Chen',
    username: 'alexc',
    action: 'commented on your post',
    content: 'Great work on the new feature!',
    timestamp: '15m',
    read: false
  },
  {
    id: 3,
    type: 'follow',
    user: 'Maya Patel',
    username: 'mayap',
    action: 'started following you',
    timestamp: '1h',
    read: true
  },
  {
    id: 4,
    type: 'like',
    user: 'David Kim',
    username: 'davidk',
    action: 'liked your post',
    content: 'Beautiful sunset from my balcony today',
    timestamp: '2h',
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="w-5 h-5 text-red-500" />;
    case 'comment':
      return <MessageSquare className="w-5 h-5 text-blue-500" />;
    case 'follow':
      return <User className="w-5 h-5 text-green-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export const Notifications = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your latest activity</p>
        </div>
        <button className="text-purple-600 hover:text-purple-700 font-medium">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
              !notification.read ? 'border-purple-200 bg-purple-50' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {notification.user.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getNotificationIcon(notification.type)}
                  <span className="font-semibold text-gray-900">
                    {notification.user}
                  </span>
                  <span className="text-gray-600">{notification.action}</span>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                
                {notification.content && (
                  <p className="text-gray-600 text-sm mb-2">"{notification.content}"</p>
                )}
                
                <p className="text-sm text-gray-500">{notification.timestamp} ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors font-medium">
          Load Earlier Notifications
        </button>
      </div>
    </div>
  );
};
