'use client';

import { type POSTS_QUERYResult } from "../../sanity.types";
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-4xl font-semibold py-4">Blogs</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post._id}>
            <Link
              className="block hover:scale-105 transition-all"
              href={`/posts/${post?.slug?.current}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              {post?.mainImage?.asset?._ref && (
                <Image
                  src={urlFor(post.mainImage.asset._ref).width(600).height(450).url()}
                  alt={post.title ?? "Blog image"}
                  fill
                  className="object-cover shadow-lg rounded-md group-hover:scale-105"
                />
              )}
              </div>
              <h2 className='mt-2 text-xl font-semibold text-gray-900 text-center'>
                {post?.title}
              </h2>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
}


