import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export const Hero = () => {
  return (
    <div className="w-full p-7 bg-gradient-to-r from-[#8711C1] to-[#2472FC]">
      <div className="flex flex-col md:flex-row justify-between items-center 2xl:px-[40px]">

        <div className="flex flex-col justify-center pl-8 max-w-2xl 2xl:max-w-3xl mb-6 md:mb-0 md:mr-8">
          <span className="text-4xl md:text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
            Lorem Ipsum is simply dummy text of the industry.
          </span>
          <div className="py-4">
            <Link href="/blogs">
              <HoverBorderGradient
                containerClassName="rounded-md hover:scale-105 transition-all"
                as="button"
                className="text-black bg-white flex items-center space-x-2"
              >
                <span className="text-xl font-bold px-8">Explore</span>
              </HoverBorderGradient>
            </Link>
          </div>
        </div>

        <div className="relative w-full md:w-[660px] h-[400px] md:h-[560px] 2xl:w-[760px] 2xl:h-[725px] flex-shrink-0">
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