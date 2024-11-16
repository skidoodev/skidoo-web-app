import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoLocationOutline } from "react-icons/io5";
import { urlFor } from '@/sanity/lib/image';
import { type POSTS_QUERYResult } from "../../sanity.types";
import { BsArrowRight } from 'react-icons/bs';

const FeaturedPosts = ({ posts }: { posts: POSTS_QUERYResult }) => {
  const featuredPosts = posts
    .filter(post => post?.mainImage?.asset?._ref)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 pt-20 pb-40">
      <div className="container mx-auto px-6">
        
        <div className="flex justify-center items-center px-6 py-12 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold text-[#1C423C] sm:text-5xl">FEATURED BLOGS</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredPosts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <Link href={`/posts/${post?.slug?.current}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post?.mainImage?.asset?._ref && (
                    <Image
                      src={urlFor(post.mainImage.asset._ref).width(600).height(450).url()}
                      alt={post.title ?? "Blog image"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post?.title}
                  </h3>
                  {post.categories && (
                    <p className="flex items-center text-base text-gray-600">
                      <IoLocationOutline className="mr-1" />
                      {post.categories.join(", ")}
                    </p>
                  )}
                  {post.author?.name && (
                    <p className="text-base text-gray-500">
                      By {post.author.name}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 lg:mt-10 flex justify-center">
          <Link
            href="/posts"
            className="group my-12 flex items-center justify-center gap-1 rounded-2xl border-2 text-[#1C423C] border-[#1C423C] bg-[#FDCE00] px-6 py-3 text-2xl font-bold shadow-[5px_5px_0px_0px_#1C423C] transition-all hover:scale-110 lg:px-8 lg:py-4"
          >
            READ MORE{" "}
            <BsArrowRight className="transition group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;