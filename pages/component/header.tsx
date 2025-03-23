import React from "react";
import { LuPlus } from "react-icons/lu";
import { PiTelevisionDuotone } from "react-icons/pi";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50  h-[60px] md:h-[70px] flex items-center px-6 md:px-10">
      <div className="container flex justify-between items-center w-full">
        {/* Back Button */}
        <div className="w-9 h-9 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-[#89c5f1] cursor-pointer">
          <MdArrowBackIos className="text-white text-sm md:text-lg" onClick={handleBack} />
        </div>

        {/* Icons */}
        <div className="flex gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-[#89c5f1]">
            <LuPlus className="text-white text-sm md:text-lg" />
          </div>
          <div className="w-9 h-9 md:w-10 md:h-10 flex justify-center items-center rounded-full bg-[#89c5f1]">
            <PiTelevisionDuotone className="text-white text-sm md:text-lg" />
          </div>
        </div>
      </div>
    </nav>
  );
}
