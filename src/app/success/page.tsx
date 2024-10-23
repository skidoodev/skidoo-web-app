"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-backgroud-pop p-4">
      <Card className="max-w-2xl">
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          <div className="rounded-full bg-green-100 p-4 m-2">
            <CheckCircle className="h-12 w-12 text-green-600"/>
          </div>
          
          <h1 className="text-center text-3xl font-bold">Thank You for Creating Your Travel Persona!</h1>
          
          <div className="space-y-4 text-center text-muted-foreground">
            <p>
              We've received your travel preferences and will craft personalized recommendations just for you.
            </p>
            <p>
              We will reach out to you within 24 hours.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button 
              onClick={() => router.push('/')}
              className="min-w-[200px] m-2"
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}