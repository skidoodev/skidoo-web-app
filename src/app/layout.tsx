import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { constructMetadata } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = constructMetadata({});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <html lang="en">
        <body
          className={`mx-auto transition-all min-h-screen w-full scroll-smooth bg-gray-50 font-sans overflow-x-hidden antialiased ${inter.variable}`}
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
        <GoogleAnalytics gaId="G-DSMSTJGWCW" />
      </html>
    </ClerkProvider>
  );
}
