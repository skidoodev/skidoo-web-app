import React from 'react'

const Cards = () => {
  return (
    <section className="pt-20 pb-32 bg-gradient-to-r from-[#8711C1] to-[#2472FC]">
      <div className="flex flex-col mx-auto max-w-6xl p-6">
          <h1 className="text-4xl font-bold sm:text-5xl text-white bg-clip-text pb-8">
            Features
          </h1>
      </div>

      <div className="flex flex-wrap justify-between mx-auto max-w-6xl px-6 gap-6">
        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
           💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Budget Friendly</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
            💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Budget Friendly</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
           💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Budget Friendly</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-50 text-black text-7xl flex justify-center items-center relative h-[200px] w-[200px] rounded-2xl shadow-inner shadow-gray-500">
           💰
          </div>
          <p className="text-white mt-4 text-lg font-medium">Budget Friendly</p>
        </div>
      </div>
    </section>
  )
}

export default Cards;