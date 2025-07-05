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

export const Post: React.FC<PostProps & { initialComments?: string[] }> = ({
  author,
  content,
  image,
  timestamp,
  likes: initialLikes,
  comments,
  reposts = 0,
  isLiked = false,
  isBookmarked = false,
  initialComments = []
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [reposted, setReposted] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showMenu, setShowMenu] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentList, setCommentList] = useState<string[]>(initialComments);
  const [showComments, setShowComments] = useState(false);

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setCommentList([...commentList, commentInput.trim()]);
      setCommentInput('');
    }
  };

  const handleCommentClick = () => setShowComments((v) => !v);

  const firstLiker = author.name === 'Sarah Johnson' ? 'Alex Chen' : 'Sarah Johnson'; // Example logic
  const othersCount = Math.max(0, likes - 1);

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/20 hover:shadow-xl transition-all duration-300 group">
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
              <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors">
                {author.name}
              </h3>
              {author.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{author.username} • {timestamp}</p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50 min-w-[160px]">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                Copy link
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                Report post
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                Block user
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4" onDoubleClick={handleLike} style={{ cursor: 'pointer' }}>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{content}</p>
        
        {image && (
          <div className="mt-4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-700">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        )}
        {/* Instagram-style like display */}
        {likes > 0 && (
          <div className="mt-3 mb-1 text-sm text-gray-700 dark:text-gray-300">
            Liked by <span className="font-semibold">{firstLiker}</span>
            {othersCount > 0 && (
              <> and <span className="font-semibold">{othersCount} other{othersCount > 1 ? 's' : ''}</span></>
            )}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              liked 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50' 
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          
          <button
            onClick={handleCommentClick}
            className="flex items-center space-x-2 p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-110"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">{commentList.length}</span>
          </button>
          
          <button 
            onClick={handleRepost}
            className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              reposted 
                ? 'text-green-500 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50' 
                : 'text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
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
                ? 'text-purple-500 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50' 
                : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 hover:scale-110">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modal for comments */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col max-h-[80vh] relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowComments(false)}>
              &times;
            </button>
            <div className="p-6 pb-20 overflow-y-auto flex-1">
              <h3 className="text-lg font-bold mb-4 text-indigo-700">Comments</h3>
              {commentList.length === 0 && <div className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</div>}
              {commentList.map((c, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">username</div>
                    <div className="text-gray-700 text-sm bg-gray-50 rounded-lg px-3 py-2 mt-1">{c}</div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddComment} className="flex items-center gap-2 p-4 border-t bg-white rounded-b-2xl sticky bottom-0">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-sm"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-200">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
