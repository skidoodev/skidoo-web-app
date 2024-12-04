import React from 'react';
import Image from 'next/image';

const Features = () => {
  return (
    <section className="pt-20 pb-32 bg-gradient-to-r from-[#8711C1] to-[#2472FC] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none"></div>

      <div className="flex flex-col mx-auto max-w-6xl p-6 relative z-10">
        <h1 className="text-4xl font-bold sm:text-5xl text-white bg-clip-text pb-8">
          Features
        </h1>
      </div>

      <div className="flex flex-wrap justify-between mx-auto max-w-6xl px-6 gap-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
            💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">AI-Powered</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
            💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Personalized</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
            💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Informative</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
            💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Dynamic</p>
        </div>
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
    </section>
  );
};

export default Features;