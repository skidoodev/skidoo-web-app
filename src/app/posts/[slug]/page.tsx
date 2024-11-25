import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { Post } from "@/components/post";

async function getAllPostSlugs() {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        title
      }`
    );
    return slugs;
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map((post: { slug: string }) => ({
    slug: post.slug
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const post = await client.fetch(
      groq`*[_type == "post" && slug.current == $slug][0]{
        _id,
        title, 
        "slug": slug.current,
        body, 
        mainImage, 
        "categories": categories[]->title, 
        author->{name},
        likes
      }`,
      { slug: params.slug },
      { perspective: "published" }
    );

    if (!post) {
      return notFound();
    }

    return <Post post={post} />;
    
  } catch (error) {
    return notFound();
  }
}