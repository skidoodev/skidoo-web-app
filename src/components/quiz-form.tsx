"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MinusIcon, PlusIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { type DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";

const travelerTypes = [
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

const stepImages = [
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
];

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    groupSize: { adults: 1, children: 0, pets: 0, seniors: 0 },
    dreamTrip: "",
    travelerTypes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dateRange: range || { from: undefined, to: undefined },
    }));
  };

  const handleGroupSizeChange = (type, operation) => {
    setFormData((prev) => ({
      ...prev,
      groupSize: {
        ...prev.groupSize,
        [type]: Math.max(
          0,
          prev.groupSize[type] + (operation === "add" ? 1 : -1),
        ),
      },
    }));
  };

  const handleTravelerTypeToggle = (id) => {
    setFormData((prev) => ({
      ...prev,
      travelerTypes: prev.travelerTypes.includes(id)
        ? prev.travelerTypes.filter((type) => type !== id)
        : [...prev.travelerTypes, id],
    }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const totalTravelers = Object.values(formData.groupSize).reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <div className="flex h-screen bg-background">
      <div className="flex w-1/2 items-center justify-center rounded-r-3xl bg-muted p-6">
        <img
          src={stepImages[step - 1]}
          alt={`Step ${step} illustration`}
          className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="mb-8 text-left text-4xl font-bold">
              Create your travel persona
            </h1>
            <p className="mb-8 text-left text-muted-foreground">
              Let&apos;s get personal! Tell me a bit about your travel style and
              preferences so I can whip up some spot-on destination and
              experience suggestions just for you.
            </p>
            <p className="mt-4 text-left text-sm text-muted-foreground">
              {step} of 3 steps • Approximately 4 minutes
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="destination">
                        Where do you want to go?
                      </Label>
                      <Input
                        id="destination"
                        name="destination"
                        placeholder="Search for a destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label>Travel Dates</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.dateRange && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dateRange?.from ? (
                              formData.dateRange.to ? (
                                <>
                                  {format(formData.dateRange.from, "LLL dd, y")}{" "}
                                  - {format(formData.dateRange.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(formData.dateRange.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={formData.dateRange?.from}
                            selected={formData.dateRange}
                            onSelect={handleDateRangeChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Group Size</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                const types = [
                                  "adults",
                                  "children",
                                  "pets",
                                  "seniors",
                                ];
                                const popover =
                                  document.getElementById("group-size-popover");
                                if (popover) popover.click();
                              }}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              {totalTravelers}{" "}
                              {totalTravelers === 1 ? "Traveler" : "Travelers"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              {Object.entries(formData.groupSize).map(
                                ([type, count]) => (
                                  <div
                                    key={type}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="capitalize">{type}</span>
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                          handleGroupSizeChange(
                                            type,
                                            "subtract",
                                          )
                                        }
                                      >
                                        <MinusIcon className="h-4 w-4" />
                                      </Button>
                                      <span className="w-8 text-center">
                                        {count}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                          handleGroupSizeChange(type, "add")
                                        }
                                      >
                                        <PlusIcon className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dreamTrip">
                        Describe your dream trip
                      </Label>
                      <Textarea
                        id="dreamTrip"
                        name="dreamTrip"
                        placeholder="Tell us about your ideal vacation..."
                        value={formData.dreamTrip}
                        onChange={handleInputChange}
                        className="h-32"
                      />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <Label>Who do you relate to?</Label>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                      {travelerTypes.map((type) => (
                        <Card
                          key={type.id}
                          className={cn(
                            "cursor-pointer transition-colors",
                            formData.travelerTypes.includes(type.id)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted",
                          )}
                          onClick={() => handleTravelerTypeToggle(type.id)}
                        >
                          <CardContent className="flex h-full flex-col items-center justify-center p-4 text-center">
                            <span className="mb-2 text-4xl">{type.icon}</span>
                            <span className="text-sm">{type.name}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="p-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            {step > 1 ? (
              <div>
                <Button onClick={handlePrev} variant="outline">
                  Previous
                </Button>
              </div>
            ) : (
              <div></div>
            )}
            {step < 2 ? (
              <Button onClick={handleNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button onClick={() => console.log(formData)} className="ml-auto">
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
