"use client";

import React, { useState } from 'react';
import Header from "@/components/sections/header";
import ItineraryForm from "@/components/sections/itinerary-form";
import ItineraryResult from "@/components/sections/itinerary-result";

export default function ItineraryGeneratorPage() {
  const [itinerary, setItinerary] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateItinerary = async (formData: {
    destination: string;
    duration: string;
    budget: string;
    travelStyle: string;
    preferences: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Extract the specific error message from the response
        const errorMessage = data.message || 'Failed to generate itinerary. Please try again.';
        setError(errorMessage);
        return;
      }
      
      setItinerary(data.itinerary);
      setDestination(formData.destination);
      setDuration(formData.duration);
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Travel Itinerary Generator</h1>
            <p className="text-lg text-gray-600">
              Create personalized travel plans in seconds with our AI-powered itinerary generator
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-[#2472FC] to-[#8711C1] px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Create Your Itinerary</h2>
            </div>
            <div className="p-6">
              <ItineraryForm onSubmit={handleGenerateItinerary} isLoading={isLoading} />
            </div>
          </div>
          
          {itinerary && (
            <ItineraryResult 
              itinerary={itinerary} 
              destination={destination} 
              duration={duration} 
            />
          )}
        </div>
      </div>
    </>
  );
}