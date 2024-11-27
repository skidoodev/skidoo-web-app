import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";


export const Hero = () => {
  return (
    <div>
      <div className="w-full p-7 bg-gradient-to-r from-[#8711C1] to-[#2472FC]">
        <div className="flex flex-wrap justify-between items-center 2xl:px-[40px]">
          {/* Text Section */}
          <div className="flex flex-col justify-center pl-8 max-w-2xl 2xl:max-w-3xl">
            <span className="text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
              Lorem Ipsum is simply dummy text of the industry.
            </span>
            <div className="py-4">
              <HoverBorderGradient
                containerClassName="rounded-md hover:scale-105 transition-all"
                as="button"
                className="text-black bg-white flex items-center space-x-2"
              >
                <span className="text-xl font-bold px-8">Explore</span>
              </HoverBorderGradient>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative bg-auto flex-shrink-0">
            <div className="w-[660px] h-[560px] 2xl:w-[760px] 2xl:h-[725px]">
              <Image
                className="pt-[20px] pb-[15px] 2xl:pt-[80px] 2xl:pb-[60px]"
                quality={100}
                fill
                src="/hero.png"
                alt="hero image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

