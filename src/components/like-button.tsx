'use client';
import { useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";

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

  // Fetch current likes and user's like status
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`/api/likes?postId=${postId}&userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch likes');
        const data = await response.json();
        setLikes(data.likes);
        setIsLiked(data.hasLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikeStatus();
  }, [postId, userId]);

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

      setLikes(result.likes);
      setIsLiked(result.hasLiked);
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