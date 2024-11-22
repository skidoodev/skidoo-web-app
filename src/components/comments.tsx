"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { clientSanityFetch } from '@/sanity/lib/client';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { groq } from 'next-sanity';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from './ui/dialog';

type CommentDisplay = {
  _id: string;
  content: string;
  createdAt: string;
  isPending?: boolean;
  user?: {
    clerkId?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  };
};

export function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentDisplay[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const [slug, setSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await clientSanityFetch<CommentDisplay[]>({
        query: groq`*[_type == "comment" && post._ref == $postId] | order(createdAt desc) {
          _id,
          content,
          createdAt,
          "user": {
            "clerkId": userDetails.clerkId,
            "firstName": userDetails.firstName,
            "lastName": userDetails.lastName,
            "imageUrl": userDetails.imageUrl
          }
        }`,
        params: { postId },
      });

      // Remove any pending comments that might have been successfully added
      setComments(prevComments => {
        const newComments = fetchedComments || [];
        return newComments.filter(fetchedComment => 
          !prevComments.some(pendingComment => 
            pendingComment.isPending && pendingComment.content === fetchedComment.content
          )
        );
      });
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
      
      try {
        const fetchedSlug = await clientSanityFetch<string>({
          query: groq`*[_type == "post" && _id == $postId][0].slug.current`,
          params: { postId },
        });
        setSlug(fetchedSlug);
      } catch (error) {
        console.error('Failed to load post slug:', error);
      }
    };

    fetchData();
  }, [postId, fetchComments]);

  const submitComment = async () => {
    if (!newComment.trim() || isSubmitting || !user) return;
  
    setIsSubmitting(true);
  
    // Create an optimistic comment with a pending flag
    const optimisticComment: CommentDisplay = {
      _id: `pending-${Date.now()}`,
      content: newComment,
      createdAt: new Date().toISOString(),
      isPending: true,
      user: {
        clerkId: userId || undefined,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        imageUrl: user.imageUrl || undefined,
      },
    };

    // Immediately add the optimistic comment
    setComments(prevComments => [optimisticComment, ...prevComments]);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          createdAt: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }

      // Clear the input and reset submission state
      setNewComment('');
      
      // Refetch comments to ensure we have the server-side ID and remove the pending state
      await fetchComments();
      
    } catch (error) {
      // Remove the optimistic comment
      setComments(prevComments => 
        prevComments.filter(comment => comment._id !== optimisticComment._id)
      );
      
      alert(error instanceof Error ? error.message : 'Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!commentToDelete) return;
    setIsDeleting(true);
    setIsDialogOpen(false);
  
    try {
      const response = await fetch('/api/comments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId: commentToDelete }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete comment');
      }
  
      // Immediately remove the comment from local state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentToDelete)
      );
      
      // Refetch comments to ensure consistency with backend
      await fetchComments();
      
    } catch (error) {
      // Refetch comments in case of error to restore any deleted comments
      await fetchComments();
      
      alert(error instanceof Error ? error.message : 'Failed to delete comment. Please try again.');
    } finally {
      setIsDeleting(false);
      setCommentToDelete(null);
    }
  };

  const getDisplayName = (user?: {
    firstName?: string;
    lastName?: string;
  }) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.lastName) {
      return user.lastName;
    }
    return 'Anonymous';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">COMMENTS</h2>
      
      {!isSignedIn ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">You must be signed in to post comments</p>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl={`/posts/${slug}`}
            signUpFallbackRedirectUrl={`/posts/${slug}`}
          >
            <Button className="mx-auto">Sign In to Post a Comment</Button>
          </SignInButton>
        </div>
      ) : (
        <>
          <div className="rounded-lg mb-6 flex justify-center align-middle items-center space-x-4">
            <Textarea 
              placeholder="Write a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
              disabled={isSubmitting}
            />
            <Button 
              onClick={submitComment} 
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-500">Loading comments...</div>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div 
                  key={comment._id} 
                  className={`bg-white shadow-md rounded-lg p-4 relative ${comment.isPending ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    {comment.user?.imageUrl && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={comment.user.imageUrl}
                          alt={getDisplayName(comment.user)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow min-w-0 mr-2">
                          <span className="font-medium block truncate">
                            {getDisplayName(comment.user)}
                          </span>
                          <p className="text-gray-700 text-sm break-words">{comment.content}</p>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0 ml-2">
                          <span className="text-sm text-gray-500 whitespace-nowrap mb-2">
                            {new Date(comment.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          {isSignedIn && comment.user?.clerkId === userId && !comment.isPending && (
                            <Dialog open={isDialogOpen && commentToDelete === comment._id} onOpenChange={(open) => {
                              setIsDialogOpen(open);
                              if (!open) setCommentToDelete(null);
                            }}>
                              <DialogTrigger asChild>
                                <button 
                                  className="mt-1"
                                  onClick={() => setCommentToDelete(comment._id)}
                                  disabled={isDeleting}
                                >
                                  <Trash2 className="mr-2 h-6 w-6 text-red-600"/>
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete your comment.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button 
                                    variant="destructive" 
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                  >
                                    {isDeleting ? 'Deleting...' : 'Delete Comment'}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {comment.isPending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm text-gray-500">Posting...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Comments;