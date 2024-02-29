import React from "react";
import topImage from "../../../assets/shipping-page/image-1.png";

const TopSection = () => {
  return (
    <div className="shipping-top h-full md:h-[600px]">
      <div className="text-white h-full flex flex-col items-start justify-center md:justify-end p-10 md:p-[100px]">
        <h1 className="text-2xl md:text-6xl mb-4 md:mb-6">
          Get Ready for your outmaker parcel journey
        </h1>
        <h4 className="text-sm md:text-2xl uppercase">
          Hot staff, fun staff, new staff soon to be your staff
        </h4>
        <div className="w-full md:w-10/12 h-[5px] bg-white mt-2 rounded-lg"></div>
      </div>
    </div>
  );
};

export default TopSection;

