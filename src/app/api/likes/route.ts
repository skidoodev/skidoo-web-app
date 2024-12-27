import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');

  if (!postId || !userId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const post = await client.fetch(`
      *[_type == "post" && _id == $postId][0]{
        "likes": count(*[_type == "like" && post._ref == ^._id]),
        "hasLiked": defined(*[_type == "like" && post._ref == ^._id && userId == $userId][0])
      }
    `, { postId, userId });

    return NextResponse.json({
      likes: post.likes,
      hasLiked: post.hasLiked
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { postId, action, userId } = await request.json();

  if (!postId || !action || !userId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    if (action === 'like') {
      await client.create({
        _type: 'like',
        post: { _type: 'reference', _ref: postId },
        userId
      });
    } else {
      await client.delete({
        query: '*[_type == "like" && post._ref == $postId && userId == $userId]',
        params: { postId, userId }
      });
    }

    const updatedPost = await client.fetch(`
      *[_type == "post" && _id == $postId][0]{
        "likes": count(*[_type == "like" && post._ref == ^._id]),
        "hasLiked": defined(*[_type == "like" && post._ref == ^._id && userId == $userId][0])
      }
    `, { postId, userId });

    return NextResponse.json({
      likes: updatedPost.likes,
      hasLiked: updatedPost.hasLiked
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}