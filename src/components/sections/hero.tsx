import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export const Hero = () => {
  return (
    <div className="relative w-full px-8 lg:px-12 bg-gradient-to-r h-[85vh] from-[#8711C1] to-[#2472FC]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none z-0" />

      <div className="relative flex flex-col lg:flex-row justify-between items-center h-full z-10">
        <div className="flex flex-col justify-center flex-1 lg:pr-8 gap-4">
          <div className="text-4xl lg:text-5xl xl:text-7xl text-white font-open font-extrabold leading-tight whitespace-nowrap">
            Your Unique Journey,
          </div>
          <div className="text-4xl lg:text-5xl xl:text-7xl text-white font-open font-extrabold leading-tight">
            Your <span className="text-[#FFD600]">Perfect Plan</span>
          </div>
          <div className="py-4">
            <Link href="/blogs">
              <HoverBorderGradient
                containerClassName="rounded-md hover:scale-105 transition-all"
                as="button"
                className="text-[#8711C1] bg-[#FFD600] flex items-center space-x-2">
                <span className="text-2xl font-open font-bold px-12">Explore</span>
              </HoverBorderGradient>
            </Link>
          </div>
        </div>

        <div className="relative flex-1 w-full lg:w-[50%] h-[400px] lg:h-[500px]">
          <Image
            className="object-contain"
            quality={100}
            fill
            src="/hero.png"
            alt="hero image"
            priority
          />
        </div>
      </div>
    </div>
  );
};
