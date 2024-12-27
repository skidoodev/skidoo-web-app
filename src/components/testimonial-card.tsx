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
      className="relative"
      onMouseEnter={testimonialData.length > 1 ? () => setIsHovered(true) : undefined}
      onMouseLeave={testimonialData.length > 1 ? () => setIsHovered(false) : undefined}
    >
      <div 
        className={`
          max-w-5xl border-4 border-white bg-gradient-to-r from-[#8711C1] to-[#2472FC] 
          relative h-[21rem] hover:shadow-2xl shadow-xl transition-all duration-300 
          rounded-2xl hover:scale-105 mb-4
          ${isAnimating ? 'animate-slide-out' : 'animate-slide-in'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 pointer-events-none z-10 rounded-2xl"></div>

        <div className="absolute z-10 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-3xl p-[1px]">
            <Image
              quality={100}
              height={150}
              width={180}
              src={testimonial.image}
              alt={testimonial.name}
              className="rounded-3xl border-2 shadow-xl border-white"
            />
          </div>
        </div>

        <div className="relative h-full z-20">
          <div className="flex justify-start pl-8 pt-8">
            <Image
              quality={100}
              height={64}
              width={80}
              src={"/quote.png"}
              alt={"quote"}
            />
          </div>

          <p className="text-xl text-white text-center pt-6 px-16 pb-2">
            {testimonial.quote}
          </p>

          <div className="px-16 pt-4 flex justify-between items-center absolute bottom-10 left-0 right-0">
            <div className="flex flex-col">
              <div className="text-xl font-bold text-white">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-300">
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
                />
              ))}
            </div>
          </div>

          <div className="absolute opacity-40 bottom-0 left-0 w-full">
            <Image quality={100} layout="responsive" height={100} width={900} src={"/t-background.png"} alt={"background"} objectFit="cover"/>
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

      <div className="flex justify-between items-center pt-2 px-4">
        <div className="flex items-center gap-3">
          <Image
            quality={100}
            height={40}
            width={45}
            src={"/foot1.png"}
            alt={"Plane"}
          />
          <Image
            quality={100}
            height={2}
            width={400}
            src={"/foot2.png"}
            alt={"Dotted line"}
          />
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
          <Image
            quality={100}
            height={2}
            width={425}
            src={"/foot3.png"}
            alt={"Dotted line"}
          />
          <Image
            quality={100}
            height={36}
            width={20}
            src={"/foot4.png"}
            alt={"Location"}
          />
        </div>
      </div>
    </section>
  );
};