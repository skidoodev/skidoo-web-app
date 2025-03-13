"use client";

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ItineraryFormProps {
  onSubmit: (data: {
    destination: string;
    duration: string;
    budget: string;
    travelStyle: string;
    preferences: string;
  }) => void;
  isLoading: boolean;
}

export default function ItineraryForm({ onSubmit, isLoading }: ItineraryFormProps) {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3');
  const [budget, setBudget] = useState('mid-range');
  const [travelStyle, setTravelStyle] = useState('explorer');
  const [preferences, setPreferences] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      destination,
      duration,
      budget,
      travelStyle,
      preferences
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          placeholder="e.g., Paris, Tokyo, New York"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (days)</Label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger id="duration">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day} {day === 1 ? 'day' : 'days'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger id="budget">
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="mid-range">Mid-range</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="travelStyle">Travel Style</Label>
        <Select value={travelStyle} onValueChange={setTravelStyle}>
          <SelectTrigger id="travelStyle">
            <SelectValue placeholder="Select travel style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="explorer">Explorer (mix of everything)</SelectItem>
            <SelectItem value="culture">Culture & History</SelectItem>
            <SelectItem value="foodie">Foodie</SelectItem>
            <SelectItem value="adventure">Adventure & Outdoors</SelectItem>
            <SelectItem value="relaxation">Relaxation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferences">Additional Preferences (Optional)</Label>
        <Textarea
          id="preferences"
          placeholder="Any specific interests, dietary restrictions, accessibility needs, etc."
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-[#2472FC] to-[#8711C1]" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Itinerary...
          </>
        ) : (
          'Generate Itinerary'
        )}
      </Button>
    </form>
  );
}