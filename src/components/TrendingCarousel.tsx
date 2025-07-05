import React from 'react';

const trending = [
  { tag: '#VibeCheck', posts: '12.5K', trend: '+15%' },
  { tag: '#TechTrends', posts: '8.3K', trend: '+8%' },
  { tag: '#MondayMotivation', posts: '15.2K', trend: '+23%' },
  { tag: '#CreativeLife', posts: '6.7K', trend: '+12%' },
  { tag: '#InspireDaily', posts: '9.1K', trend: '+18%' }
];

export const TrendingCarousel: React.FC = () => (
  <div className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-4 animate-scroll-x">
      {trending.map((item) => (
        <div key={item.tag} className="min-w-[180px] group cursor-pointer p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-indigo-50/70 dark:hover:bg-indigo-900/30 transition-all duration-200 shadow border border-white/20 dark:border-slate-700/20">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                {item.tag}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{item.posts} posts</div>
            </div>
            <div className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
              {item.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes scroll-x {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll-x {
        animation: scroll-x 20s linear infinite;
        width: max-content;
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  </div>
); 