import Image from "next/image";
import { HoverBorderGradient } from "../ui/hover-border-gradient";


export const Hero = () => {
  return (
    <div>
      <div className="w-full p-7 bg-gradient-to-r from-[#8711C1] to-[#2472FC]">
        <div className="flex justify-between 2xl:px-[60px]">
          <div className="flex flex-col justify-center pl-8">
            <span className="text-5xl text-white font-bold ">THE SKIDOO</span>
            <div className="py-4">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2">
                <span className="text-xl px-4">Explore Blogs</span>
              </HoverBorderGradient>
            </div>
          </div>

          <div className="">
            <Image className="pt-[14px] 2xl:pt-[120px] 2xl:pb-[60px]" quality={100} width={660} height={540} src="/hero.png" alt={"heroimage"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

