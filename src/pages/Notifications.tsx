
import React, { useState } from 'react';
import { Heart, MessageSquare, User, Bell, Settings, Check, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Johnson',
    username: 'sarahj',
    action: 'liked your post',
    content: 'Just finished an amazing coding session!',
    timestamp: '2m',
    read: false,
    avatar: 'S'
  },
  {
    id: 2,
    type: 'comment',
    user: 'Alex Chen',
    username: 'alexc',
    action: 'commented on your post',
    content: 'Great work on the new feature!',
    timestamp: '15m',
    read: false,
    avatar: 'A'
  },
  {
    id: 3,
    type: 'follow',
    user: 'Maya Patel',
    username: 'mayap',
    action: 'started following you',
    timestamp: '1h',
    read: true,
    avatar: 'M'
  },
  {
    id: 4,
    type: 'like',
    user: 'David Kim',
    username: 'davidk',
    action: 'liked your post',
    content: 'Beautiful sunset from my balcony today',
    timestamp: '2h',
    read: true,
    avatar: 'D'
  },
  {
    id: 5,
    type: 'mention',
    user: 'Emma Wilson',
    username: 'emmaw',
    action: 'mentioned you in a post',
    content: 'Thanks to @johndoe for the inspiration!',
    timestamp: '3h',
    read: false,
    avatar: 'E'
  }
];

const getNotificationIcon = (type: string) => {
  const iconClass = "w-5 h-5";
  switch (type) {
    case 'like':
      return <Heart className={`${iconClass} text-red-500`} />;
    case 'comment':
      return <MessageSquare className={`${iconClass} text-blue-500`} />;
    case 'follow':
      return <User className={`${iconClass} text-green-500`} />;
    case 'mention':
      return <Bell className={`${iconClass} text-purple-500`} />;
    default:
      return <Bell className={`${iconClass} text-gray-500`} />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'like':
      return 'from-red-400 to-pink-500';
    case 'comment':
      return 'from-blue-400 to-indigo-500';
    case 'follow':
      return 'from-green-400 to-emerald-500';
    case 'mention':
      return 'from-purple-400 to-violet-500';
    default:
      return 'from-gray-400 to-gray-500';
  }
};

export const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notificationList.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notif.read;
    return notif.type === activeFilter;
  });

  const unreadCount = notificationList.filter(notif => !notif.read).length;

  return (
    <div className="pb-20 lg:pb-0">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with your latest activity
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                {unreadCount} new
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllAsRead}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl transition-all duration-300 font-medium hover:scale-105"
          >
            <Check className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
          <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 overflow-x-auto">
        {[
          { id: 'all', label: 'All', count: notificationList.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'like', label: 'Likes', count: notificationList.filter(n => n.type === 'like').length },
          { id: 'comment', label: 'Comments', count: notificationList.filter(n => n.type === 'comment').length },
          { id: 'follow', label: 'Follows', count: notificationList.filter(n => n.type === 'follow').length }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex-shrink-0 flex items-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
            }`}
          >
            <span>{filter.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeFilter === filter.id 
                ? 'bg-white/20' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Enhanced Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
              !notification.read 
                ? 'border-purple-200 bg-gradient-to-r from-purple-50/50 to-indigo-50/50' 
                : 'border-white/20'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getNotificationColor(notification.type)} flex items-center justify-center text-white font-bold shadow-lg`}>
                  {notification.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                      {notification.user}
                    </span>
                    <span className="text-gray-600">{notification.action}</span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Mark as read"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                      title="Delete notification"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                {notification.content && (
                  <p className="text-gray-600 text-sm mb-3 bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                    "{notification.content}"
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{notification.timestamp} ago</p>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium opacity-0 group-hover:opacity-100 transition-all duration-200">
                    View post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Load More */}
      <div className="text-center mt-8">
        <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
          <span className="flex items-center">
            Load Earlier Notifications
            <div className="ml-2 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </span>
        </button>
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Bell className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No notifications yet</h3>
          <p className="text-gray-600 mb-6">When people interact with your posts, you'll see notifications here</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Explore posts
          </button>
        </div>
      )}
    </div>
  );
};
