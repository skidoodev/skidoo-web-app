import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { Features } from "@/components/sections/features";
import CTA from "@/components/sections/cta";
import Cards from "@/components/sections/cards";
import Form from "@/components/sections/home-form";
import Testimonails from "@/components/sections/testimonials";
import FeaturedPosts from "@/components/featured-posts";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

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
      <div className="mt-[60px]">
        <Form />
      </div> 
      <div className="bg-background">
        <Steps />
        <Features />
        <FeaturedPosts posts={posts} />
      </div>
      <Cards />
      <Testimonails />
      <CTA />
      <Footer />
    </main>
  );
}