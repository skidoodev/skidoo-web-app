import React from "react";

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
    <div className="p-[2px] relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-fit flex justify-center items-center mx-auto">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white gap-4 p-10">
        <h1 className="font-semibold text-xl">Who do you relate to?</h1>
        <div className="grid grid-rows-2 grid-cols-5 gap-2 items-center justify-around rounded-lg w-fit">
          {travellerTypes.map((type) => (
            <div
              key={type.id}
              className={`flex flex-col gap-2 items-center justify-center cursor-pointer border-2 p-3 rounded-lg ${
                selectedTypes.includes(type.id) ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => toggleType(type.id)}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
