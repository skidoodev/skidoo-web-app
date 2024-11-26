import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import CTA from "@/components/sections/cta";
import Cards from "@/components/sections/cards";
import Testimonails from "@/components/sections/testimonials";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Form from "@/components/sections/quiz-home";
import { Explainer } from "@/components/sections/explainer";
import FeaturedPosts from "@/components/sections/featured-posts";

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

      <Cards />
      <Features />
      <Testimonails />
      <CTA />
      <Footer />
    </main>
  );
}