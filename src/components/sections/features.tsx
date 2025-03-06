// import React from 'react';
// import Image from 'next/image';

// const Features = () => {
//   return (
//     <section className="pt-20 pb-32 bg-gradient-to-r from-[#8711C1] to-[#2472FC] relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none"></div>

//       <div className="flex flex-col mx-auto max-w-6xl p-6 relative z-10">
//         <h1 className="text-4xl font-bold sm:text-5xl text-white bg-clip-text pb-8">
//           Features
//         </h1>
//       </div>

//       <div className="flex flex-wrap justify-between mx-auto max-w-6xl px-6 gap-6 relative z-10">
//         <div className="flex flex-col items-center">
//           <div className="bg-gray-50 flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
//             <Image height={75} width={75} quality={95} src={'/ai-powered.png'} alt={'ai-powered'}></Image>
//           </div>
//           <p className="text-white mt-4 text-lg font-medium">AI-Powered</p>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="bg-gray-50 flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
//             <Image height={75} width={75} quality={95} src={'/personalized.png'} alt={'personalized'}></Image>
//           </div>
//           <p className="text-white mt-4 text-lg font-medium">Personalized</p>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="bg-gray-50 flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
//             <Image height={75} width={75} quality={95} src={'/informative.png'} alt={'informative'}></Image>
//           </div>
//           <p className="text-white mt-4 text-lg font-medium">Informative</p>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="bg-gray-50 flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
//             <Image height={75} width={75} quality={95} src={'/dynamic.png'} alt={'dynamic'}></Image>
//           </div>
//           <p className="text-white mt-4 text-lg font-medium">Dynamic</p>
//         </div>
//       </div>
//       <div className="absolute opacity-5 bottom-0 left-0 w-full h-full pointer-events-none">
//         <Image
//           quality={100}
//           fill
//           src="/bg-features.png"
//           alt="background"
//           objectFit="cover"
//           style={{ objectPosition: 'bottom' }}
//         />
//       </div>
//     </section>
//   );
// };

// 
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define the features data
const features = [
  {
    title: "AI-Powered",
    description: "Our intelligent algorithm learns your preferences",
    image: "/ai-powered.png",
  },
  {
    title: "Personalized",
    description: "Customized recommendations based on your interests",
    image: "/personalized.png",
  },
  {
    title: "Informative",
    description: "Detailed insights about each destination",
    image: "/informative.png",
  },
  {
    title: "Dynamic",
    description: "Real-time updates and adjustments to your itinerary",
    image: "/dynamic.png",
  },
];

export const Features = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-r from-[#8711C1] to-[#2472FC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold text-center mb-12 sm:mb-16">
          What Makes TheSkidoo Special
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-gray-50 flex justify-center items-center relative h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] rounded-2xl shadow-inner shadow-gray-500">
                <Image 
                  height={75} 
                  width={75} 
                  quality={95} 
                  src={feature.image} 
                  alt={feature.title}
                  className="transform transition-transform hover:scale-110 duration-300"
                />
              </div>
              <p className="text-white mt-4 text-base sm:text-lg font-medium">
                {feature.title}
              </p>
              <p className="text-gray-200 mt-2 text-sm sm:text-base max-w-[180px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="absolute opacity-5 bottom-0 left-0 w-full h-full pointer-events-none">
          <Image
            quality={100}
            fill
            src="/bg-features.png"
            alt="background"
            objectFit="cover"
            style={{ objectPosition: 'bottom' }}
          />
        </div>
      </div>
    </section>
  );
};
export default Features;