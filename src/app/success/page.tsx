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
      <DialogContent className="bg-white backdrop-blur-sm text-black max-w-md rounded-lg">
        <div className="flex flex-col items-center space-y-4 p-6">
          <div className="rounded-full bg-[#2472FC]/15 p-4 m-2">
            <CheckCircle className="h-12 w-12 text-[#2472FC]"/>
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-black">
              Thank You for Creating Your Travel Persona!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-center text-gray-700">
            <p>
              We've received your travel preferences and will craft personalized recommendations just for you.
            </p>
            <p>
              We will reach out to you within 24 hours.
            </p>
          </div>

          <Button 
            onClick={handleClose}
            className="min-w-[200px] bg-[#2472FC] text-white font-medium rounded-sm hover:scale-105 hover:bg-[#8711C1] transition-all m-2"
          >
            Return Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}