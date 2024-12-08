"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn, navLinks } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { isSignedIn, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }

      const sections = document.querySelectorAll("section");
      let currentSection = "Home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection.charAt(0).toUpperCase() + currentSection.slice(1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between bg-gray-50 px-[60px] 2xl:px-[80px] py-3 2xl:py-4 backdrop-blur shadow-2xl",
        addBorder && "bg-background/50"
      )}
    >
      <Link href="/">
        <div className="flex gap-2 items-center">
          <img className="h-[60px] 2xl:h-[72px]" src="/logo.png" alt="Logo" />
          <img className="h-[25px] 2xl:h-[30px]" src="/logo-text.png" alt="Logo Text" />
        </div>
      </Link>

      <ul className="flex gap-[60px] items-center justify-between">
        {navLinks.map((navLink, index) => (
          <li
            key={index}
            className={cn(
              "text-[#404040] text-lg font-medium hover:scale-105 hover:text-gray-950 cursor-pointer transition",
              activeSection === navLink.name && "text-[#5544DF] font-semibold"
            )}
          >
            {navLink.href === "/about" ? (
              <span onClick={() => scrollToSection("about")}>{navLink.name}</span>
            ) : (
              <Link href={navLink.href}>{navLink.name}</Link>
            )}
          </li>
        ))}
        <li>
          {isSignedIn ? (
            <button
              onClick={() => signOut()}
              className="bg-[#4F49E3] text-white font-medium rounded-sm px-[20px] py-[8px] hover:scale-105 hover:bg-[#5050E6]  transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/sign-up">
              <button className="bg-[#4F49E3] text-white font-medium rounded-sm px-[20px] py-[8px] hover:scale-105 hover:bg-[#5050E6] transition-all">
                Sign Up
              </button>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}
