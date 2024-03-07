import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const NavbarTop = () => {
  return (
    <div className="bg-primary text-white py-3" id="tip">
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <p className="text-xs md:text-sm lg:text-base underline w-full text-center flex justify-center items-center">
            30% discount. shipping Australia wide
            <AiOutlineArrowRight className="ml-2" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
