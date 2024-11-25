import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

export async function clientSanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate,
  tags,
}: {
  query: string;  // Changed from QueryString to string
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    cache: revalidate === false ? undefined : 'force-cache',
    next: {
      revalidate,
      tags,
    },
  });
}