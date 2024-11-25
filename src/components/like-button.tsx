'use client';
import { useState, useEffect } from "react";
import { Heart, HeartIcon } from "lucide-react";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liking, setLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [userId] = useState(() => {
    if (typeof window === 'undefined') return '';
    
    const stored = localStorage.getItem('userId');
    if (stored) return stored;
    
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newId);
    return newId;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem('likedPosts');
    if (stored) {
      const likedPosts = JSON.parse(stored);
      setIsLiked(!!likedPosts[postId]);
    }
  }, [postId]);

  const handleLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (liking) return;

    setLiking(true);
    const action = isLiked ? 'unlike' : 'like';

    try {
      const response = await fetch('/api/likes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, action, userId }),
      });

      if (!response.ok) throw new Error('Failed to update likes');
      
      const result = await response.json();

      // Update likes count
      setLikes(result.likes);

      // Update liked state
      setIsLiked(result.hasLiked);
      
      // Update localStorage
      const stored = localStorage.getItem('likedPosts');
      const likedPosts = stored ? JSON.parse(stored) : {};
      likedPosts[postId] = result.hasLiked;
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLiking(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 ${
        liking ? 'opacity-50' : ''
      } ${isLiked ? 'scale-105' : ''}`}
      disabled={liking}
      aria-label={isLiked ? "Unlike post" : "Like post"}
    >
      <HeartIcon
        className={`w-5 h-5 transition-colors duration-200 ${
          isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }`}
      />
      {likes > 0 && (
        <span className="text-sm text-gray-500">{likes}</span>
      )}
    </button>
  );
}