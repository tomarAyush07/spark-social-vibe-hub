import React, { useState } from 'react';

const likedPosts = [
  {
    id: 1,
    user: 'Sarah Johnson',
    username: 'sarahj',
    content: 'Just finished an amazing coding session! #coding #webdev',
    timestamp: '2h',
    avatar: '/male-avatar.png',
  },
  {
    id: 2,
    user: 'Alex Chen',
    username: 'alexc',
    content: 'Beautiful sunset from my balcony today. #sunset #inspiration',
    timestamp: '4h',
    avatar: '/male-avatar.png',
  },
  {
    id: 3,
    user: 'Priya Patel',
    username: 'priyap',
    content: 'Excited to start my new job next week! #career #newbeginnings',
    timestamp: '1d',
    avatar: '/female-avatar.png',
  },
  {
    id: 4,
    user: 'John Doe',
    username: 'johndoe',
    content: 'Reading a fascinating book on AI. #reading #AI',
    timestamp: '3d',
    avatar: '/male-avatar.png',
  },
  {
    id: 5,
    user: 'Maria Garcia',
    username: 'mariag',
    content: 'Had a great time hiking this weekend! #nature #hiking',
    timestamp: '5d',
    avatar: '/female-avatar.png',
  },
];

const Liked = () => {
  const [posts, setPosts] = useState(likedPosts);

  const handleRemove = (id) => {
    setPosts(posts => posts.filter(post => post.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Liked Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven't liked any posts yet.</p>
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

export default Liked; 