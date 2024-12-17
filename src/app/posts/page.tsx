import { Posts } from "@/components/posts";
import { clientSanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export default async function Page() {
  const posts = await clientSanityFetch({
    query: POSTS_QUERY,
  });
  
  return <Posts posts={posts} />;
}
