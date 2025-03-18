"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Form: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/itinerary-generator');
  };

  return (
    <section className="relative py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center w-full mb-8">
          <h2 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text inline-block">
            Create your AI-powered travel itinerary
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get a personalized travel plan tailored to your preferences in seconds
          </p>
        </div>
        
        {/* Button to redirect */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleRedirect}
            className="px-8 py-6 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform bg-[#5048E2] hover:scale-105 shadow-lg"
          >
            Create Your Itinerary
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Form;