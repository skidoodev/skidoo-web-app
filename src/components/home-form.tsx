"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MinusIcon, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

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

  const handleGroupSizeChange = (
    type: keyof GroupSizeType,
    operation: "add" | "subtract"
  ) => {
    setGroupSize((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (operation === "add" ? 1 : -1)),
    }));
  };

  const handleDateRangeChange = (range: DayPickerDateRange | undefined) => {
    setDateRange({
      from: range?.from,
      to: range?.to,
    });
  };

  const router = useRouter();

  const handlePlan = () => {
    if (destination && dateRange.from && dateRange.to && totalTravelers > 0) {
      router.push(`/quiz?step=2`);
    } else {
      router.push(`/quiz?step=1`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#F8EFC4] p-10 rounded-xl w-fit mx-auto">
      <div className="w-full sm:w-1/4">
        <Input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className=""
        />
      </div>

      <div className="w-full sm:w-fit">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`
                ) : (
                  format(dateRange.from, "LLL dd, yyyy")
                )
              ) : (
                "Travel Dates"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:w-1/4">
        <Popover open={groupSizeOpen} onOpenChange={setGroupSizeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              {totalTravelers === 0 ? "Group Size" : `Travelers: ${totalTravelers}`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            {["adults", "children", "pets", "seniors"].map((type) => (
              <div
                key={type}
                className="flex items-center justify-between space-x-4 mb-2"
              >
                <span className="capitalize">{type}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "subtract")
                    }
                    className="px-2 py-1"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={groupSize[type as keyof GroupSizeType]}
                    readOnly
                    className="w-12 text-center"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      handleGroupSizeChange(type as keyof GroupSizeType, "add")
                    }
                    className="px-2 py-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      {/* Plan Button */}
      <div className="w-full sm:w-auto flex justify-center">
        <Button
          onClick={handlePlan}
          className="px-4 py-2 text-[#1C403B] bg-[#FDCE00] rounded-md hover:bg-[#1C403B] hover:text-[#FDCE00] w-full sm:w-auto"
        >
          Plan
        </Button>
      </div>
    </div>
  );
};

export default Form;
