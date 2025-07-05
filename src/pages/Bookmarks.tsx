import React, { useState } from 'react';

const bookmarkedPosts = [
  {
    id: 1,
    user: 'David Kim',
    username: 'davidk',
    content: 'Working on some UI designs for a new project. #ui #design',
    timestamp: '3h',
    avatar: '/male-avatar.png',
  },
  {
    id: 2,
    user: 'Emma Wilson',
    username: 'emmaw',
    content: 'Thanks to @johndoe for the inspiration! #community',
    timestamp: '5h',
    avatar: '/male-avatar.png',
  },
  {
    id: 3,
    user: 'Liam Smith',
    username: 'liams',
    content: 'Just finished a marathon! #running #fitness',
    timestamp: '2d',
    avatar: '/male-avatar.png',
  },
  {
    id: 4,
    user: 'Olivia Brown',
    username: 'oliviab',
    content: 'Baked some delicious cookies today. #baking #yum',
    timestamp: '4d',
    avatar: '/female-avatar.png',
  },
  {
    id: 5,
    user: 'Noah Lee',
    username: 'noahl',
    content: 'Exploring new music genres. Any recommendations? #music',
    timestamp: '1w',
    avatar: '/male-avatar.png',
  },
];

const Bookmarks = () => {
  const [posts, setPosts] = useState(bookmarkedPosts);

  const handleRemove = (id) => {
    setPosts(posts => posts.filter(post => post.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't bookmarked any posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="bg-white rounded-lg shadow p-4 flex items-center">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full mr-4" />
              <div className="flex-1">
                <div className="font-semibold">{post.user} <span className="text-gray-400 text-sm">@{post.username}</span></div>
                <div className="text-gray-700 text-sm">{post.content}</div>
                <div className="text-xs text-gray-400 mt-1">{post.timestamp} ago</div>
              </div>
              <button onClick={() => handleRemove(post.id)} className="ml-4 text-red-500 hover:underline">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks; 