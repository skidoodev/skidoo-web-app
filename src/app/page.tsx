import Header from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import Features from "@/components/sections/features";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Form from "@/components/sections/quiz-home";
import { Explainer } from "@/components/sections/explainer";
import FeaturedPosts from "@/components/sections/top-plans";

async function getPosts() {
  const posts = await client.fetch(POSTS_QUERY);
  return posts;
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <main>
      <Header />
      <Hero />
      <Form />   
      <FeaturedPosts posts={posts} />
      <Explainer />
      <Features />
      <About />
    </main>
  );
}