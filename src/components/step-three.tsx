import React from "react";
import { IconContext } from "react-icons/lib";
import { MdEmail } from "react-icons/md";
import { Card } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";

interface StepThreeProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const StepThree: React.FC<StepThreeProps> = ({
  description,
  setDescription,
  email,
  setEmail,
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto group">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2472FC] to-[#8711C1] rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

      <Card className="flex flex-col bg-white rounded-2xl shadow-xl hover:shadow-2xl duration-300 transition-all p-6 sm:p-12 border border-gray-100 relative w-full">
        <div className="flex flex-col gap-4 w-full">
          {/* Description Input */}
          <div className="relative w-full group">
            <div className="relative bg-white rounded-lg">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your ideal vacation..."
                rows={2}
                className="peer border px-4 pb-2 pt-10 w-full font-medium text-lg border-gray-300 rounded-lg focus:border-transparent text-[#3270d6] transition-all duration-300 relative hover:shadow-sm resize-none"
              />
              <label
                htmlFor="description"
                className="flex gap-1 text-lg text-gray-700 items-center absolute top-3 left-4 
                transition-all duration-200 peer-focus:text-muted-foreground peer-focus:text-base peer-focus:top-3"
              >
                <NotebookPen className="text-[#3b82f6] h-[18px] w-[18px]"/>
                Describe your dream trip{" "}
                <span className="text-gray-400 text-sm ml-1">(Optional)</span>
              </label>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative w-full">
            <div className="relative bg-white rounded-lg">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="peer border px-4 pb-2 pt-10 w-full font-medium text-lg border-gray-300 rounded-lg focus:border-transparent text-[#3270d6] transition-all duration-300 relative hover:shadow-sm"
              />
              <label
                htmlFor="email"
                className="flex gap-1 text-lg text-gray-700 items-center absolute top-3 left-4 
                transition-all duration-200 peer-focus:text-muted-foreground peer-focus:text-base peer-focus:top-3"
              >
                <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
                  <MdEmail />
                </IconContext.Provider>
                Email Address
              </label>
            </div>
          </div>

          {/* Hint text */}
          <p className="text-sm text-gray-500">
            We'll send your personalized travel plan to this email address.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepThree;