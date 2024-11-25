'use client';

import React from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { type POST_QUERYResult } from "../../sanity.types";
import { Button } from "./ui/button";
import { IoLocationOutline } from "react-icons/io5";
import { LikeButton } from "./like-button";
import Comments from "./comments";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      
      return (
        <div className="relative w-full aspect-[16/9] my-6">
          <Image
            src={urlFor(value.asset._ref).url()}
            alt={value.alt || "Blog content image"}
            fill
            className="object-cover rounded-lg py-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            quality={90}
          />
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className="my-4">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
  },
};

export function Post({ post }: { post: POST_QUERYResult }) {
  const router = useRouter();
  
  if (!post) {
    return null;
  }

  const { title, mainImage, body } = post;

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="relative w-full h-[90vh] overflow-hidden">
        {mainImage?.asset?._ref && (
          <div className="relative flex w-full h-full">
            <Image
              src={urlFor(mainImage.asset._ref).url()}
              fill
              priority
              alt={title ?? "Blog post image"}
              className="object-cover"
              sizes="100vw"
              quality={100}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

            <div className="absolute top-6 right-6 z-10">
              <LikeButton postId={post._id} initialLikes={post.likes || 0} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mx-auto max-w-4xl text-center text-white">
                {title && (
                  <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                    {title}
                  </h1>
                )}
                {post.categories && (
                  <p className="flex justify-center items-center text-lg font-medium text-gray-200 space-x-2">
                    <IoLocationOutline className="text-xl" />
                    <span>{post.categories.map((category) => category).join(", ")}</span>
                  </p>
                )}
                {post.author?.name && (
                  <p className="text-base font-medium text-gray-300">
                    By <span className="font-semibold">{post.author.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <article className="prose prose-lg max-w-none">
          {body && (
            <PortableText 
              value={body} 
              components={portableTextComponents}
            />
          )}
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