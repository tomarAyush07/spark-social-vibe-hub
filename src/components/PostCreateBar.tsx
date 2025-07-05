import React, { useRef, useState, useEffect } from 'react';
import { Image, Smile, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const emojis = ['😀','😂','😍','😎','😭','🔥','🎉','👍','🙏','💡','🚀','❤️','😢','😡','😱'];

export const PostCreateBar: React.FC<{ user?: { name: string; email: string }; onPost?: (post: any) => void }> = ({ user, onPost }) => {
  const [content, setContent] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get profile from localStorage for avatar
  const profileData = localStorage.getItem('profileData');
  const profile = profileData ? JSON.parse(profileData) : null;
  
  useEffect(() => {
    // Set initial avatar
    if (profile?.avatar) {
      setAvatar(profile.avatar);
    }
    
    // Listen for profile image updates
    const handleProfileImageUpdate = (event: CustomEvent) => {
      setAvatar(event.detail.avatar);
    };
    
    window.addEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    };
  }, [profile?.avatar]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEmoji = (emoji: string) => {
    setContent((c) => c + emoji);
    setShowEmojis(false);
  };

  const handlePost = () => {
    if (!content.trim() && !image) {
      toast({ title: 'Cannot post', description: 'Please enter text or add an image.' });
      return;
    }
    // Build new post object
    const profileData = localStorage.getItem('profileData');
    const profile = profileData ? JSON.parse(profileData) : null;
    const author = profile ? {
      name: profile.name,
      username: profile.username,
      avatar: profile.avatar,
      verified: true
    } : {
      name: user?.name || 'You',
      username: user?.email ? user.email.split('@')[0] : 'you',
      avatar: undefined,
      verified: false
    };
    const newPost = {
      id: Date.now(),
      author,
      content,
      image,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isBookmarked: false
    };
    if (onPost) onPost(newPost);
    toast({ title: 'Posted!', description: 'Your post has been created.' });
    setContent('');
    setImage(null);
  };

  const placeholder = user?.name ? `What's on your mind, ${user.name}?` : `What's on your mind?`;

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-slate-700/20 mb-8 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <img src={avatar} alt="User avatar" className="w-10 h-10 rounded-full border-2 border-indigo-400 dark:border-indigo-600 shadow object-cover" />
        <textarea
          className="flex-1 resize-none bg-transparent outline-none text-lg placeholder-gray-400 dark:placeholder-gray-500 min-h-[48px] text-gray-900 dark:text-gray-100"
          placeholder={placeholder}
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={1}
        />
      </div>
      {image && (
        <div className="relative w-32 h-32 mb-2">
          <img src={image} alt="Preview" className="rounded-xl object-cover w-full h-full" />
          <button className="absolute top-1 right-1 bg-white/80 dark:bg-slate-800/80 rounded-full p-1 text-xs" onClick={() => setImage(null)}>✕</button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          <Image className="w-5 h-5" />
        </button>
        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
        <button type="button" onClick={() => setShowEmojis(v => !v)} className="p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400">
          <Smile className="w-5 h-5" />
        </button>
        {showEmojis && (
          <div className="absolute mt-12 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-lg p-2 flex flex-wrap gap-1 z-50">
            {emojis.map(e => (
              <button key={e} className="text-2xl p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded" onClick={() => handleEmoji(e)}>{e}</button>
            ))}
          </div>
        )}
        <div className="flex-1" />
        <button onClick={handlePost} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 font-medium transition-all duration-200">
          <Send className="w-4 h-4" /> Post
        </button>
      </div>
    </div>
  );
}; 