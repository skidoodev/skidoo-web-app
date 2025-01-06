"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn, navLinks } from '@/lib/utils';
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }

      if (pathname === '/') {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          const aboutPosition = aboutSection.offsetTop - 100;
          if (window.scrollY >= aboutPosition) {
            setActiveSection('about');
          } else {
            setActiveSection('home');
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavigation = (navLink: { name: string; href: string }) => {
    if (navLink.name === 'Home') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
      return;
    }

    if (navLink.name === 'About') {
      if (pathname !== '/') {
        window.location.href = '/#about';
      } else {
        const section = document.getElementById('about');
        section?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.location.href = navLink.href;
  };

  const isActiveLink = (navLink: { name: string; href: string }) => {
    if (pathname === '/') {
      if (navLink.name === 'Home') return activeSection === 'home';
      if (navLink.name === 'About') return activeSection === 'about';
    } else {
      return navLink.href !== '/' && pathname === navLink.href;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between bg-gray-50 px-[50px] 2xl:px-[80px] py-3 2xl:py-4 backdrop-blur shadow-2xl",
        addBorder && "bg-background/50"
      )}>

      <Link href='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
              isActiveLink(navLink) && "text-[#5544DF] font-semibold"
            )}
            onClick={() => handleNavigation(navLink)}
          >
            <span>{navLink.name}</span>
          </li>
        ))}
        <li>
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          ) : isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full hover:scale-105 transition-all"
                }
              }}
            />
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