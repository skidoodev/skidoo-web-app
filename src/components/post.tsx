'use client';

import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { type POST_QUERYResult } from "../../sanity.types";
import { Button } from "./ui/button";
import { IoLocationOutline } from "react-icons/io5";
import { LikeButton } from "./like-button";
import Comments from "./comments";

export function Post({ post }: { post: POST_QUERYResult }) {
  const router = useRouter();
  if (!post) {
    return null;
  }

  const { title, mainImage, body } = post;

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="relative h-[75vh] w-full overflow-hidden">
        {mainImage?.asset?._ref && (
          <>
            <div className="relative flex w-full h-[300px] sm:h-[75vh]">
              {/* Blog Image */}
              <Image
                src={urlFor(mainImage.asset._ref).width(1920).height(1080).url()}
                fill
                priority
                alt={title ?? "Blog post image"}
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

              {/* Like Button - Top-Right Corner */}
              <div className="absolute top-4 right-4 z-10">
                <LikeButton postId={post._id} initialLikes={post.likes || 0} />
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl">
            {title && (
              <div className="flex items-center justify-center gap-4">
                <h1 className="mb-2 text-4xl font-bold text-center text-white md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </div>
            )}
            {post.categories && (
              <p className="flex justify-center items-center text-xl font-medium text-center text-gray-200">
                <IoLocationOutline className="mr-1" />
                {post.categories.map((category) => category).join(", ")}
              </p>
            )}
            {post.author?.name && (
              <p className="text-lg font-medium text-center text-gray-300">
                By {post.author.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <article className="prose prose-lg max-w-none">
          {body && <PortableText value={body} />}
        </article>
      </main>

      <Comments postId={post._id} />

      <div className="flex justify-center items-center mb-20">
        <Button
          onClick={() => router.push("/posts")}
          className="mx-auto px-4 py-2 hover:scale-105 transition-all rounded-lg shadow-md"
        >
          &larr; Go Back
        </Button>
      </div>
    </section>
  );
}