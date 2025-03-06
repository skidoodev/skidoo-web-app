import Image from "next/image";
import { TestimonialCard } from "../testimonial-card";

export const About = () => {
  return (
    <section id="about" className="relative pt-16 sm:pt-20 pb-10 overflow-hidden">
      {/* Background image with improved positioning and containment */}
      <div className="absolute top-32 right-0 w-full md:w-1/2 max-w-xl z-[-1] opacity-80 pointer-events-none overflow-hidden">
        <div className="relative h-full">
          <Image 
            src="/background2.png" 
            alt="Background" 
            height={900}
            width={650}
            quality={95}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col mx-auto max-w-6xl px-4 sm:px-6 my-8 sm:my-12">
        {/* Main content with responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between lg:gap-8 xl:gap-20">
          {/* Logo container with responsive sizing */}
          <div className="relative group mt-8 lg:mt-0 w-full max-w-[320px] sm:max-w-[375px]">
            <div className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-r from-[#8711C1] to-[#2472FC] p-1 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-full h-full bg-gray-50 rounded-xl flex justify-center items-center overflow-hidden relative">
                <Image 
                  height={175} 
                  width={175} 
                  src={"/logo-main.png"} 
                  alt={"Logo"} 
                  quality={100}
                  className="w-[40%] sm:w-auto" 
                />
              </div>
            </div>
          </div>

          {/* Text content with proper spacing */}
          <div className="flex flex-col text-center lg:text-left max-w-full lg:max-w-lg space-y-4 mt-8 lg:mt-0">
            <h2 className="text-3xl sm:text-4xl pt-4 sm:pt-6 font-bold md:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text pb-4 sm:pb-8">
              About Us
            </h2>
            <p className="text-base sm:text-lg text-black leading-relaxed">
              TheSkidoo isn&apos;t just a travel service — it&apos;s your personal guide to the world. Born from a deep love for exploration and a belief that travel should reflect who you are, TheSkidoo is here to redefine how you experience the world.
            </p>
            <p className="text-base sm:text-lg text-black leading-relaxed">
              Our team of dedicated travel enthusiasts works hand-in-hand with you to craft trips that resonate with your personality, budget, and vision. With TheSkidoo, every trip is an opportunity to create memories that will last a lifetime.
            </p>
            <p className="text-base sm:text-lg text-black leading-relaxed">
              We specialize in creating customized travel itineraries that match your passions, whether it&apos;s discovering hidden gems, indulging in local cuisines, chasing adventures, or simply relaxing.
            </p>
            <p className="text-base sm:text-lg text-black leading-relaxed">
              Let&apos;s start your journey today — because the world is waiting!
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials section with improved spacing */}
      <div className="flex flex-col mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center my-10 sm:my-16 font-bold bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text">
          Testimonials
        </h2>
        {/* Added padding-top to accommodate the overlapping image */}
        <div className="pt-14 flex justify-center items-center">
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
};