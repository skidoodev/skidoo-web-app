"use client";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const UserAuthButton = () => {
  return (
    <div className="flex justify-center items-center">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex w-full gap-2 border shadow-[2px_2px_0px_0px_#1C423C] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1C423C] sm:w-auto",
          )}
        >
          Sign in
        </Link>
      </SignedOut>
    </div>
  );
};