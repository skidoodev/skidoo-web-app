import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-11-19',
  useCdn: false,
});

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Please sign in to comment' },
      { status: 401 }
    );
  }

  try {
    const { postId, content, createdAt } = await request.json();

    if (!postId || !content || !createdAt) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userResponse = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user details' },
        { status: 500 }
      );
    }

    const userData = await userResponse.json();
    
    const firstName = 
      userData.first_name || 
      userData.firstName || 
      userData.given_name || 
      'Anonymous';
    
    const lastName = 
      userData.last_name || 
      userData.lastName || 
      userData.family_name || 
      '';
    
    const imageUrl = 
      userData.profile_image_url || 
      userData.image_url || 
      userData.profileImageUrl || 
      userData.picture ||
      'https://via.placeholder.com/150';

    const userId_doc = `user-${userId}`;

    // Create user document transaction
    await client
      .transaction()
      .createIfNotExists({
        _type: 'user',
        _id: userId_doc,
        clerkId: userId,
        firstName,
        lastName,
        imageUrl,
      })
      .patch(userId_doc, {
        set: {
          firstName,
          lastName,
          imageUrl,
        },
      })
      .commit();

    // Create comment
    const newComment = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: postId,
      },
      content,
      createdAt,
      author: {
        _type: 'reference',
        _ref: userId_doc
      },
      userDetails: {
        clerkId: userId,
        firstName,
        lastName,
        imageUrl,
      },
    });

    // Revalidate the entire post page to ensure fresh data
    const post = await client.fetch(
      `*[_type == "post" && _id == $postId][0]`,
      { postId }
    );

    if (post?.slug?.current) {
      revalidatePath(`/posts/${post.slug.current}`);
      revalidatePath(`/posts/${post.slug.current}`, 'page');
      revalidatePath(`/posts/${post.slug.current}`, 'layout');
    }

    return NextResponse.json({
      message: 'Comment successfully created',
      commentId: newComment._id,
      comment: newComment
    });
  } catch (error) {
    console.error('Full Error in Comment Creation:', error);
    return NextResponse.json(
      { error: 'Error creating comment. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Please sign in' },
      { status: 401 }
    );
  }

  try {
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json({ error: 'Missing commentId' }, { status: 400 });
    }

    // Fetch the comment to verify ownership and get the post reference
    const comment = await client.fetch(
      `*[_type == "comment" && _id == $commentId][0]{
        userDetails {
          clerkId
        },
        post->{
          _id,
          "slug": slug.current
        }
      }`,
      { commentId }
    );

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    if (comment.userDetails?.clerkId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only delete your own comments' },
        { status: 403 }
      );
    }

    // Delete the comment
    await client.delete(commentId);

    // More comprehensive revalidation
    if (comment.post?.slug) {
      revalidatePath(`/posts/${comment.post.slug}`);
      revalidatePath(`/posts/${comment.post.slug}`, 'page');
      revalidatePath(`/posts/${comment.post.slug}`, 'layout');
    }

    return NextResponse.json({ 
      message: 'Comment successfully deleted',
      success: true
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Error deleting comment. Please try again later.' },
      { status: 500 }
    );
  }
}