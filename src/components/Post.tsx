
import React, { useState } from 'react';
import { Heart, MessageSquare, Repeat2, Bookmark, Share, MoreHorizontal } from 'lucide-react';

interface PostProps {
  id?: number;
  author: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export const Post: React.FC<PostProps> = ({
  author,
  content,
  image,
  timestamp,
  likes: initialLikes,
  comments,
  reposts = 0,
  isLiked = false,
  isBookmarked = false
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [reposted, setReposted] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleRepost = () => {
    setReposted(!reposted);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              author.name.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                {author.name}
              </h3>
              {author.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">@{author.username} • {timestamp}</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 min-w-[160px]">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Copy link
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Report post
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                Block user
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{content}</p>
        
        {image && (
          <div className="mt-4 rounded-2xl overflow-hidden bg-gray-100">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              liked 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 p-2 rounded-xl text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 hover:scale-110">
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">{comments}</span>
          </button>
          
          <button 
            onClick={handleRepost}
            className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              reposted 
                ? 'text-green-500 bg-green-50 hover:bg-green-100' 
                : 'text-gray-500 hover:text-green-500 hover:bg-green-50'
            }`}
          >
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm font-medium">{reposts}</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              bookmarked 
                ? 'text-purple-500 bg-purple-50 hover:bg-purple-100' 
                : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-2 rounded-xl text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-300 hover:scale-110">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
