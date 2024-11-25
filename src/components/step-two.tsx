import React from "react";
import { Card } from "@/components/ui/card";

interface StepTwoProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const StepTwo: React.FC<StepTwoProps> = ({ selectedTypes, setSelectedTypes }) => {
  const travellerTypes = [
    { id: "adventure", name: "The Adventure Seeker", icon: "🏔️" },
    { id: "culture", name: "The Culture Enthusiast", icon: "🏛️" },
    { id: "relaxation", name: "The Relaxation Seeker", icon: "🏖️" },
    { id: "budget", name: "The Budget Traveler", icon: "💰" },
    { id: "family", name: "The Family Traveler", icon: "👨‍👩‍👧‍👦" },
    { id: "friends", name: "The Friends Day-Out", icon: "🍻" },
    { id: "solo", name: "The Solo Traveler", icon: "🎒" },
    { id: "romantic", name: "The Romantic Getaway", icon: "💑" },
    { id: "corporate", name: "The Corporate Traveler", icon: "💼" },
    { id: "senior", name: "The Senior Traveler", icon: "👴" },
  ];

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((type) => type !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

      <Card className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-6 sm:p-12 border border-gray-100 relative">
        <h1 className="font-semibold text-2xl text-gray-800 mb-8">Who do you relate to?</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-stretch justify-around w-full max-w-6xl">
          {travellerTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={`
                relative group/card cursor-pointer transition-all duration-300
                ${selectedTypes.includes(type.id) 
                  ? 'scale-100 transform' 
                  : 'hover:scale-105 transform'}
              `}
            >
              {/* Individual card gradient border */}
              <div className={`
                absolute -inset-0.5 rounded-xl transition-opacity duration-300
                ${selectedTypes.includes(type.id)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 opacity-100'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/card:opacity-70'}
              `}></div>

              <div className={`
                relative flex flex-col gap-3 items-center justify-center p-4 rounded-xl
                border-2 transition-all duration-300 h-full
                ${selectedTypes.includes(type.id)
                  ? 'bg-white border-transparent'
                  : 'bg-white border-gray-200 hover:border-transparent'}
              `}>
                <span className="text-4xl transform transition-transform duration-300 group-hover/card:scale-110">
                  {type.icon}
                </span>
                <span className="text-center text-sm font-medium text-gray-700">
                  {type.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StepTwo;