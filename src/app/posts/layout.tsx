// Update the draftMode calls to be properly awaited
import { draftMode } from "next/headers";
import Header from "@/components/sections/header";
import {VisualEditing} from "next-sanity";

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the draft mode status once and reuse it
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body>
        <Header />
        {isDraftMode && (
          <a
            className="fixed bottom-0 right-0 m-4 bg-blue-500 p-4 text-white"
            href="/api/draft-mode/disable"
          >
            Exit Draft Mode
          </a>
        )}
        {children}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
