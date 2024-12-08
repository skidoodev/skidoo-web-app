"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function SuccessDialog() {
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    router.push('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-black/70 backdrop-blur-sm text-white max-w-md rounded-lg">
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="rounded-full bg-[#5048E2]/15 p-4 m-2">
            <CheckCircle className="h-12 w-12 text-[#5048E2]"/>
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-white">
              Thank You for Creating Your Travel Persona!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-center text-gray-300">
            <p>
              We've received your travel preferences and will craft personalized recommendations just for you.
            </p>
            <p>
              We will reach out to you within 24 hours.
            </p>
          </div>

          <Button 
            onClick={handleClose}
            className="min-w-[200px] bg-[#4F49E3] text-white font-medium rounded-sm hover:scale-105 hover:bg-[#5050E6] transition-all m-2"
          >
            Return Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}