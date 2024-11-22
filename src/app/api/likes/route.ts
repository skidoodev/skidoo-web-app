import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-11-19',
  useCdn: false,
})

export async function PATCH(request: Request) {
  try {
    const { postId, action, userId } = await request.json()
    
    // First get the current post data
    const post = await client.getDocument(postId)
    
    // Get current likes and likeHistory
    const currentLikes = post?.likes || 0
    const likeHistory: string[] = post?.likeHistory || [] // Explicitly define likeHistory as a string array
    
    // Check if user has already liked
    const hasLiked = likeHistory.includes(userId)
    
    // If trying to like but already liked, or trying to unlike but hasn't liked, return current state
    if ((action === 'like' && hasLiked) || (action === 'unlike' && !hasLiked)) {
      return NextResponse.json({ 
        likes: currentLikes,
        hasLiked,
        message: 'No change needed'
      })
    }
    
    // Update likes count and history
    const newLikes = action === 'like' ? currentLikes + 1 : Math.max(0, currentLikes - 1)
    const newLikeHistory = action === 'like' 
      ? [...likeHistory, userId]
      : likeHistory.filter((id: string) => id !== userId) // Explicitly type the `id` as a string
    
    // Update the document
    const result = await client
      .patch(postId)
      .set({ 
        likes: newLikes,
        likeHistory: newLikeHistory
      })
      .commit()

    return NextResponse.json({
      likes: newLikes,
      hasLiked: action === 'like',
      message: 'Successfully updated'
    })
  } catch (error) {
    console.error('Error updating likes:', error)
    return NextResponse.json({ error: 'Error updating likes' }, { status: 500 })
  }
}
