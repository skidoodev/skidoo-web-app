"use client"
import React, { useState } from 'react';
import Image from "next/image"
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    name: "Virat Kohli",
    profession: "Cricketer",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
    rating: 4,
    image: "/user1.jpeg"
  },
  {
    id: 2,
    name: "Rohit Sharma",
    profession: "Cricketer",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
    rating: 5,
    image: "/user1.jpeg"
  },
  {
    id: 3,
    name: "Unknown",
    profession: "Unknown",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
    rating: 3,
    image: "/"
  }
];

export const TestimonialCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonialData.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevious = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + testimonialData.length) % testimonialData.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleSliderClick = (index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Non-null assertion operator (!) to satisfy TypeScript
  const testimonial = testimonialData[currentIndex]!;

  // Tween animation variants with easing
  const imageVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "tween", 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "tween", 
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const nameVariants = {
    initial: { 
      opacity: 0, 
      x: -20 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "tween", 
        duration: 0.3,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section className="relative">
      <AnimatePresence mode="wait">
        <motion.div 
          key={testimonial.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl border-4 border-white bg-gradient-to-r from-[#8711C1] to-[#2472FC] relative h-[21rem] hover:shadow-2xl shadow-xl transition-all duration-300 rounded-2xl mb-2">

          <button onClick={handlePrevious}
            className="absolute z-20 top-1/2 -left-5 -translate-y-1/2 bg-white rounded-full shadow-lg hover:scale-105 transition-all">
            <CircleChevronLeft className='h-12 w-12 text-[#8711C1]' />
          </button>

          <button 
            onClick={handleNext}
            className="absolute z-20 top-1/2 -right-5 -translate-y-1/2 bg-white rounded-full shadow-lg hover:scale-105 transition-all">
            <CircleChevronRight className='h-12 w-12 text-[#2472FC]' />
          </button>

          <div className="absolute z-10 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              className="bg-white rounded-3xl p-[1px]">

              <Image 
                quality={100} 
                height={150} 
                width={180} 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="rounded-3xl border-2 shadow-xl border-white"/>
            </motion.div>
          </div>

          <div className="relative h-full">
            <div className="flex justify-start pl-8 pt-8">
              <Image quality={100} height={64} width={80} src={"/quote.png"} alt={"quote"} />
            </div>

            <motion.p 
              key={`quote-${testimonial.id}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="text-xl text-white text-center pt-6 px-16 pb-2">
              {testimonial.quote}
            </motion.p>

            <div className="px-16 pt-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <motion.div 
                    variants={nameVariants}
                    initial="initial"
                    animate="animate"
                    className="text-xl font-bold text-white">
                    {testimonial.name}
                  </motion.div>
                  <motion.div 
                    variants={nameVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-300">
                    {testimonial.profession}
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "tween", 
                    duration: 0.3,
                    ease: "easeOut",
                    delay: 0.5 
                  }}
                  className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Image key={index} quality={100} height={20} width={22} src={"/star.png"} alt={"star"} />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, index) => (
                    <Image key={index} quality={100} height={20} width={22} src={"/unstar.png"} alt={"unstar"} />
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="absolute opacity-40 bottom-0 left-0 w-full">
              <Image quality={100} layout="responsive" height={100} width={900} src={"/t-background.png"} alt={"background"} objectFit="cover"/>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center pt-2 px-4">
        <div className="flex items-center gap-3">
          <Image quality={100} height={40} width={45} src={"/foot1.png"} alt={"Plane"} />
          <Image quality={100} height={2} width={435} src={"/foot2.png"} alt={"Dotted line"} />
        </div>
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 flex gap-2
            transition-all duration-500 ease-in-out
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
            ${currentIndex === 0 ? 'bottom-[22px]' : currentIndex === 1 ? 'bottom-[22px]' : 'bottom-[22px]'}`}>
          {testimonialData.map((_, index) => (
            <div
              key={index}
              onClick={() => handleSliderClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                ${currentIndex === index 
                  ? "bg-[#5048E2] w-6" 
                  : "bg-gray-300 w-2"
                }`}/>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Image quality={100} height={2} width={460} src={"/foot3.png"} alt={"Dotted line"} />
          <Image quality={100} height={36} width={20} src={"/foot4.png"} alt={"Location"} />
        </div>
      </div>
    </section>
  )
};