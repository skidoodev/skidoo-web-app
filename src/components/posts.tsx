'use client';
import { useState } from "react";
import { type POSTS_QUERYResult } from "../../sanity.types";
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { IoLocationOutline } from "react-icons/io5";
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
    <div className="container mx-auto p-4"> 
      <h1 className="text-4xl font-semibold py-4">Blogs</h1>

      <input
        type="text"
        placeholder="Search blogs, authors, or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 border border-gray-300 rounded-md"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredPosts.map((post) => (
          <div key={post._id}>
            <Link
              className="block hover:scale-105 transition-all"
              href={`/posts/${post?.slug?.current}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                {post?.mainImage?.asset?._ref && (
                  <Image
                    src={urlFor(post.mainImage.asset._ref).width(600).height(450).url()}
                    alt={post.title ?? "Blog image"}
                    fill
                    className="object-cover shadow-lg group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-2 flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-900 text-left">
                  {post?.title}
                </h2>
                <LikeButton postId={post._id} initialLikes={post.likes || 0} />
              </div>
              {post.categories && (
                <p className="flex items-center text-base font-medium text-left text-gray-600">
                  <IoLocationOutline className="mr-1" />
                  {post.categories.join(", ")}
                </p>
              )}
              {post.author?.name && (
                <p className="text-base text-gray-400">By {post.author.name}</p>
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-12">
        <Button
          onClick={() => router.push("/")}
          className="mx-auto px-4 py-2 hover:scale-105 transition-all rounded-lg shadow-md"
        >
          &larr; Go Back
        </Button>
      </div>
    </div>
  );
}