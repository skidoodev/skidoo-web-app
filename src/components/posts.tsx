'use client';
import { useState } from "react";
import { type POSTS_QUERYResult } from "../../sanity.types";
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { LikeButton } from "./like-button";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Posts({ posts: initialPosts }: { posts: POSTS_QUERYResult }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const titleMatches = post.title?.toLowerCase().includes(lowercasedSearchTerm);
    const authorMatches = post.author?.name?.toLowerCase().includes(lowercasedSearchTerm);
    const categoriesMatch = post.categories?.some((category) =>
      category?.toLowerCase().includes(lowercasedSearchTerm)
    );

    return titleMatches || authorMatches || categoriesMatch;
  });

  return (
    <section className="relative pb-12 bg-[url('/background.png')] bg-bottom bg-no-repeat bg-contain">
      <div className="relative py-[100px] bg-gradient-to-r from-[#8711C1] to-[#2472FC] mb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/bg-blog.png"
            alt="background"
            quality={100}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 2xl:px-24">
          <h1 className="text-4xl font-open font-bold lg:text-5xl 2xl:text-6xl text-white">
            Blogs
          </h1>
          <input
            type="text"
            placeholder="Search blogs, authors, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 sm:mt-0 w-full sm:w-[730px] 2xl:w-[900px] py-2 px-6 focus:border-transparent text-[#000000] transition-all duration-300 relative border border-gray-300 font-medium text-lg rounded-md"
          />
        </div>
      </div>

      {/* Post Cards */}
      <div className="sm:px-16 2xl:px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-12 relative z-20">
        {filteredPosts.map((post) => (
          <Link 
            key={post._id} 
            href={`/posts/${post?.slug?.current}`} 
            className="relative w-full max-w-[350px] max-h-[480px] p-[3px] bg-gradient-to-r from-[#2472FC] to-[#8711C1] rounded-2xl shadow-xl hover:shadow-2xl duration-300 transition-all justify-self-center flex"
          >
            <div
              className="flex flex-col bg-white rounded-lg overflow-hidden border-[1px] border-transparent transition-all w-full"
            >
              <div className="block group bg-white rounded-lg p-3 flex-grow">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  {post?.mainImage?.asset?._ref && (
                    <Image
                      src={urlFor(post.mainImage.asset._ref).width(600).height(450).url()}
                      alt={post.title ?? "Blog image"}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-4 flex flex-col">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{post?.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {post.categories ? post.categories.join(", ") : "Uncategorized"}
                  </p>
                  <p className="text-sm text-gray-400 mt-auto">
                    By {post.author?.name || "Unknown Author"}
                  </p>
                </div>
              </div>
              <div>
                <div className="absolute bottom-4 right-4">
                  <LikeButton postId={post._id} initialLikes={post.likes || 0} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center items-center mt-20 relative z-20">
        <Button
          onClick={() => router.push("/")}
          className="mx-auto font-medium bg-[#8711C1] hover:bg-[#8711C1] text-white px-4 py-2 hover:scale-105 transition-all rounded-lg shadow-md hover:shadow-xl"
        >
          &larr; Go Back
        </Button>
      </div>
    </section>
  );
}
