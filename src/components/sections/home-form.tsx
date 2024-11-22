"use client";
import React, { useState } from "react";
import StepOne from "@/components/stepOne";
import StepTwo from "@/components/stepTwo";
import StepThree from "@/components/stepThree";
import { DateRange as DayPickerDateRange } from "react-day-picker";

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
  const [step, setStep] = useState(0);
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
    if (step < 2) setStep((prev) => prev + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    console.log(`Destination: ${destination}`);
    console.log(`Date Range:`, dateRange);
    console.log(`Group Size:`, groupSize);
    console.log(`Selected Types: ${selectedTypes}`);
    console.log(`Description: ${description}`);
    console.log(`Email: ${email}`);
    alert("Form submitted!");
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
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ease-in-out`}
        style={{
          transform: `translateX(-${step * 100}%)`,
        }}
      >
        <div className="w-full flex-shrink-0 flex items-center justify-center py-4">
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

        <div className="w-full flex-shrink-0 flex items-center justify-center py-4">
          <StepTwo
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
        </div>

        <div className="w-full flex-shrink-0 flex items-center justify-center py-4">
          <StepThree
            description={description}
            setDescription={setDescription}
            email={email}
            setEmail={setEmail}
          />
        </div>
      </div>

      <div className={`absolute ${step === 0 ? 'bottom-20': step === 1 ? 'bottom-6' : 'bottom-11'} left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-center items-center w-full px-4`}>
        <button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className={`px-6 py-3 text-white rounded-full w-[120px] ${
            isNextDisabled()
              ? "bg-gray-400"
              : "bg-gradient-to-br from-blue-500 to-purple-500"
          }`}
        >
          {step === 2 ? "Submit" : "Next"}
        </button>
      </div>

      <div className={`absolute ${step === 1 ? '-bottom-10' : 'bottom-0'} left-1/2 transform -translate-x-1/2 flex gap-3`}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              step === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Form;
