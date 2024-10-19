import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { constructMetadata } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  weight: ["500", "600", "900"],
  subsets: ["latin"],
  display: "swap",
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/sign-in">
      <html lang="en">
        <body
          className={`mx-auto min-h-screen w-full scroll-smooth bg-background font-sans antialiased ${poppins.variable}`}
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
