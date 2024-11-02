"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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
import { CalendarIcon, Loader2, MinusIcon, PlusIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { type DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/trpc/react";
import { Stepper } from "./sections/stepper";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { sendTravelFormEmail } from "@/app/api/send/route";

type GroupSizeType = "adults" | "children" | "pets" | "seniors";

interface FormData {
  destination: string;
  dateRange: DateRange;
  groupSize: Record<GroupSizeType, number>;
  dreamTrip: string;
  travelerTypes: string[];
  email: string;
}

interface FormErrors {
  destination: string;
  dateRange: string;
  groupSize: string;
  travelerTypes: string;
  email: string;
}

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
  "/placeholder.svg?height=600&width=600",
];

export default function Component() {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
      setIsSignUp(true);
    }
  }, [user]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    setStep(stepParam ? parseInt(stepParam, 10) : 0);
  }, [searchParams]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    dateRange: {} as DateRange,
    groupSize: { adults: 1, children: 0, pets: 0, seniors: 0 },
    dreamTrip: "",
    travelerTypes: [],
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    destination: "",
    dateRange: "",
    groupSize: "",
    travelerTypes: "",
    email: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setFormData((prev) => ({
        ...prev,
        dateRange: range,
      }));
      setErrors((prev) => ({ ...prev, dateRange: "" }));
    }
  };

  const handleGroupSizeChange = (
    type: GroupSizeType,
    operation: "add" | "subtract",
  ) => {
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
    setErrors((prev) => ({ ...prev, groupSize: "" }));
  };

  const handleTravelerTypeToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      travelerTypes: prev.travelerTypes.includes(id)
        ? prev.travelerTypes.filter((type) => type !== id)
        : [...prev.travelerTypes, id],
    }));
    setErrors((prev) => ({ ...prev, travelerTypes: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      destination: "",
      dateRange: "",
      groupSize: "",
      travelerTypes: "",
      email: "",
    };

    if (!isSignedIn && step === 1) {
      if (!formData.email) {
        newErrors.email = "Please enter an email address";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 1) {
      if (!formData.email) {
        newErrors.email = "Please enter an email address";
      }
      if (!formData.destination) {
        newErrors.destination = "Please enter a destination";
      }
    }

    if (!formData.dateRange.from || !formData.dateRange.to) {
      newErrors.dateRange = "Please select a date range";
    }

    if (formData.dateRange.from && formData.dateRange.to) {
      if (formData.dateRange.from > formData.dateRange.to) {
        newErrors.dateRange = "End date must be after start date";
      }
      if (formData.dateRange.from < new Date()) {
        newErrors.dateRange = "Start date cannot be in the past";
      }
    } else {
      newErrors.dateRange = "Please select a date range";
    }

    const totalTravelers = Object.values(formData.groupSize).reduce(
      (sum, count) => sum + count,
      0,
    );
    if (totalTravelers === 0) {
      newErrors.groupSize = "Please select at least one traveler";
    }

    if (step === 2 && formData.travelerTypes.length === 0) {
      newErrors.travelerTypes = "Please select at least one traveler type";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isSignedIn, userId } = useAuth();
  
  const guestFormMutation = api.travel_form.createAsGuest.useMutation();
  const authenticatedFormMutation = api.travel_form.create.useMutation();

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
  
    setIsSubmitting(true);
    try {
      const submissionData = {
        destination: formData.destination,
        adults: formData.groupSize.adults,
        children: formData.groupSize.children,
        pets: formData.groupSize.pets,
        seniors: formData.groupSize.seniors,
        description: formData.dreamTrip,
        startDate: formData.dateRange.from!,
        endDate: formData.dateRange.to!,
        travelerTypes: formData.travelerTypes,
        email: formData.email,
      };
  
      if (isSignedIn) {
        const { email, ...authenticatedData } = submissionData;
        await Promise.all([
          authenticatedFormMutation.mutateAsync(authenticatedData),
          sendTravelFormEmail(submissionData)
        ]);
      } else {
        await Promise.all([
          guestFormMutation.mutateAsync(submissionData),
          sendTravelFormEmail(submissionData)
        ]);
      }
  
      router.push('/success');
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  const totalTravelers = Object.values(formData.groupSize).reduce(
    (sum, count) => sum + count,
  );

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <div className="flex w-full items-center justify-center bg-muted p-6 lg:w-1/2 lg:rounded-r-3xl">
        <img
          src={stepImages[step]}
          alt={`Step ${step + 1} illustration`}
          className="max-h-[300px] max-w-full rounded-lg object-contain shadow-lg lg:max-h-full"
        />
      </div>
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="flex flex-grow items-center overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="mb-6 text-left text-3xl font-bold lg:text-5xl">
              CREATE YOUR TRAVEL PERSONA
            </h1>
            <p className="mt-4 text-left text-xs text-muted-foreground lg:text-sm">
              {step + 1} of 3 steps • Approximately 3 minutes
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="text-2xl font-semibold">
                      Welcome! How would you like to continue?
                    </div>
                    <div className="flex flex-col space-y-4">
                      <SignInButton
                        mode="modal"
                        fallbackRedirectUrl="/quiz?step=1"
                        signUpFallbackRedirectUrl="/quiz?step=1"
                      >
                        <Button>Sign In</Button>
                      </SignInButton>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setStep(1);
                        }}
                        className="text-[#1C423C]"
                      >
                        Guest User
                      </Button>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      {isSignUp ? (
                        <div>
                          <Input
                            onClick={() => setIsSignUp(false)}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                      ) : (
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                        />
                      )}
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination *</Label>
                      <Input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        placeholder="Where would you like to go?"
                      />
                      {errors.destination && (
                        <p className="text-sm text-red-500">
                          {errors.destination}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Date Range *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.dateRange.from &&
                                "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dateRange.from ? (
                              formData.dateRange.to ? (
                                `${format(
                                  formData.dateRange.from,
                                  "LLL dd, yyy",
                                )} - ${format(formData.dateRange.to, "LLL dd, yyy")}`
                              ) : (
                                format(formData.dateRange.from, "LLL dd, yyy")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={formData.dateRange}
                            onSelect={handleDateRangeChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dateRange && (
                        <p className="text-sm text-red-500">
                          {errors.dateRange}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Group Size *</Label>
                      <div className="mt-2 flex items-center space-x-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Users className="mr-2 h-4 w-4" />
                              {totalTravelers}{" "}
                              {totalTravelers === 1 ? "Traveler" : "Travelers"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              {(
                                Object.keys(
                                  formData.groupSize,
                                ) as GroupSizeType[]
                              ).map((type) => (
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
                                        handleGroupSizeChange(type, "subtract")
                                      }
                                    >
                                      <MinusIcon className="h-4 w-4" />
                                    </Button>
                                    <span>{formData.groupSize[type]}</span>
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
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {errors.groupSize && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.groupSize}
                        </p>
                      )}
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
                        className="h-20"
                      />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <Label>Who do you relate to? *</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
                    {errors.travelerTypes && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.travelerTypes}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between">
              {step > 0 && (
                <Button
                  variant={"outline"}
                  onClick={handlePrev}
                  className="text-sm text-[#1C423C] lg:text-base"
                >
                  Back
                </Button>
              )}

              <div className="flex flex-grow justify-center">
                <Stepper currentStep={step} />
              </div>

              {step >= 1 && step < 2 && (
                <Button
                  onClick={handleNext}
                  className="text-sm text-white lg:text-base"
                >
                  Next
                </Button>
              )}

              {step === 2 && (
                <Button
                onClick={handleSubmit}
                className="text-sm text-white lg:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
