// import Image from "next/image";
// import Link from "next/link";
// import { HoverBorderGradient } from "../ui/hover-border-gradient";

// export const Hero = () => {
//   return (
//     <div className="relative w-full p-7 bg-gradient-to-r h-[85vh] from-[#8711C1] to-[#2472FC]">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none z-0" />

//       <div className="relative flex justify-between items-center 2xl:px-[40px] pt-4 z-50">
//         <div className="flex flex-col justify-center pl-[20px] 2xl:pl-4 max-w-2xl 2xl:max-w-3xl mb-6 md:mb-0 gap-4">
//           <div className="text-4xl md:text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
//             Your Unique Journey
//           </div>
//           <div className="text-4xl md:text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
//             Your <span className="text-[#FFD600]">Perfect Plan</span>
//           </div>
//           <div className="my-4 inline-block">
//             <HoverBorderGradient
//               containerClassName="rounded-md hover:scale-105 transition-all"
//               className="text-[#8711C1] bg-[#FFD600] flex items-center space-x-2"
//               as="div">
//               <Link href="/posts" className="block">
//                 <span className="text-2xl font-bold mx-12">Explore</span>
//               </Link>
//             </HoverBorderGradient>
//           </div>
//         </div>

//         <div className="relative w-full lg:-right-2 h-[400px] lg:w-[600px] lg:h-[500px] 2xl:w-[700px] 2xl:h-[670px] flex-shrink-0">
//           <Image
//             className="object-contain"
//             quality={100}
//             fill
//             src="/hero.png"
//             alt="hero image"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#8711C1] to-[#2472FC] p-4 sm:p-7 min-h-[600px] sm:min-h-[85vh]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none z-0" />

      {/* Content container with responsive flex direction */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center h-full w-full max-w-7xl mx-auto">
        {/* Text content - full width on mobile, partial on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mb-8 lg:mb-0 gap-4 text-center lg:text-left">
          <div className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
            Your Unique Journey
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-white font-extrabold leading-tight">
            Your <span className="text-[#FFD600]">Perfect Plan</span>
          </div>
          <div className="my-4 flex justify-center lg:justify-start">
            <HoverBorderGradient
              containerClassName="rounded-md hover:scale-105 transition-all"
              className="text-[#8711C1] bg-[#FFD600] flex items-center space-x-2"
              as="div">
              <Link href="/posts" className="block">
                <span className="text-xl sm:text-2xl font-bold mx-8 sm:mx-12">Explore</span>
              </Link>
            </HoverBorderGradient>
          </div>
        </div>

        {/* Image container with proper responsive sizing */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:w-1/2 lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">
          <Image
            className="object-contain object-center lg:object-right"
            quality={100}
            fill
            src="/hero.png"
            alt="hero image" 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};