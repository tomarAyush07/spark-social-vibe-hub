import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Post } from '@/components/Post';
import { Plus, Sparkles, TrendingUp } from 'lucide-react';
import { PostCreateBar } from '@/components/PostCreateBar';
import { PostSkeleton } from '@/components/PostSkeleton';

const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      verified: true
    },
    content: 'Just finished an amazing coding session! Built a new feature for our social platform. The satisfaction of seeing clean code come together is unmatched 💻✨ #coding #webdev',
    timestamp: '2h',
    likes: 24,
    comments: 8,
    reposts: 3,
    isLiked: true,
    isBookmarked: false,
    initialComments: [
      'Awesome work, Sarah! 🚀',
      'Congrats on shipping!'
    ]
  },
  {
    id: 2,
    author: {
      name: 'Alex Chen',
      username: 'alexc',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      verified: false
    },
    content: 'Beautiful sunset from my balcony today. Sometimes we need to pause and appreciate the simple moments in life 🌅',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    timestamp: '4h',
    likes: 156,
    comments: 23,
    reposts: 12,
    isLiked: false,
    isBookmarked: true,
    initialComments: [
      'Stunning view!',
      'Love this photo!'
    ]
  },
  {
    id: 3,
    author: {
      name: 'Maya Patel',
      username: 'mayap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
      verified: true
    },
    content: 'Excited to share that I just launched my first mobile app! 🚀 It\'s been months of hard work, late nights, and countless cups of coffee. Thank you to everyone who supported me on this journey!',
    timestamp: '6h',
    likes: 89,
    comments: 15,
    reposts: 8,
    isLiked: false,
    isBookmarked: true,
    initialComments: [
      'Congrats Maya! 🎉',
      'So proud of you!'
    ]
  },
  {
    id: 4,
    author: {
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      verified: false
    },
    content: 'Working on some UI designs for a new project. Love how modern interfaces can be both beautiful and functional. What do you think makes a great user experience?',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    timestamp: '8h',
    likes: 67,
    comments: 12,
    reposts: 5,
    isLiked: true,
    isBookmarked: false,
    initialComments: [
      'Clean and simple is best!',
      'UI looks great, David.'
    ]
  },
  {
    id: 5,
    author: {
      name: 'Priya Singh',
      username: 'priyasingh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      verified: true
    },
    content: 'Just got back from a hiking trip in the mountains. Nature is the best therapy! 🏞️',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
    timestamp: '10h',
    likes: 45,
    comments: 7,
    reposts: 2,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'Looks so peaceful!',
      'Glad you had a great time!'
    ]
  },
  {
    id: 6,
    author: {
      name: 'Liam Brown',
      username: 'liamb',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liam',
      verified: false
    },
    content: 'Started learning React and I\'m loving it so far! Any tips for a beginner?',
    timestamp: '12h',
    likes: 32,
    comments: 5,
    reposts: 1,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'Keep practicing!',
      'Check out the official docs.'
    ]
  }
];

// Add mock data for following and trending tabs
const followingPosts = [
  {
    id: 101,
    author: {
      name: 'Emma Watson',
      username: 'emmaw',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      verified: true
    },
    content: 'Had a wonderful brunch with friends today! 🥞☕️',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop',
    timestamp: '1h',
    likes: 12,
    comments: 3,
    reposts: 1,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'Looks delicious!',
      'Wish I was there!'
    ]
  },
  {
    id: 102,
    author: {
      name: 'James Lee',
      username: 'jamesl',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      verified: false
    },
    content: 'Just finished a 10k run! 🏃‍♂️ Feeling great!',
    timestamp: '2h',
    likes: 8,
    comments: 2,
    reposts: 0,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'Congrats James!',
      'Impressive pace!'
    ]
  }
];

const trendingPosts = [
  {
    id: 201,
    author: {
      name: 'Luna Park',
      username: 'lunap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luna',
      verified: true
    },
    content: 'My artwork just got featured in a magazine! 🎨📰',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop',
    timestamp: '30m',
    likes: 34,
    comments: 6,
    reposts: 2,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'Congrats Luna!',
      'So proud of you!'
    ]
  },
  {
    id: 202,
    author: {
      name: 'Ryan Smith',
      username: 'ryans',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryan',
      verified: false
    },
    content: 'Check out my new music track! 🎵🔥',
    timestamp: '1h',
    likes: 27,
    comments: 4,
    reposts: 1,
    isLiked: false,
    isBookmarked: false,
    initialComments: [
      'This is fire! 🔥',
      'On repeat!'
    ]
  }
];

// Stories system
const initialStories = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    },
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    timestamp: '1h',
  },
  {
    id: 2,
    user: {
      name: 'Alex Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    },
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    timestamp: '2h',
  },
  {
    id: 3,
    user: {
      name: 'Maya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
    },
    text: 'Excited for the weekend! 🎉',
    timestamp: '3h',
  },
];

