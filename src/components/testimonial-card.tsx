"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  quote: string;
  rating: number;
  image: string;
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Hrishikesh Mane",
    profession: "SDE (AWS)",
    quote: "TheSkidoo transformed my travel experience! They crafted a perfect itinerary that matched my love for food and adventure. Every recommendation was spot on! I discovered hidden gems I would have never found on my own. I cant wait to book my next trip with them!",
    rating: 5,
    image: "/hrishi.jpeg",
  }
];

export const TestimonialCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );
  
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
  
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Only enable auto-scroll if there are multiple testimonials
    if (testimonialData.length <= 1 || !isVisible || isHovered) return;

    timerRef.current = setTimeout(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % testimonialData.length
        );
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isHovered, isVisible]);

  const handleSliderClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  const testimonial = testimonialData[currentIndex]!;

  return (
    <section 
      ref={componentRef}
      className="relative w-full max-w-full sm:max-w-4xl overflow-x-hidden"
      onMouseEnter={testimonialData.length > 1 ? () => setIsHovered(true) : undefined}
      onMouseLeave={testimonialData.length > 1 ? () => setIsHovered(false) : undefined}
    >
      {/* Image positioned outside for better visibility */}
      <div className="relative z-20 mx-auto w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] mb-[-60px] sm:mb-[-70px]">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <Image
            quality={100}
            height={150}
            width={140}
            src={testimonial.image}
            alt={testimonial.name}
            className="rounded-full border-2 shadow-xl border-white w-full h-full object-cover"
          />
        </div>
      </div>

      <div 
        className={`
          w-full border-4 border-white bg-gradient-to-r from-[#8711C1] to-[#2472FC] 
          relative pt-[65px] sm:pt-[75px] min-h-[350px] sm:min-h-[320px] hover:shadow-2xl shadow-xl transition-all duration-300 
          rounded-2xl hover:scale-[1.02] mb-4
          ${isAnimating ? 'animate-slide-out' : 'animate-slide-in'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 pointer-events-none z-10 rounded-2xl"></div>

        <div className="relative h-full z-20 flex flex-col justify-between pb-4 sm:pb-8">
          <div>
            <div className="flex justify-start pl-4 sm:pl-8">
              <Image
                quality={100}
                height={64}
                width={80}
                src={"/quote.png"}
                alt={"quote"}
                className="h-10 w-12 sm:h-16 sm:w-20"
              />
            </div>

            <p className="text-base sm:text-lg text-white text-center pt-4 px-4 sm:px-8 md:px-16 overflow-hidden">
              {testimonial.quote}
            </p>
          </div>

          {/* Footer section with name, profession and stars */}
          <div className="px-4 sm:px-8 md:px-16 pt-4 mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-col items-center sm:items-start mb-2 sm:mb-0">
              <div className="text-lg sm:text-xl font-bold text-white">
                {testimonial.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                {testimonial.profession}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(testimonial.rating)].map((_, index) => (
                <Image
                  key={index}
                  quality={100}
                  height={20}
                  width={22}
                  src={"/star.png"}
                  alt={"star"}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
              ))}
              {[...Array(5 - testimonial.rating)].map((_, index) => (
                <Image
                  key={index}
                  quality={100}
                  height={20}
                  width={22}
                  src={"/unstar.png"}
                  alt={"unstar"}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
              ))}
            </div>
          </div>

          <div className="absolute opacity-40 bottom-0 left-0 w-full">
            <Image 
              src={"/t-background.png"} 
              alt={"background"} 
              width={900}  
              height={100}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideOut {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-out {
          animation: slideOut 0.5s ease-in-out;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-in-out;
        }
      `}</style>

      {/* Hide plane animation on small screens, show simplified version */}
      <div className="hidden sm:flex justify-between items-center pt-2 px-4">
        <div className="flex items-center gap-3">
          <Image
            quality={100}
            height={40}
            width={45}
            src={"/foot1.png"}
            alt={"Plane"}
          />
          <div className="w-[100px] md:w-[200px] lg:w-[400px]">
            <Image
              quality={100}
              src={"/foot2.png"}
              alt={"Dotted line"}
              width={400}
              height={2}
              className="w-full h-auto"
            />
          </div>
        </div>
        {testimonialData.length > 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2 bottom-[22px]">
            {testimonialData.map((_, index) => (
              <div
                key={index}
                onClick={() => handleSliderClick(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index ? "bg-[#5048E2] w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="w-[100px] md:w-[200px] lg:w-[400px]">
            <Image
              quality={100}
              src={"/foot3.png"}
              alt={"Dotted line"}
              width={425}
              height={2}
              className="w-full h-auto"
            />
          </div>
          <Image
            quality={100}
            height={36}
            width={20}
            src={"/foot4.png"}
            alt={"Location"}
          />
        </div>
      </div>
      
      {/* Mobile pagination dots */}
      {testimonialData.length > 1 && (
        <div className="sm:hidden flex justify-center mt-4">
          {testimonialData.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSliderClick(index)}
              className={`h-2 mx-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index ? "bg-[#5048E2] w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};