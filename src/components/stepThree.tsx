import React from "react";
import { IconContext } from "react-icons/lib";
import { GiPathDistance } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

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
    <div className="p-[2px] relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-fit flex justify-center items-center mx-auto">
      <div className="flex flex-col gap-2 items-center justify-around lg:w-[768px] bg-white p-10 rounded-lg">
        <div className="relative w-full">
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your ideal vacation..."
            className="peer border h-[80px] border-gray-400 p-4 pb-1 pt-6 w-full focus:outline-blue-500 text-blue-500 rounded-sm placeholder:text-xs text-base"
          />
          <label
            htmlFor="description"
            className="flex gap-1 text-gray-700 text-md justify-center items-center absolute top-1 left-3 transition-all duration-200 peer-focus:text-gray-500 peer-focus:text-xs" 
          >
            <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
              <GiPathDistance />
            </IconContext.Provider>
            Describe your dream trip <span className="text-gray-400 text-sm">(Optional)</span>
          </label>
        </div>

        <div className="relative w-full">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="peer border border-gray-400 p-4 pb-1 pt-6 w-full focus:outline-blue-500 text-blue-500 rounded-sm placeholder:text-xs text-base"
          />
          <label
            htmlFor="email"
            className="flex gap-1 text-gray-700 text-md justify-center items-center absolute top-1 left-3 transition-all duration-200 peer-focus:text-gray-500 peer-focus:text-xs"
          >
            <IconContext.Provider value={{ size: "18px", color: "#3b82f6" }}>
              <MdEmail />
            </IconContext.Provider>
            Email Id
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
