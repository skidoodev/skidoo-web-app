"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import StepOne from "../step-one";
import StepTwo from "../step-two";
import StepThree from "../step-three";
import { sendTravelFormEmail } from "@/app/api/send/route";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface GroupSizeType {
  adults: number;
  children: number;
  pets: number;
  seniors: number;
}

const Form: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [groupSize, setGroupSize] = useState<GroupSizeType>({
    adults: 0,
    children: 0,
    pets: 0,
    seniors: 0,
  });
  const [groupSizeOpen, setGroupSizeOpen] = useState(false);

  const totalTravelers = Object.values(groupSize).reduce((sum, val) => sum + val, 0);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const handleDateRangeChange = (range: DayPickerDateRange | undefined) => {
    setDateRange({
      from: range?.from,
      to: range?.to,
    });
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (step < 2) setStep((prev) => prev + 1);
      else handleSubmit();
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        destination,
        startDate: dateRange.from?.getTime() || 0,
        endDate: dateRange.to?.getTime() || 0,
        adults: groupSize.adults,
        children: groupSize.children,
        pets: groupSize.pets,
        seniors: groupSize.seniors,
        travelerTypes: selectedTypes,
        description,
        email
      };
    
      // Send form data to backend and send email
      await axios.post("/api/submit-travel-form", formData);
      await sendTravelFormEmail(formData);
    
      router.push('/success');
    } catch (error) {
      console.error('Form submission error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Detailed error:', error.response?.data);
      }
      alert('Failed to submit form. Please try again.');
    }
  };

  const isNextDisabled = () => {
    if (step === 0) {
      return !(
        destination &&
        dateRange.from &&
        dateRange.to &&
        totalTravelers > 0
      );
    } else if (step === 1) {
      return selectedTypes.length === 0;
    } else if (step === 2) {
      return email === "";
    }
    return false;
  };

  return (
    <div className="relative w-full mt-40 mb-20">
      <h2 className="text-4xl flex justify-center font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text mb-8">
        Request your personalized itinerary
      </h2>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${step * 100}%)`,
        }}
      >
        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <StepOne
            destination={destination}
            setDestination={setDestination}
            dateRange={dateRange}
            setDateRange={handleDateRangeChange}
            groupSize={groupSize}
            setGroupSize={setGroupSize}
            groupSizeOpen={groupSizeOpen}
            setGroupSizeOpen={setGroupSizeOpen}
          />
        </div>

        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <StepTwo
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
        </div>

        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <StepThree
            description={description}
            setDescription={setDescription}
            email={email}
            setEmail={setEmail}
          />
        </div>
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-center items-center w-full px-4
          transition-all duration-500 ease-in-out
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
          ${step === 0 ? 'bottom-[108px]' : step === 1 ? 'bottom-0' : 'bottom-7'}`}
      >
        <button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className={`px-16 py-2 text-white font-semibold text-lg rounded-full
            transition-all duration-300 ease-in-out transform
            ${isNextDisabled()
              ? "bg-gray-400"
              : "bg-[#5048E2] hover:scale-105 shadow-lg"
            }`}
        >
          {step === 2 ? "Submit" : "Next"}
        </button>
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 flex gap-2
          transition-all duration-500 ease-in-out
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
          ${step === 0 ? 'bottom-[64px]' : step === 1 ? '-bottom-10' : '-bottom-3'}`}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300
              ${step === index 
                ? "bg-[#5048E2] w-6" 
                : "bg-gray-300 w-2"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Form;