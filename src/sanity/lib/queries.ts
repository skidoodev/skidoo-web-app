import { defineQuery } from "next-sanity";
import { groq } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...12]{
    _id, 
    title, 
    slug, 
    mainImage, 
    "categories": categories[]->title, 
    author->{name},
    likes
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0]{
    _id,
    title, 
    body, 
    mainImage, 
    "categories": categories[]->title, 
    author->{name},
    likes
}`);

export const POST_COMMENTS_QUERY = groq`
  *[_type == "comment" && post._ref == $postId] | order(createdAt desc) {
    _id,
    content,
    createdAt,
    "user": {
      "clerkId": userDetails.clerkId,
      "firstName": userDetails.firstName,
      "lastName": userDetails.lastName,
      "imageUrl": userDetails.imageUrl
    }
  }
`;

export const POST_SLUG_QUERY = defineQuery(`*[_type == "post" && _id == $postId && defined(publishedAt) && publishedAt <= now()][0].slug.current`);