import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export const Hero = () => {
  return (
    <div>
      <div className="bg-backgroud-pop text-backgroud-pop-secondary flex flex-col items-center justify-center pt-24 text-center 2xl:pt-36">
        <h3 className="mx-16 text-lg font-semibold">
          LOREM IPSUM DOLOR SIT AMET.
        </h3>
        <h1 className="mx-auto my-10 text-5xl font-black sm:text-7xl lg:mx-20 lg:text-7xl 2xl:mx-60">
          CONSECTETUR ELIT SED, DICTUM AT RINCIDUNT SIT AMET.
        </h1>
        <div className="text-lg font-medium">
          <h6>sed do eiusmod tempor incididunt ut labore.</h6>
          <h6 className="mx-10">
            Ut enim ad minim veniam, quis nostrud exercitation.
          </h6>
        </div>

        <div>
          <Link
            href="/quiz"
            className="group my-12 flex items-center justify-center gap-1 rounded-2xl border-2 border-[#1C423C] bg-[#FDCE00] px-6 py-3 text-2xl font-bold shadow-[5px_5px_0px_0px_#1C423C] transition-all hover:scale-110 lg:px-8 lg:py-4"
          >
            GET STARTED{" "}
            <BsArrowRight className="transition group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="my-6 rounded-full border-2 border-[#1C423C] bg-gray-50 px-8 py-4 text-2xl font-semibold 2xl:px-12">
          Maecenas odio ante tincidunt tempus. Donec vitae sapien libero
          venenatis faucibus. Etiam sit eget eros.
        </div>
      </div>
    </div>
  );
};
