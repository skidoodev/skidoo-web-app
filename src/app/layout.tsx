import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  weight: ["500", "600", "900"], // Customize the weights you need
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
    <html lang="en">
      <body
        className={`mx-auto min-h-screen w-full scroll-smooth bg-background font-sans antialiased ${poppins.variable}`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
