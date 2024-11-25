import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { IoLocation } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TiGroup } from "react-icons/ti";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FaCalendar } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";
import { format, isBefore, startOfToday, isAfter } from "date-fns";

interface GroupSizeType {
  adults: number;
  children: number;
  pets: number;
  seniors: number;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface StepOneProps {
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  groupSize: GroupSizeType;
  setGroupSize: React.Dispatch<React.SetStateAction<GroupSizeType>>;
  groupSizeOpen: boolean;
  setGroupSizeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepOne: React.FC<StepOneProps> = ({
  destination,
  setDestination,
  dateRange,
  setDateRange,
  groupSize,
  setGroupSize,
  groupSizeOpen,
  setGroupSizeOpen,
}) => {
  const totalTravelers = Object.values(groupSize).reduce((sum, val) => sum + val, 0);

  // Set default value of 1 adult when total travelers is 0
  React.useEffect(() => {
    if (totalTravelers === 0) {
      setGroupSize((prev) => ({
        ...prev,
        adults: 1,
      }));
    }
  }, [totalTravelers, setGroupSize]);

  const handleGroupSizeChange = (
    type: keyof GroupSizeType,
    operation: "add" | "subtract"
  ) => {
    setGroupSize((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (operation === "add" ? 1 : -1)),
    }));
  };

  // Updated date validation functions
  const isDateDisabled = (date: Date, type: "from" | "to"): boolean => {
    const today = startOfToday();

    if (type === "from") {
      // For "from" date:
      // 1. Disable past dates and today
      // 2. Disable dates after the selected "to" date if it exists
      if (isBefore(date, today) || date.getTime() === today.getTime()) {
        return true;
      }
      // Only check against 'to' date if it exists
      if (dateRange.to && isAfter(date, dateRange.to)) {
        return true;
      }
      return false;
    } else {
      // For "to" date:
      // 1. Disable dates before the selected "from" date if it exists
      // 2. Disable dates before today if no "from" date is selected
      if (dateRange.from) {
        return isBefore(date, dateRange.from);
      }
      return isBefore(date, today);
    }
  };

  // Handle date selection with validation
  const handleDateSelect = (date: Date | undefined, type: "from" | "to") => {
    if (!date) {
      setDateRange({ ...dateRange, [type]: date });
      return;
    }

    if (type === "from") {
      // If selected "from" date is after "to" date, clear "to" date
      if (dateRange.to && isAfter(date, dateRange.to)) {
        setDateRange({ from: date, to: undefined });
      } else {
        setDateRange({ ...dateRange, from: date });
      }
    } else {
      setDateRange({ ...dateRange, to: date });
    }
  };

  const [openPopover, setOpenPopover] = useState<"from" | "to" | null>(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2472FC] to-[#8711C1] rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex flex-col sm:flex-row gap-6 items-center bg-white rounded-2xl shadow-2xl justify-around p-6 sm:p-12 border border-gray-100 relative">
        {/* Location Input */}
        <div className="relative w-full sm:w-[35%] group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2472FC] to-[#8711C1] rounded-lg opacity-0 group-focus-within:opacity-60 transition-opacity duration-300" />
          <div className="relative bg-white rounded-lg">
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where would you like to go?"
              className="peer border px-4 pb-2 pt-10 w-full font-medium text-lg border-gray-300 rounded-lg focus:outline-none focus:border-transparent text-[#3270d6] transition-all duration-300 relative hover:shadow-sm"
            />
            <label
              htmlFor="destination"
              className="flex gap-1 text-lg text-gray-700 justify-center items-center absolute top-3 left-3 transition-all duration-200 peer-focus:text-gray-600 peer-focus:text-base peer-focus:top-3"
            >
              <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
                <IoLocation />
              </IconContext.Provider>
              Location
            </label>
          </div>
        </div>

        {/* Date Inputs */}
        {(["from", "to"] as const).map((key, index) => (
          <Popover
            key={index}
            open={openPopover === key} // Check if this popover is open
            onOpenChange={(isOpen) => setOpenPopover(isOpen ? key : null)} // Update state based on open/close
          >
            <PopoverTrigger asChild>
              <div className="relative w-full sm:w-[15%]">
                <div className="relative bg-white rounded-lg">
                  <input
                    type="text"
                    value={
                      dateRange[key]
                        ? format(dateRange[key]!, "dd MMM yyyy")
                        : ""
                    }
                    readOnly
                    placeholder="Pick a date"
                    className="peer border px-4 pb-2 pt-10 w-full text-base border-gray-300 rounded-lg focus:outline-none text-[#3b82f6] hover:shadow-sm cursor-pointer"
                  />
                  <label
                    className={`flex gap-1 justify-center items-center absolute top-3 left-4 transition-all duration-200 ${
                      openPopover === key
                        ? "text-gray-600 text-base top-3"
                        : "text-gray-900 text-lg top-3"
                    }`}
                  >
                    <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
                      <FaCalendar />
                    </IconContext.Provider>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" side="bottom" className="w-auto">
              <Calendar
                className="flex justify-center items-start"
                mode="single"
                selected={dateRange[key]}
                onSelect={(date) => handleDateSelect(date, key)}
                disabled={(date) => isDateDisabled(date, key)}
              />
            </PopoverContent>
          </Popover>
        ))}

        {/* Group Size Input */}
        <Popover open={groupSizeOpen} onOpenChange={setGroupSizeOpen}>
          <PopoverTrigger asChild>
            <div className="relative w-full sm:w-[15%]">
              <div className="relative bg-white rounded-lg">
                <input
                  type="text"
                  value={`${totalTravelers} Travellers`}
                  readOnly
                  className="peer border px-4 pb-2 pt-10 w-full text-base border-gray-300 rounded-lg focus:outline-none text-[#3b82f6] hover:shadow-sm cursor-pointer"
                />
                <label
                  className={`flex gap-1 justify-center items-center absolute top-3 left-4 transition-all duration-200 ${
                    groupSizeOpen
                      ? "text-gray-600 text-base top-3"
                      : "text-gray-900 text-lg top-3"
                  }`}
                >
                  <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
                    <TiGroup />
                  </IconContext.Provider>
                  Group
                </label>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="bottom"
            className="w-64 bg-white shadow-xl rounded-lg p-4 border border-gray-200"
          >
            {Object.keys(groupSize).map((type) => (
              <div
                key={type}
                className="flex items-center justify-between py-1 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0"
              >
                <span className="capitalize text-gray-700 text-sm font-normal">{type}</span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "subtract")
                    }
                    className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <MinusIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <input
                    type="number"
                    value={groupSize[type as keyof GroupSizeType]}
                    readOnly
                    className="w-8 h-8 text-center text-gray-800 text-sm font-medium bg-gray-50 border border-gray-200 rounded-md focus:outline-none leading-none flex items-center justify-center appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "add")
                    }
                    className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default StepOne;