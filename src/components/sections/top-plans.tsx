import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Post, POSTS_QUERYResult } from 'sanity.types';

const FeaturedPosts = ({ posts }: { posts: POSTS_QUERYResult }) => {
  const topPosts = posts
    .filter(post => post?.mainImage?.asset?._ref)
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);

  return (
    <div className="bg-gray-50 pb-20 mb-12">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex justify-start items-center py-12 lg:pb-16 lg:pt-20">
          <h2 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text">
          Top Plans of the Week
        </h2>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-between">
          {topPosts.map((post) => (
            <Link 
              key={post._id} 
              href={`/posts/${post?.slug?.current}`}
              className="group relative block w-full max-w-[340px] justify-self-center"
            >
              <div className="relative w-full max-w-[340px] p-[3px] bg-gradient-to-r from-[#2472FC]/70 to-[#8711C1]/70 hover:bg-gradient-to-r hover:from-[#8711C1]/100 hover:to-[#2472FC]/100 rounded-2xl shadow-xl hover:shadow-2xl duration-300 transition-all">
                <div className="bg-white rounded-lg p-3">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                    {post?.mainImage?.asset?._ref && (
                      <Image
                        src={urlFor(post.mainImage.asset._ref).width(350).height(467).url()}
                        alt={post.title ?? "Blog image"}
                        fill
                        className="object-cover transition-all group-hover:scale-105 duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm opacity-90">
                          {post.categories?.join(", ")}
                        </p>
                        </div>
                      <h3 className="text-xl font-bold">
                        {post?.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
