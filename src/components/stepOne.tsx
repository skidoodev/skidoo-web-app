import React from "react";
import { IconContext } from "react-icons/lib";
import { IoLocation } from "react-icons/io5";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TiGroup } from "react-icons/ti";
import { MinusIcon, PlusIcon } from "lucide-react";
import { FaCalendar } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

  const handleGroupSizeChange = (
    type: keyof GroupSizeType,
    operation: "add" | "subtract"
  ) => {
    setGroupSize((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (operation === "add" ? 1 : -1)),
    }));
  };

  return (
    <div className="p-[2px] relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-fit flex justify-center items-center mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-around bg-white p-10 rounded-lg w-fit">
        <div className="relative w-full sm:w-[28%]">
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where would you like to go?"
            className="peer border border-gray-400 p-4 pb-1 pt-6 w-full focus:outline-blue-500 text-blue-500 rounded-sm placeholder:text-xs text-base"
          />
          <label
            htmlFor="destination"
            className="flex gap-1 text-gray-700 text-md justify-center items-center absolute top-1 left-3 transition-all duration-200 peer-focus:text-gray-500 peer-focus:text-xs"
          >
            <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
              <IoLocation />
            </IconContext.Provider>
            Location
          </label>
        </div>
        {["from", "to"].map((key, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <div className="relative w-[15%] border border-gray-400 p-4 pb-1 pt-6 rounded-sm">
                <input
                  type="text"
                  value={
                    dateRange[key as "from" | "to"]
                      ? format(dateRange[key as "from" | "to"]!, "MM/dd/yyyy")
                      : ""
                  }
                  readOnly
                  placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  className="peer w-full focus:outline-none text-blue-500 placeholder:text-xs text-base"
                />
                <label
                  className="flex gap-1 text-gray-700 text-md justify-center items-center absolute top-1 left-3 transition-all duration-200 peer-focus:text-gray-500 peer-focus:text-xs"
                >
                  <IconContext.Provider value={{ size: "16px", color: "#3b82f6" }}>
                    <FaCalendar />
                  </IconContext.Provider>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={dateRange[key as "from" | "to"]}
                onSelect={(date) =>
                  setDateRange({ ...dateRange, [key]: date })
                }
              />
            </PopoverContent>
          </Popover>
        ))}
        <Popover open={groupSizeOpen} onOpenChange={setGroupSizeOpen}>
          <PopoverTrigger asChild>
            <div className="relative border border-gray-400 p-4 pb-1 pt-6 w-[15%] rounded-sm">
              <div className="flex gap-1 text-gray-700 text-md justify-center items-center absolute top-1 left-3 transition-all duration-200 peer-focus:text-gray-500 peer-focus:text-xs">
                <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
                  <TiGroup />
                  Group
                </IconContext.Provider>
              </div>
              <span className="peer text-xs text-gray-400">{`${totalTravelers} Travellers`}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            {Object.keys(groupSize).map((type) => (
              <div key={type} className="flex items-center justify-between mb-2">
                <span className="capitalize">{type}</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "subtract")
                    }
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={groupSize[type as keyof GroupSizeType]}
                    readOnly
                    className="w-12 text-center"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "add")
                    }
                  >
                    <PlusIcon className="h-4 w-4" />
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