export const Feed = () => {
  const { user, newPosts, setNewPosts } = useOutletContext() as { 
    user?: { name: string; email: string };
    newPosts?: any[];
    setNewPosts?: (posts: any[]) => void;
  };
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [stories, setStories] = useState(initialStories);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [showAddStory, setShowAddStory] = useState(false);
  const [newStoryImage, setNewStoryImage] = useState('');
  const [newStoryText, setNewStoryText] = useState('');

  // Use user info for 'Your Story' and new post bar
  const yourName = user?.name || 'You';
  
  // Get profile from localStorage for avatar
  const profileData = localStorage.getItem('profileData');
  const profile = profileData ? JSON.parse(profileData) : null;
  const yourAvatar = profile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";

  // Combine new posts with existing posts
  const allPosts = [...(newPosts || []), ...posts];

  // Map posts to use profile avatar if author matches user
  const mappedPosts = allPosts.map(post => {
    if (user && profile && post.author.username === profile.username) {
      return {
        ...post,
        author: {
          ...post.author,
          avatar: profile.avatar,
        }
      };
    }
    return post;
  });

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
      // Simulate no more posts for empty state demo
      setPosts([]);
    }, 1500);
  };

  const handleStoryClick = (story) => {
    setActiveStory(story);
    setShowStoryModal(true);
  };

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStoryImage && !newStoryText) return;
    const profileData = localStorage.getItem('profileData');
    const profile = profileData ? JSON.parse(profileData) : null;
    let newStory;
    if (newStoryImage) {
      newStory = {
        id: Date.now(),
        user: {
          name: profile?.name || yourName,
          avatar: profile?.avatar || yourAvatar,
        },
        image: newStoryImage,
        timestamp: 'now',
      };
    } else if (newStoryText) {
      newStory = {
        id: Date.now(),
        user: {
          name: profile?.name || yourName,
          avatar: profile?.avatar || yourAvatar,
        },
        text: newStoryText,
        timestamp: 'now',
      };
    }
    if (newStory) {
      setStories([
        ...stories,
        newStory,
      ]);
    }
    setShowAddStory(false);
    setNewStoryImage('');
    setNewStoryText('');
  };

  return (
    <div className="pb-20 lg:pb-0">
      {/* Enhanced Header with Interactive Elements */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Your Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Discover what's happening in your network</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 transition-all duration-200 hover:scale-105">
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 transition-all duration-200 hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 dark:border-slate-700/20">
          {[
            { id: 'all', label: 'All Posts', count: '234' },
            { id: 'following', label: 'Following', count: '89' },
            { id: 'trending', label: 'Trending', count: '12' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <span>{filter.label}</span>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                activeFilter === filter.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Stories Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-white/90 to-indigo-50/50 dark:from-slate-800/90 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Stories
        </h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {/* Add Story Button */}
          <div className="flex-shrink-0 text-center cursor-pointer group" onClick={() => setShowAddStory(true)}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-all duration-300">
                <img src={yourAvatar} alt={yourName} className="w-14 h-14 rounded-full object-cover" />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 block font-medium">Your Story</span>
          </div>
          {/* Other Stories */}
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 text-center cursor-pointer group" onClick={() => handleStoryClick(story)}>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-all duration-300">
                  {story.user.avatar ? (
                    <img src={story.user.avatar} alt={story.user.name} className="w-14 h-14 rounded-full object-cover" />
                  ) : (
                    story.user.name.charAt(0)
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 block font-medium">{story.user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col relative">
            <button className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl" onClick={() => setShowStoryModal(false)}>&times;</button>
            <div className="p-6 flex flex-col items-center">
              {activeStory.image && <img src={activeStory.image} alt="Story" className="rounded-xl mb-4 max-h-60 object-contain" />}
              {activeStory.text && <div className="text-lg text-gray-800 dark:text-gray-200 mb-4">{activeStory.text}</div>}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-9 h-9 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">
                  {activeStory.user.avatar ? <img src={activeStory.user.avatar} alt={activeStory.user.name} className="w-9 h-9 rounded-full object-cover" /> : activeStory.user.name.charAt(0)}
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{activeStory.user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{activeStory.timestamp} ago</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col relative">
            <button className="absolute top-3 right-3 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl" onClick={() => setShowAddStory(false)}>&times;</button>
            <form onSubmit={handleAddStory} className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Add to Your Story</h3>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => setNewStoryImage(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Say something..."
                value={newStoryText}
                onChange={e => setNewStoryText(e.target.value)}
                rows={3}
              />
              {newStoryImage && <img src={newStoryImage} alt="Preview" className="rounded-xl max-h-40 object-contain" />}
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-200">Share Story</button>
            </form>
          </div>
        </div>
      )}

      {/* Posts with Enhanced Interactivity */}
      <PostCreateBar user={user} onPost={newPost => setPosts([newPost, ...posts])} />
      <div className="space-y-6">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : mappedPosts.length === 0 && activeFilter === 'all' ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img src="https://illustrations.popsy.co/gray/social-media.svg" alt="No posts" className="w-40 mb-6 opacity-80" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">No posts yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Start the conversation by creating your first post!</p>
          </div>
        ) : activeFilter === 'following' ? (
          followingPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))
        ) : activeFilter === 'trending' ? (
          trendingPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))
        ) : (
          mappedPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))
        )}
      </div>

      {/* Enhanced Load More Section */}
      <div className="text-center mt-8">
        <button
          className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          onClick={handleLoadMore}
          disabled={loadingMore || mappedPosts.length === 0}
        >
          {loadingMore ? (
            <span className="flex items-center">
              <span className="mr-2">Loading</span>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            </span>
          ) : (
            <span>Load More Posts</span>
          )}
        </button>
      </div>
    </div>
  );
};
