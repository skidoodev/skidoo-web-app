"use client";

import Drawer from "@/components/drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuthButton } from "../user-auth-button";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "relative sticky top-0 z-50 bg-backgroud-pop py-2 backdrop-blur",
        addBorder && "bg-backgroud/50",
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="hidden lg:block">
          <div className="flex gap-8">
            <div className="cursor-pointer text-lg font-medium text-[#1C423C] transition hover:scale-105">
              Process
            </div>
            <div className="mr-16 cursor-pointer text-lg font-medium text-[#1C423C] transition hover:scale-105">
              Benefits
            </div>
          </div>
        </div>

        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <span className="text-2xl font-bold text-[#1C423C]">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center ">
            {/* <nav className="mr-10"> <Menu /></nav> */}

            <div className="flex gap-2">
              {/* <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex w-full gap-2 border shadow-[2px_2px_0px_0px_#1C423C] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1C423C] sm:w-auto",
                )}
              >
                Sign up
              </Link> */}
              <UserAuthButton />
              <Link
                href="/quiz"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex w-full gap-2 border shadow-[2px_2px_0px_0px_#1C423C] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#1C423C] sm:w-auto",
                )}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-2 block cursor-pointer lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute bottom-0 w-full transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-90" : "opacity-0",
        )}
      />
    </header>
  );
}
