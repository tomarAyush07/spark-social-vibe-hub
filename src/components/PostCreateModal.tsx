import React, { useState, useRef, useEffect } from 'react';
import { X, Image, Smile, MapPin, Users, Globe, Lock, Send } from 'lucide-react';

interface PostCreateModalProps {
  open: boolean;
  onClose: () => void;
  user?: { name: string; email: string; avatar?: string } | null;
  onPostCreated?: (post: any) => void;
}

export const PostCreateModal: React.FC<PostCreateModalProps> = ({
  open,
  onClose,
  user,
  onPostCreated
}) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAvatar, setUserAvatar] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  if (!open) return null;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: {
          name: user?.name || 'Anonymous',
          avatar: userAvatar,
          username: user?.email?.split('@')[0] || 'user'
        },
        content: content.trim(),
        image: selectedImage,
        privacy,
        likes: 0,
        comments: 0,
        liked: false,
        timestamp: new Date().toISOString(),
        isNew: true
      };

      onPostCreated?.(newPost);
      setContent('');
      setSelectedImage(null);
      setPrivacy('public');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar}
              alt="Handsome Avatar"
              className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-700 object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Anonymous'}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => setPrivacy('public')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                    privacy === 'public' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  Public
                </button>
                <button
                  onClick={() => setPrivacy('friends')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                    privacy === 'friends' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  Friends
                </button>
                <button
                  onClick={() => setPrivacy('private')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                    privacy === 'private' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  Private
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="p-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full min-h-[120px] p-4 border border-gray-200 dark:border-slate-600 rounded-xl focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
              maxLength={1000}
            />
            
            {selectedImage && (
              <div className="mt-4 relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
              
              <button
                type="submit"
                disabled={(!content.trim() && !selectedImage) || isSubmitting}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}; 