"use client";

import Drawer from "@/components/drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuthButton } from "../user-auth-button";
import { navLinks } from "@/lib/utils";

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
        "sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-3 backdrop-blur",
        addBorder && "bg-backgroud/50",
      )}
    >
      <Link href='/'>
        <div className="flex gap-2 items-center">
          <img className="h-[60px]" src="/logo.png"></img>
          <img className="h-[25px]" src="/logo-text.png"></img>
        </div>
      </Link>

      <ul className="flex gap-[50px] items-center justify-between">
        {navLinks.map((navLink, index) => (
          <li 
            key={index}
            className="text-gray-800"
          >
            {navLink.name}
          </li>
        ))}
        <li>
          <Link href="/sign-up">
            <button className="bg-backgroud-pop text-white rounded-sm px-[18px] py-[8px]">
              Sign Up
            </button>
          </Link>
        </li>
      </ul>

    </header>
  );
}
