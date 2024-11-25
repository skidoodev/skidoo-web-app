// sanity/server-client.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { token } from "./token";
import { draftMode } from "next/headers";

export const serverClient = () => {
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !isDraftMode, // Disable CDN in draft mode
    token: isDraftMode ? token : undefined,
    perspective: isDraftMode ? "previewDrafts" : undefined,
  });
};
