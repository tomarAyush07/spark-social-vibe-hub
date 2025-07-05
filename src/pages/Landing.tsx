import React, { useState, useEffect } from 'react';
import { AuthModal } from '../components/AuthModal';
import { Users, TrendingUp, MessageCircle, Smile, Heart, MessageSquare, Plus, Bell, User, Download, ChevronDown, CheckCircle, Search, Home, UserPlus, Bookmark, Facebook, Twitter, Instagram } from 'lucide-react';

// --- Mock Data ---
const funFacts = [
  'Connect with people who share your interests.',
  'Discover trending topics and join the conversation.',
  'Share your moments and build your community.',
  'Personalize your profile and make it yours.',
  'Stay up to date with notifications and updates.',
];
const communityAvatars = [
  { src: 'https://randomuser.me/api/portraits/men/32.jpg', online: true },
  { src: 'https://randomuser.me/api/portraits/women/44.jpg', online: false },
  { src: 'https://randomuser.me/api/portraits/men/45.jpg', online: true },
  { src: 'https://randomuser.me/api/portraits/women/65.jpg', online: false },
  { src: 'https://randomuser.me/api/portraits/men/12.jpg', online: true },
  { src: 'https://randomuser.me/api/portraits/women/22.jpg', online: false },
  { src: 'https://randomuser.me/api/portraits/men/78.jpg', online: true },
  { src: 'https://randomuser.me/api/portraits/women/33.jpg', online: false },
];
const trendingHashtags = [
  '#ReactJS', '#VibeSocial', '#Trending', '#Photography', '#Music', '#Tech', '#Art', '#Community', '#Inspiration', '#Now',
];
const stories = [
  { name: 'Alex', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', active: true, online: true },
  { name: 'Maya', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', active: false, online: false },
  { name: 'David', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', active: true, online: true },
  { name: 'Sara', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', active: false, online: false },
  { name: 'John', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', active: false, online: true },
  { name: 'Emma', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', active: true, online: false },
];
const testimonials = [
  {
    name: 'Priya S.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: '“Vibe Social helped me find my tribe and share my creativity. The trending topics are always inspiring!”',
  },
  {
    name: 'Carlos M.',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    text: '“I love how easy it is to connect with new friends and join communities that match my interests.”',
  },
  {
    name: 'Emily R.',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: '“The live feed and stories make every visit exciting. Highly recommend!”',
  },
];
const initialMockPosts = [
  {
    id: 1,
    user: {
      name: 'Alex Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'alexchen',
    },
    content: 'Just joined Vibe Social! Excited to connect with everyone. 🚀',
    image: '',
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    user: {
      name: 'Maya Patel',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'mayap',
    },
    content: 'Loving the new trending topics feature! #Trending',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    likes: 42,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    user: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      username: 'davidk',
    },
    content: 'What are your favorite communities to follow? Drop them below! 👇',
    image: '',
    likes: 18,
    comments: 3,
    liked: false,
  },
];
const suggestedUsers = [
  { name: 'Sara Lee', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', mutual: 3 },
  { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', mutual: 1 },
  { name: 'Emma Watson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', mutual: 2 },
];
const activityFeed = [
  { user: 'Maya', action: 'liked a post', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { user: 'Alex', action: 'started following Sara', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { user: 'David', action: 'commented on a post', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];
const whosOnline = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
  'https://randomuser.me/api/portraits/women/22.jpg',
  'https://randomuser.me/api/portraits/men/78.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
];
const postOfTheDay = {
  user: {
    name: 'Priya S.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    username: 'priyas',
  },
  content: 'Just hit 1,000 followers! Thank you for all the support and love. 💜 #milestone',
  image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
  likes: 120,
  comments: 34,
  reactions: { like: 40, love: 50, laugh: 20, wow: 10 },
};
const appBadges = [
  { src: '/google-play-badge.png', alt: 'Get it on Google Play' },
  { src: '/app-store-badge.png', alt: 'Download on the App Store' },
];
const qrCode = '/qr-placeholder.png';

function useTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

export const Landing: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [factIdx, setFactIdx] = useState(0);
  const [mockPosts, setMockPosts] = useState(initialMockPosts);
  const [userCount, setUserCount] = useState(1234);
  const [hashtagOffset, setHashtagOffset] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [profileProgress, setProfileProgress] = useState(60);
  const [followed, setFollowed] = useState([false, false, false]);
  const [name, setName] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((c) => c + Math.floor(Math.random() * 3 - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setHashtagOffset((o) => (o + 1) % trendingHashtags.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => setFactIdx((i) => (i + 1) % funFacts.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = (id: number) => {
    setMockPosts((posts) =>
      posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };
  const handleComment = (id: number) => {
    setMockPosts((posts) =>
      posts.map((p) =>
        p.id === id ? { ...p, comments: p.comments + 1 } : p
      )
    );
  };
  const handleFollow = (idx: number) => {
    setFollowed(f => f.map((v, i) => (i === idx ? true : v)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-0 overflow-x-hidden">
      {/* Subtle Hero Background SVG */}
      <div className="absolute top-0 left-0 w-full h-96 z-0 pointer-events-none select-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#a5b4fc" fillOpacity="0.18" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
      {/* Main Content Fade-in Wrapper */}
      <div className="w-full flex flex-col items-center pt-32 pb-8 px-2 animate-fade-in">
        <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} setMode={setAuthMode} />
        {/* Notification Bell */}
        <div className="fixed top-6 right-6 z-50">
          <button className="relative" onClick={() => setShowNotif(v => !v)}>
            <Bell className="w-7 h-7 text-indigo-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">3</span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-4 z-50 animate-fade-in">
              <div className="font-semibold text-indigo-700 mb-2">Notifications</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm"><UserPlus className="w-4 h-4 text-indigo-400" /> Alex started following you</div>
                <div className="flex items-center gap-2 text-sm"><Heart className="w-4 h-4 text-pink-400" /> Maya liked your post</div>
                <div className="flex items-center gap-2 text-sm"><MessageSquare className="w-4 h-4 text-indigo-400" /> David commented: "Awesome!"</div>
              </div>
            </div>
          )}
        </div>
        {/* Main Title & Subtitle */}
        <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center justify-center mt-16 mb-4 gap-8 md:gap-12">
          {/* Left: Robot mascot and improved welcome message */}
          <div className="flex flex-col items-center md:items-start flex-1 mb-6 md:mb-0 animate-fade-in-slow">
            <div className="relative flex items-center gap-4">
              <div className="w-44 h-44 animate-robot-float">
                {/* Cute robot SVG illustration */}
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="60" cy="100" rx="32" ry="8" fill="#e0e7ff" />
                  <rect x="28" y="32" width="64" height="56" rx="20" fill="#6366f1" />
                  <rect x="38" y="42" width="44" height="36" rx="12" fill="#fff" />
                  <circle cx="50" cy="60" r="6" fill="#6366f1" />
                  <circle cx="70" cy="60" r="6" fill="#6366f1" />
                  <rect x="54" y="74" width="12" height="4" rx="2" fill="#a5b4fc" />
                  <rect x="54" y="24" width="12" height="12" rx="6" fill="#6366f1" />
                  <rect x="58" y="16" width="4" height="12" rx="2" fill="#6366f1" />
                  <circle cx="60" cy="16" r="2.5" fill="#a5b4fc" />
                  <rect x="24" y="60" width="8" height="20" rx="4" fill="#6366f1" />
                  <rect x="88" y="60" width="8" height="20" rx="4" fill="#6366f1" />
                </svg>
              </div>
              {/* Minimal, bold, gradient welcome message, no background */}
              <div className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 animate-fade-in" style={{lineHeight:'1.2'}}>
                <span role="img" aria-label="wave" className="animate-waving-hand">👋</span>
                Hi, I'm <span className="font-extrabold">Vibo</span>! Welcome to Vibe Social!
              </div>
            </div>
          </div>
          {/* Right: Main headline, subheadline, CTA */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-slow">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent mb-4 hero-headline relative">
              Spark Your Social Vibe
            </h1>
            <p className="text-xl text-gray-700 mb-6 font-medium animate-fade-in">The place to connect, share, and discover what matters to you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-2">
              <button
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-indigo-700 transition flex items-center gap-2 active:scale-95 focus:ring-2 focus:ring-indigo-300 relative group animate-cta-pulse"
                onClick={() => { setAuthMode('signin'); setAuthModalOpen(true); }}
              >
                <Smile className="w-5 h-5 text-white opacity-70" /> Sign In
              </button>
              <button
                className="px-8 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold text-lg shadow-lg hover:bg-purple-200 transition flex items-center gap-2 active:scale-95 focus:ring-2 focus:ring-purple-300 relative group overflow-hidden animate-cta-pulse"
                onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
              >
                <Smile className="w-5 h-5 text-purple-400 opacity-70" /> Sign Up
              </button>
            </div>
            <div className="mt-4 text-sm text-purple-500 font-medium flex items-center justify-center md:justify-start gap-2 animate-fade-in">
              <span className="inline-block">💬</span> {funFacts[factIdx]}
            </div>
            {/* Live user count */}
            <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-gray-500 text-sm font-medium">Currently <span className="font-bold text-indigo-600">{userCount.toLocaleString()}</span> users online</span>
            </div>
          </div>
        </div>
        {/* Social Illustration */}
        <div className="relative z-10 flex justify-center mb-8">
          <img src="/social-illustration.svg" alt="People connecting and sharing" className="w-72 md:w-96 h-auto rounded-2xl shadow-xl border-4 border-white bg-gradient-to-br from-indigo-100 to-purple-100 object-contain" />
        </div>
        {/* Community Avatars Row */}
        <div className="relative z-10 flex items-center justify-center gap-2 mb-6 flex-wrap">
          {communityAvatars.map((a, i) => (
            <div key={i} className="relative">
              <img
                src={a.src}
                alt="Community member avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow -ml-2 first:ml-0 bg-gray-100 object-cover"
                style={{ zIndex: 10 - i }}
              />
              {a.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />}
            </div>
          ))}
          <span className="ml-4 text-gray-600 text-sm font-medium">Join <span className="font-bold text-indigo-600">10,000+</span> members!</span>
        </div>
        {/* Animated Trending Hashtags Carousel */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto max-w-2xl w-full mb-8 pb-2 hide-scrollbar">
          {Array.from({ length: 7 }).map((_, i) => {
            const idx = (hashtagOffset + i) % trendingHashtags.length;
            return (
              <span key={i} className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium text-xs shadow hover:bg-indigo-100 cursor-pointer transition whitespace-nowrap scale-100 hover:scale-105">
                {trendingHashtags[idx]}
              </span>
            );
          })}
        </div>
        {/* Feature Highlights */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-12">
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
            <Users className="w-10 h-10 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Connect</h3>
            <p className="text-gray-500 text-sm">Find and follow friends, creators, and communities that inspire you.</p>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
            <TrendingUp className="w-10 h-10 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Discover</h3>
            <p className="text-gray-500 text-sm">Explore trending topics, stories, and posts tailored to your interests.</p>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group">
            <MessageCircle className="w-10 h-10 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Share</h3>
            <p className="text-gray-500 text-sm">Post your thoughts, photos, and moments with a vibrant community.</p>
          </div>
        </div>
        {/* Stories Row */}
        <div className="relative z-10 flex items-center gap-4 overflow-x-auto max-w-2xl w-full mb-8 pb-2 hide-scrollbar">
          {/* Add Story Button */}
          <div className="flex flex-col items-center cursor-pointer group">
            <div className="w-14 h-14 rounded-full border-4 border-indigo-300 shadow bg-white flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Plus className="w-7 h-7 text-indigo-400" />
            </div>
            <span className="text-xs text-indigo-500 font-medium truncate w-14 text-center">Add Story</span>
          </div>
          {stories.map((story, i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-14 h-14 rounded-full border-4 ${story.active ? 'border-indigo-400' : 'border-gray-200'} shadow bg-white flex items-center justify-center mb-1 group-hover:scale-105 transition-transform relative`}>
                <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                {story.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse" />}
              </div>
              <span className="text-xs text-gray-600 font-medium truncate w-14 text-center">{story.name}</span>
            </div>
          ))}
        </div>
        {/* Feed Preview Section */}
        <div className="relative z-10 w-full max-w-2xl mb-12">
          <div className="bg-white/90 rounded-2xl shadow-lg p-6">
            {/* New Post Bar (disabled) */}
            <div className="flex items-center gap-3 mb-6">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Your avatar" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" />
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="What's on your mind? (Demo only)"
                disabled
              />
              <button className="bg-indigo-500 text-white rounded-full px-4 py-2 font-semibold text-sm shadow hover:bg-indigo-600 transition cursor-not-allowed opacity-60" disabled>Post</button>
            </div>
            <h2 className="font-bold text-lg mb-4 text-indigo-700">Live Feed Preview</h2>
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <div key={post.id} className="flex gap-3 items-start border-b border-gray-100 pb-4 last:border-b-0">
                  <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{post.user.name}</span>
                      <span className="text-xs text-gray-400">@{post.user.username}</span>
                    </div>
                    <div className="text-gray-700 text-sm mb-1">{post.content}</div>
                    {post.image && <img src={post.image} alt="post" className="rounded-lg w-full max-w-xs mb-2" />}
                    <div className="flex gap-4 text-xs text-gray-400 mt-1">
                      <button
                        className={`flex items-center gap-1 group ${post.liked ? 'text-pink-500' : 'hover:text-pink-400'}`}
                        onClick={() => handleLike(post.id)}
                        style={{ outline: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        tabIndex={0}
                      >
                        <Heart className={`w-4 h-4 transition-transform ${post.liked ? 'scale-125 animate-heart-pop' : ''}`} /> {post.likes}
                      </button>
                      <button
                        className="flex items-center gap-1 group hover:text-indigo-500"
                        onClick={() => handleComment(post.id)}
                        style={{ outline: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        tabIndex={0}
                      >
                        <MessageSquare className="w-4 h-4" /> {post.comments}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Testimonials/Stats Section */}
        <div className="relative z-10 w-full max-w-4xl mb-12">
          <h2 className="font-bold text-xl mb-6 text-center text-indigo-700">What our users say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-indigo-100 mb-2 object-cover" />
                <p className="text-gray-700 text-sm mb-2">{t.text}</p>
                <span className="font-semibold text-indigo-600 text-sm">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Footer with links and social icons */}
        <footer className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6 bg-white/80 border-t border-gray-200 mt-8">
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="#privacy" className="hover:text-indigo-600 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition"><Facebook className="w-5 h-5" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition"><Twitter className="w-5 h-5" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition"><Instagram className="w-5 h-5" /></a>
          </div>
          <div className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Vibe Social. All rights reserved.</div>
        </footer>
        {/* Animations */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1); }
          @keyframes heart-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
          }
          .animate-heart-pop { animation: heart-pop 0.4s; }
          .animate-pulse { animation: pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-bounce { animation: bounce 1.2s infinite; }
          @keyframes robot-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-robot-float { animation: robot-float 2.5s ease-in-out infinite; }
          @keyframes waving-arm {
            0%, 100% { transform: rotate(0deg); }
            20% { transform: rotate(-18deg); }
            40% { transform: rotate(12deg); }
            60% { transform: rotate(-18deg); }
            80% { transform: rotate(8deg); }
          }
          .animate-waving-arm { transform-origin: 20px 70px; animation: waving-arm 1.8s infinite; }
          @keyframes waving-hand {
            0%, 100% { transform: rotate(0deg); }
            20% { transform: rotate(18deg); }
            40% { transform: rotate(-12deg); }
            60% { transform: rotate(18deg); }
            80% { transform: rotate(-8deg); }
          }
          .animate-waving-hand { display: inline-block; animation: waving-hand 1.8s infinite; transform-origin: 70% 70%; }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 8s ease-in-out infinite;
          }
          @keyframes gradient-move {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 5s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 6s ease-in-out infinite; }
          .animate-float-4 { animation: float-4 4.5s ease-in-out infinite; }
          .animate-float-5 { animation: float-5 5.5s ease-in-out infinite; }
          @keyframes float-1 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
          @keyframes float-2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(10px);} }
          @keyframes float-3 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
          @keyframes float-4 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(14px);} }
          @keyframes float-5 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-16px);} }
          .animate-fade-in-slow { animation: fade-in 1.8s cubic-bezier(0.4,0,0.2,1); }
          .sparkle-burst {
            background: radial-gradient(circle, #fbbf24 0%, #a5b4fc 40%, transparent 70%);
            opacity: 0.7;
            border-radius: 9999px;
            transform: translate(-50%,-50%) scale(0.2);
            animation: sparkle-burst 0.7s cubic-bezier(0.4,0,0.2,1);
            z-index: 10;
          }
          @keyframes sparkle-burst {
            0% { opacity: 0.7; transform: translate(-50%,-50%) scale(0.2); }
            60% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%,-50%) scale(1.4); }
          }
          .speech-bubble-modern {
            border-bottom-left-radius: 2.5rem !important;
            border-top-right-radius: 2.5rem !important;
            border-bottom-right-radius: 1.5rem !important;
            border-top-left-radius: 1.5rem !important;
            border: 1.5px solid #a5b4fc33;
            box-shadow: 0 2px 12px #a5b4fc22;
          }
          .robot-badge {
            box-shadow: 0 2px 8px #a5b4fc22;
            letter-spacing: 0.01em;
            margin-top: 0.5rem;
          }
          .speech-bubble-pointer {
            position: relative;
            box-shadow: 0 4px 24px #a5b4fc22;
            border-bottom-left-radius: 2.5rem !important;
            border-top-right-radius: 2.5rem !important;
            border-bottom-right-radius: 1.5rem !important;
            border-top-left-radius: 1.5rem !important;
            border: 1.5px solid #a5b4fc33;
          }
        `}</style>
      </div>
    </div>
  );
}; 