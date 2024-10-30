'use client';

import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from 'next/navigation';
import { type POST_QUERYResult } from "../../sanity.types";
import { Button } from "./ui/button";

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
            <Image
              src={urlFor(mainImage.asset._ref).width(1920).height(1080).url()}
              fill
              priority
              alt={title ?? "Blog post image"}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          </>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          {title && (
            <h1 className="text-5xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
              {title}
            </h1>
          )}
        </div>
      </div>

      {/* Post Body Content */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        <article className="prose prose-lg max-w-none">
          {body && <PortableText value={body} />}
        </article>
      </main>

      <div className="flex justify-center items-center mb-20">
        <Button 
          onClick={() => router.push('/posts')}
          className="mx-auto px-4 py-2 hover:scale-105 transition-all rounded-lg shadow-md"
        >
          &larr; Go Back
        </Button>
      </div>
    </section>
  );
}
