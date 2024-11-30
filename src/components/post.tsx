'use client';

import React, { useState } from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { type POST_QUERYResult } from "../../sanity.types";
import Link from "next/link";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: () => null,
    undefined: () => null
  },
  block: {
    normal: ({ children }) => <p className="my-3">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-4 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-2 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
    undefined: () => null
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    undefined: () => null
  }
};

function ItineraryContent({ value }: { value: any }) {
  const itinerarySteps = Object.keys(value || {})
    .filter((key) => key.startsWith("itineraryStep"))
    .sort((a, b) => {
      const numA = parseInt(a.replace("itineraryStep", ""), 10);
      const numB = parseInt(b.replace("itineraryStep", ""), 10);
      return numA - numB;
    })
    .map((key) => value[key])
    .filter((step) => step && step.length > 0);

  return (
    <div className="space-y-10">
      {itinerarySteps.map((step, index) => {
        const firstImageBlock = step.find((block: any) => block._type === "image");

        return (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center bg-white">
            
            <div className="text-left col-span-3">
              <PortableText value={step} components={portableTextComponents} />
            </div>

            <div className="flex col-span-2 justify-end">
              {firstImageBlock?.asset?._ref ? (
                <Image
                  src={urlFor(firstImageBlock.asset._ref).url()}
                  alt={`Day ${index + 1} image`}
                  width={400}
                  height={200}
                  className="object-cover rounded-lg shadow-lg"
                  quality={90}
                />
              ) : (
                <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Post({ post }: { post: POST_QUERYResult }) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'extras'>('itinerary');

  if (!post) {
    return null;
  }

  const { 
    title, 
    mainImage, 
    body, 
    fullItinnerary, 
    summarizedTrip, 
    packingChecklist, 
    budgetBreakdown, 
    inANutshell, 
    otherActivities, 
    faqs 
  } = post;

  return (
    <section className="min-h-screen bg-white relative">
      <div className="relative py-[40px] 2xl:py-[60px] bg-gradient-to-r from-[#8711C1] to-[#2472FC] mb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/bg-blog.png"
            alt="Background"
            quality={100}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-10 px-[20px] md:px-[60px] 2xl:px-[80px] h-full">
          <div className="flex flex-col items-start text-start text-white w-full">
            <Link
              href={"/posts"}
              className="flex pl-1 text-2xl gap-2 font-medium text-white hover:scale-105 transition-all mb-auto">
              <Image className="" height={30} width={32} src={"/back-button-icon.png"} alt={"Back Icon"} /> Back
            </Link>
            
            <div className="mt-36 2xl:mt-48 w-full">
              {title && (
                <h1 className="text-4xl font-bold lg:text-5xl 2xl:text-6xl">{title}</h1>
              )}
              {post.categories && (
                <p className="mt-4 text-2xl font-medium text-[#C9A7FF]">
                  {post.categories.join(", ")}
                </p>
              )}
            </div>
          </div>
          
          {mainImage?.asset?._ref && (
            <div className="relative h-[240px] w-full max-w-[500px] md:h-[280px] md:max-w-[500px] 2xl:h-[338px] 2xl:max-w-[600px]">
              <Image
                src={urlFor(mainImage.asset._ref).url()}
                alt={title ?? "Blog post image"}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl border-2 border-white"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-[65px] 2xl:px-[90px] text-xl w-full">
        {body && <PortableText value={body} components={portableTextComponents} />}
      </div>

      <main className="px-[60px] 2xl:px-[80px] pt-16 relative">
        <article className="grid grid-cols-12 gap-8">
          {/* Left Section */}
          {fullItinnerary && (
            <div className="col-span-12 lg:col-span-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2472FC] to-[#8711C1] rounded-2xl -m-1 z-0"></div>
              <div className="relative z-10 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
                <div className="flex items-center justify-between mb-6 space-x-8">
                  <h2 
                    className={`text-4xl font-bold cursor-pointer relative pb-2 transition-all duration-700
                      ${activeTab === 'itinerary' 
                        ? 'bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent' 
                        : 'text-gray-500'} 
                      after:absolute after:bottom-0 after:left-0 after:h-1 after:transition-all after:duration-700
                      ${activeTab === 'itinerary' 
                        ? 'after:w-full after:bg-gradient-to-r after:from-[#2472FC] after:to-[#8711C1]' 
                        : 'after:w-0 after:bg-gray-300'}`}
                    onClick={() => setActiveTab('itinerary')}
                  >
                    Full Itinerary
                  </h2>
                  
                  {(otherActivities || faqs) && (
                    <h2
                      className={`text-4xl font-bold cursor-pointer relative pb-2 transition-all duration-500
                        ${activeTab === 'extras'
                          ? 'bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent'
                          : 'text-gray-500'} 
                        after:absolute after:bottom-0 after:left-0 after:h-1 after:transition-all after:duration-500
                        ${activeTab === 'extras'
                          ? 'after:w-full after:bg-gradient-to-r after:from-[#2472FC] after:to-[#8711C1]'
                          : 'after:w-0 after:bg-gray-300'}`}
                      onClick={() => setActiveTab('extras')}
                    >
                      Extras
                    </h2>
                  )}
                </div>
                <div className="h-[1380px] scrollbar-hidden overflow-y-auto">
                  <div 
                    className={`
                      transition-all duration-500 ease-in-out 
                      ${activeTab === 'itinerary' 
                        ? 'opacity-100 visible' 
                        : 'opacity-0 invisible absolute'}`}
                  >
                    {activeTab === 'itinerary' && <ItineraryContent value={fullItinnerary} />}
                  </div>
                  
                  {(otherActivities || faqs) && (
                    <div 
                      className={`
                        transition-all duration-700 ease-in-out 
                        ${activeTab === 'extras' 
                          ? 'opacity-100 visible' 
                          : 'opacity-0 invisible absolute'}`}
                    >
                      {activeTab === 'extras' && (
                        <div>
                          {otherActivities && (
                            <div className="mb-12">
                              <h3 className="text-3xl font-bold my-4">Other Activities</h3>
                              <PortableText 
                                value={otherActivities} 
                                components={portableTextComponents}
                              />
                            </div>
                          )}
                          {faqs && (
                            <div>
                              <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
                              <PortableText 
                                value={faqs} 
                                components={portableTextComponents}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {summarizedTrip && (
              <div className="px-6 py-4 h-[550px] flex flex-col justify-center items-center overflow-y-auto bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg">
                <h3 className="text-3xl text-center font-bold mb-10 px-[50px] bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent">Trip Summary</h3>
                <div className="text-start">
                  <PortableText 
                    value={summarizedTrip} 
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}
            {packingChecklist && (
              <div className="px-8 py-4 h-[450px] flex flex-col justify-center items-center overflow-y-auto bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg">
                <h3 className="text-3xl text-center font-bold mb-10 px-[38px] bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent">Packing Checklist</h3>
                <div className="text-start">
                  <PortableText 
                    value={packingChecklist} 
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}
            {budgetBreakdown && budgetBreakdown.length > 0 && (
            <div className="px-6 py-4 h-[450px] flex flex-col justify-center items-center overflow-y-auto bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg">
              <h3 className="text-3xl text-center font-bold mb-10 px-[36px] bg-gradient-to-r from-[#2472FC] to-[#8711C1] bg-clip-text text-transparent">Budget Breakdown</h3>
              <div className="text-start w-full px-4">
                {budgetBreakdown.map((item, index) => (
                  <div 
                    key={item._key} 
                    className={`flex justify-between gap-8 mb-2 ${index === budgetBreakdown.length - 1 ? 'font-bold text-lg my-4' : ''}`}
                  >
                    <span>{item.description}</span>
                    <span className="flex-shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </article>

        <div className="mt-16 space-y-16 relative bg-transparent pb-[300px]">
          {inANutshell && (
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">In a Nutshell</h2>
              <PortableText 
                value={inANutshell} 
                components={portableTextComponents}
              />
            </div>
          )}
          
          {/* Visible background image at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-full z-0">
            <Image
              src="/background.png"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>
    </section>
  );
}