import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export const Hero = () => {
  return (
    <div>
      <div className="w-full flex p-7 bg-gradient-to-r from-backgroud-pop to to-backgroud-pop-secondary">
        <div className="w-1/2">
          {/* hero text */}
        </div>
        <img className="w-1/2" src="/hero.png"></img>
      </div>
    </div>
  );
};
