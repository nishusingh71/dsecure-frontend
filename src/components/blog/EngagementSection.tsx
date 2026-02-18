import React, { useState, useEffect } from 'react';

interface EngagementSectionProps {
  blogId: string;
}

const EngagementSection: React.FC<EngagementSectionProps> = ({ blogId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);

  useEffect(() => {
    // Load engagement data from localStorage
    const storedLikes = localStorage.getItem(`blog_likes_${blogId}`);
    const storedDislikes = localStorage.getItem(`blog_dislikes_${blogId}`);
    const storedReaction = localStorage.getItem(`blog_user_reaction_${blogId}`) as 'like' | 'dislike' | null;
    
    if (storedLikes) setLikes(parseInt(storedLikes));
    if (storedDislikes) setDislikes(parseInt(storedDislikes));
    if (storedReaction) setUserReaction(storedReaction);
  }, [blogId]);

  const handleLike = () => {
    if (userReaction === 'like') {
      // Remove like
      setLikes(prev => prev - 1);
      setUserReaction(null);
      localStorage.setItem(`blog_likes_${blogId}`, (likes - 1).toString());
      localStorage.removeItem(`blog_user_reaction_${blogId}`);
    } else if (userReaction === 'dislike') {
      // Switch from dislike to like
      setDislikes(prev => prev - 1);
      setLikes(prev => prev + 1);
      setUserReaction('like');
      localStorage.setItem(`blog_likes_${blogId}`, (likes + 1).toString());
      localStorage.setItem(`blog_dislikes_${blogId}`, (dislikes - 1).toString());
      localStorage.setItem(`blog_user_reaction_${blogId}`, 'like');
    } else {
      // Add like
      setLikes(prev => prev + 1);
      setUserReaction('like');
      localStorage.setItem(`blog_likes_${blogId}`, (likes + 1).toString());
      localStorage.setItem(`blog_user_reaction_${blogId}`, 'like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      // Remove dislike
      setDislikes(prev => prev - 1);
      setUserReaction(null);
      localStorage.setItem(`blog_dislikes_${blogId}`, (dislikes - 1).toString());
      localStorage.removeItem(`blog_user_reaction_${blogId}`);
    } else if (userReaction === 'like') {
      // Switch from like to dislike
      setLikes(prev => prev - 1);
      setDislikes(prev => prev + 1);
      setUserReaction('dislike');
      localStorage.setItem(`blog_likes_${blogId}`, (likes - 1).toString());
      localStorage.setItem(`blog_dislikes_${blogId}`, (dislikes + 1).toString());
      localStorage.setItem(`blog_user_reaction_${blogId}`, 'dislike');
    } else {
      // Add dislike
      setDislikes(prev => prev + 1);
      setUserReaction('dislike');
      localStorage.setItem(`blog_dislikes_${blogId}`, (dislikes + 1).toString());
      localStorage.setItem(`blog_user_reaction_${blogId}`, 'dislike');
    }
  };

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-center gap-4">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            userReaction === "like"
              ? "bg-green-600 text-white shadow-lg scale-105"
              : "bg-slate-100 text-slate-700 hover:bg-green-50 hover:text-green-600 hover:shadow-md"
          }`}
          onClick={handleLike}
          aria-label="Like this article"
        >
          <svg
            viewBox="0 0 24 24"
            fill={userReaction === "like" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span>{likes > 0 ? likes : "Like"}</span>
        </button>

        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            userReaction === "dislike"
              ? "bg-red-600 text-white shadow-lg scale-105"
              : "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:shadow-md"
          }`}
          onClick={handleDislike}
          aria-label="Dislike this article"
        >
          <svg
            viewBox="0 0 24 24"
            fill={userReaction === "dislike" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 transform rotate-180"
            aria-hidden="true"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span>{dislikes > 0 ? dislikes : "Dislike"}</span>
        </button>
      </div>
    </div>
  );
};

export default EngagementSection;
