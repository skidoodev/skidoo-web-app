import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ItineraryResultProps {
  itinerary: string;
  destination: string;
  duration: string;
}

export default function ItineraryResult({ itinerary, destination, duration }: ItineraryResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#2472FC] to-[#8711C1] px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Your {duration}-Day Itinerary for {destination}
        </h2>
      </div>
      <div className="p-6">
        <div className="prose max-w-none">
          <ReactMarkdown>{itinerary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}