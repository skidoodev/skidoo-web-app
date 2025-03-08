"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import StepOne from "../step-one";
import StepTwo from "../step-two";
import StepThree from "../step-three";

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
  const { user } = useUser();
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
  
  // Refs for measuring heights of each step
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  
  // Track bottom margin based on step
  const [bottomMargin, setBottomMargin] = useState("mb-24");

  // Update bottom margin when step changes
  useEffect(() => {
    // First render needs a timeout to get proper heights
    setTimeout(() => {
      if (step === 0 && step1Ref.current) {
        setBottomMargin("mb-24");
      } else if (step === 1 && step2Ref.current) {
        setBottomMargin("mb-20");
      } else if (step === 2 && step3Ref.current) {
        setBottomMargin("mb-16");
      }
    }, 100);
  }, [step]);

  // Autofill email if the user is logged in
  useEffect(() => {
    if (user?.primaryEmailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

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
        description: description || "",
        email,
      };
      
      const response = await axios.post("/api/submit-travel-form", formData);
      
      if (response.status === 200) {
        router.push('/success');
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data);
        alert(error.response.data.message || 'Failed to submit form. Please try again.');
      } else {
        alert('Failed to submit form. Please try again.');
      }
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
    // <section className={`relative py-10 sm:py-16 ${bottomMargin}`}>
    <section 
        className="relative py-8 sm:py-12" // Reduced padding
        style={{
          // Dynamic margin based on current step
          marginBottom: step === 2 ? '2rem' : step === 1 ? '1.5rem' : '1rem'
        }}
      >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Heading */}
      <div className="text-center w-full mb-8">
        <h2 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-[#2472FC] to-[#8711C1] text-transparent bg-clip-text inline-block">
          Request your personalized itinerary
        </h2>
      </div>
        
        {/* Form container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${step * 100}%)`,
            }}
          >
            {/* Step One */}
            <div 
              ref={step1Ref}
              className="w-full min-w-full flex-shrink-0 px-4 flex flex-col"
            >
              <div className="flex justify-center">
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
              
              {/* Buttons for Step One */}
              {step === 0 && (
                <div className={`mt-10 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  {/* Next button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                      className={`px-16 py-2 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform 
                        ${isNextDisabled() ? "bg-gray-400" : "bg-[#5048E2] hover:scale-105 shadow-lg"}`}
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300
                          ${step === index ? "bg-[#5048E2] w-6" : "bg-gray-300 w-2"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
    
            {/* Step Two */}
            {/* <div 
              ref={step2Ref}
              className="w-full min-w-full flex-shrink-0 px-4 flex flex-col"
            >
              <div className="flex justify-center">
                <StepTwo
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                />
              </div> */}
               {/* Step Two (scrollable on mobile) */}
                <div className="w-full min-w-full flex-shrink-0 px-4 flex flex-col">
                  {/* Add max-height and scrolling for small screens */}
                  <div className="flex justify-center">
                    <div className="w-full sm:h-auto max-h-[400px] sm:max-h-none overflow-y-auto sm:overflow-visible">
                      <StepTwo
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                      />
                    </div>
                  </div>
              
              {/* Buttons for Step Two */}
              {step === 1 && (
                <div className={`mt-10 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  {/* Next button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                      className={`px-16 py-2 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform 
                        ${isNextDisabled() ? "bg-gray-400" : "bg-[#5048E2] hover:scale-105 shadow-lg"}`}
                    >
                      Next
                    </button>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300
                          ${step === index ? "bg-[#5048E2] w-6" : "bg-gray-300 w-2"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
    
            {/* Step Three */}
            <div 
              ref={step3Ref}
              className="w-full min-w-full flex-shrink-0 px-4 flex flex-col"
            >
              <div className="flex justify-center">
                <StepThree
                  description={description}
                  setDescription={setDescription}
                  email={email}
                  setEmail={setEmail}
                />
              </div>
              
              {/* Buttons for Step Three */}
              {step === 2 && (
                <div className={`mt-10 ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                  {/* Submit button */}
                  <div className="flex justify-center">
                    <button
                      onClick={handleSubmit}
                      disabled={isNextDisabled()}
                      className={`px-16 py-2 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform 
                        ${isNextDisabled() ? "bg-gray-400" : "bg-[#5048E2] hover:scale-105 shadow-lg"}`}
                    >
                      Submit
                    </button>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300
                          ${step === index ? "bg-[#5048E2] w-6" : "bg-gray-300 w-2"}`}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;