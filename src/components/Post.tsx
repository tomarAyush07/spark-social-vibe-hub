
import React, { useState } from 'react';
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

interface PostProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export const Post: React.FC<PostProps> = ({
  author,
  content,
  image,
  timestamp,
  likes,
  comments,
  isLiked = false,
  isSaved = false,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    toast.success(liked ? 'Removed from likes' : 'Added to likes');
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
          {author.name.charAt(0)}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900">{author.name}</h3>
          <p className="text-sm text-gray-500">@{author.username} • {timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 leading-relaxed">{content}</p>

      {/* Image */}
      {image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img 
            src={image} 
            alt="Post content" 
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors ${
            liked ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-500 transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm font-medium">{comments}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-500 transition-colors"
        >
          <Share className="w-5 h-5" />
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-yellow-50 transition-colors ${
            saved ? 'text-yellow-500' : 'text-gray-500'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
};
