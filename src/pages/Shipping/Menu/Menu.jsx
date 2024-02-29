import React from "react";
import { Link } from "react-scroll";

const Menu = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-x-2 overflow-x-hidden w-full mx-auto">
      <div className="group relative bg-primary px-4 py-12  md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          1
        </div>
        <Link to="shipping-details" smooth={true}>
          <h1 className="text-2xl md:text-[32px] font-medium text-center">
            Shipping Details
          </h1>
        </Link>
      </div>
      <div className="group relative bg-primary px-4 py-12 md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          2
        </div>
        <Link to="delivery-details" smooth={true}>
          
          <h1 className="text-2xl md:text-[32px] font-medium text-center">
            Delivery Details
          </h1>
        </Link>
      </div>
      <div className="group relative bg-primary px-4 py-12 md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          3
        </div>
        <Link to="scheduled-shipping" smooth={true}>
          
          <h1 className="text-2xl md:text-[32px] font-medium text-center">
            Scheduled Freight Shipping
          </h1>
        </Link>
      </div>
      <div className="group relative bg-primary px-4 py-12 md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          4
        </div>
        <Link to="parcel" smooth={true}>
          
          <h1 className="text-2xl md:text-[32px] font-medium text-center">
            Free Small Parcel Shipping
          </h1>
        </Link>
      </div>
      <div className="group relative bg-primary px-4 py-12 md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          5
        </div>
        <Link to="mixed-order" smooth={true}>
          <h1 className="text-2xl md:text-[32px] font-medium text-center">Mixed Orders</h1>
        </Link>
      </div> 
      <div className="group relative bg-primary px-4 py-12 md:py-[100px] w-[225px] text-white mt-[30px] cursor-pointer mx-auto">
        <div className="absolute -top-5 md:-top-6 left-[90px] md:left-[78px] bg-[#CD9A16] w-10 h-10 md:w-[60px] md:h-[60px] text-center rounded-full text-[25px] md:text-[40px]">
          6
        </div>
        <Link to="unique-deliveries" smooth={true}>
          <h1 className="text-2xl md:text-[32px] font-medium text-center">
            Unique Deliveries
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
