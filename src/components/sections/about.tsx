import Image from "next/image";
import { TestimonialCard } from "../testimonial-card";

export const About = () => {
  return (
    <section className="relative pt-20 pb-10">

      <div className="absolute top-32 -right-12 bottom-0 w-1/2 z-[-1] pointer-events-none">
        <Image 
          src="/background2.png" 
          alt="Background" 
          height={900}
          width={650}
          quality={95}
          className="opacity-80"
        />
      </div>

      <div className="flex flex-col mx-auto max-w-6xl px-6 my-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:gap-20">
           
          <div className="relative group mt-8 lg:mt-0">
            <div className="w-[375px] h-[500px] rounded-2xl bg-gradient-to-r from-[#8711C1] to-[#2472FC] p-1 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="w-full h-full bg-gray-50 rounded-xl flex justify-center items-center overflow-hidden relative">
                <Image className="" height={175} width={175} src={"/logo-main.png"} alt={"Logo"} quality={100} />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-center lg:text-left max-w-lg space-y-4">
            <h2 className="text-4xl pt-6 font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text pb-8">
              About Us
            </h2>
            <p className="text-lg text-black leading-relaxed">
              TheSkidoo isn&apos;t just a travel service — it&apos;s your personal guide to the world. Born from a deep love for exploration and a belief that travel should reflect who you are, TheSkidoo is here to redefine how you experience the world.
            </p>
            <p className="text-lg text-black leading-relaxed">
              Our team of dedicated travel enthusiasts works hand-in-hand with you to craft trips that resonate with your personality, budget, and vision. With TheSkidoo, every trip is an opportunity to create memories that will last a lifetime.
            </p>
            <p className="text-lg text-black leading-relaxed">
              Let&apos;s start your journey today — because the world is waiting!
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto max-w-6xl px-6 pt-12">
        <h2 className="text-4xl my-20 font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text">
          Testimonials
        </h2>
        <div className="flex justify-center items-center mt-12">
          <TestimonialCard />
        </div>
      </div>
    </section>
  );
};