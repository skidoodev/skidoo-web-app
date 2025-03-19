"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn, navLinks } from '@/lib/utils';
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
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

    // Prevent scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [pathname, mobileMenuOpen]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
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
    <>
      {/* Fixed Header */}
      <header
        className={cn(
          "sticky top-0 z-50 flex items-center justify-between bg-gray-50/80 backdrop-blur-md px-4 sm:px-6 md:px-8 lg:px-[50px] 2xl:px-[80px] py-3 2xl:py-4 shadow-md",
          addBorder && "bg-white/90"
        )}>

        <Link href='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex gap-2 items-center">
            <img className="h-[40px] sm:h-[50px] lg:h-[60px] 2xl:h-[72px]" src="/logo.png" alt="Logo" />
            <img className="h-[20px] sm:h-[22px] lg:h-[25px] 2xl:h-[30px]" src="/logo-text.png" alt="Logo Text" />
          </div>
        </Link>

        {/* Desktop & Tablet Navigation */}
        <div className="hidden sm:flex items-center">
          <ul className="flex gap-3 lg:gap-6 xl:gap-[60px] items-center mr-6">
            {navLinks.map((navLink, index) => (
              <li 
                key={index} 
                className={cn(
                  "text-[#404040] text-sm sm:text-base lg:text-lg font-medium hover:scale-105 hover:text-gray-950 cursor-pointer transition",
                  isActiveLink(navLink) && "text-[#5544DF] font-semibold"
                )}
                onClick={() => handleNavigation(navLink)}
              >
                <span>{navLink.name}</span>
              </li>
            ))}
          </ul>
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
              <button className="bg-[#4F49E3] text-white font-medium rounded-sm px-3 py-1 sm:px-4 sm:py-2 hover:scale-105 hover:bg-[#5050E6] transition-all whitespace-nowrap">
                Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button with Animation */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 rounded-full bg-gradient-to-r from-[#8711C1]/10 to-[#2472FC]/10 text-gray-700 focus:outline-none z-[110] relative"
          aria-label="Toggle menu"
        >
          {/* Simple icon swap without complex animations */}
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* Animated Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex flex-col sm:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Add a close button at the top of the mobile menu */}
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gradient-to-r from-[#8711C1]/10 to-[#2472FC]/10 text-gray-700 focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Gradient background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8711C1]/5 via-white to-[#2472FC]/5 z-0">
              <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5"></div>
            </div>
            
            {/* Background animated circles */}
            <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#8711C1]/10 to-transparent blur-3xl z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-[#2472FC]/10 to-transparent blur-3xl z-0"></div>

            {/* Menu content */}
            <div className="flex flex-col flex-grow items-center justify-center relative z-10 px-8">
              {/* Brand mark in the background */}
              <div className="absolute opacity-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[250px]">
                <img src="/logo.png" alt="" className="w-full object-contain" />
              </div>
              
              {/* Navigation items */}
              <nav className="w-full max-w-sm">
                <motion.ul 
                  className="flex flex-col space-y-6 items-center w-full"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {navLinks.map((navLink, index) => (
                    <motion.li 
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="w-full"
                    >
                      <button
                        className={cn(
                          "text-[#404040] text-2xl font-medium w-full text-center py-3 px-6 rounded-lg relative overflow-hidden group",
                          isActiveLink(navLink) && "text-[#5544DF] font-semibold"
                        )}
                        onClick={() => handleNavigation(navLink)}
                      >
                        {/* Hover effect */}
                        <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#8711C1]/5 to-[#2472FC]/5 group-hover:w-full transition-all duration-500 ease-out z-0"></span>
                        
                        {/* Text content */}
                        <span className="relative z-10">{navLink.name}</span>
                        
                        {/* Active indicator */}
                        {isActiveLink(navLink) && (
                          <motion.span
                            layoutId="activeIndicator" 
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[#8711C1] to-[#2472FC]"
                          />
                        )}
                      </button>
                    </motion.li>
                  ))}
                  
                  {isLoaded && (
                    <>
                      {isSignedIn ? (
                        <motion.li 
                          className="w-full pt-6"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                        >
                          <div className="flex flex-col items-center space-y-4">
                            {/* User info */}
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                {user?.imageUrl && (
                                  <img 
                                    src={user.imageUrl} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <span className="text-lg font-medium text-gray-800">
                                {user?.firstName || 'User'}
                              </span>
                            </div>
                            
                            {/* Sign out button */}
                            <button 
                              onClick={() => {
                                // Close the mobile menu first
                                setMobileMenuOpen(false);
                                // Use Clerk's signOut method
                                signOut();
                              }}
                              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-xl rounded-lg py-3 relative overflow-hidden transition-colors"
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                Sign Out
                                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V8z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </motion.li>
                      ) : (
                        <motion.li 
                          className="w-full pt-6"
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                        >
                          <Link href="/sign-up" className="block w-full">
                            <motion.button 
                              className="w-full bg-gradient-to-r from-[#8711C1] to-[#2472FC] text-white font-medium text-xl rounded-lg py-4 relative overflow-hidden"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
                              <span className="relative z-10 flex items-center justify-center">
                                Sign Up 
                                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </motion.button>
                          </Link>
                        </motion.li>
                      )}
                    </>
                  )}
                </motion.ul>
              </nav>
            </div>
            
            {/* Footer with attribution */}
            <div className="p-4 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} TheSkidoo. All rights reserved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}