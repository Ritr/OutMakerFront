import React from "react";
import image from "../../../assets/shipping-page/image-4.png";
import { LuSofa } from "react-icons/lu";
import { MdTableRestaurant } from "react-icons/md";
import { TbBrandAirtable } from "react-icons/tb";
const ScheduledDetails = () => {
  return (
    <>
      <div className="relative h-[700px] lg:h-full mb-[30px]" id="scheduled-shipping">
        {/* image contianer */}
       
          <img src={image} 
          className="object-cover h-full w-full"
          alt="our-shipping-service" />
        
        {/* text container */}
        <div className="schedule-img-gradient text-primary absolute top-0 w-full h-full p-8 md:px-[100px] md:py-[90px]">
          <h1 className="text-4xl md:text-5xl font-semibold mb-10">Scheduled Premium Freight Shipping</h1>
          <p className="text-xl md:text-2xl mb-8 md:mb-16">
            For the following products, our standard scheduled freight delivery
            is $275 and includes the delivery, placement in area/room of choice,
            unpacking and removal of all packaging materials. For All-Weather
            Wicker seating, you will need to attach the legs with the tools
            provided. You will be contacted by FedEx when the product is shipped
            to schedule your delivery.
          </p>
          {/* icon container */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap md:gap-7 px-2">
            <div className="flex gap-4">
              {/* icon container */}
              <div className="bg-primary text-white flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                <LuSofa className="text-5xl" />
              </div>
              {/* text  */}
              <h3 className="text-lg font-semibold">
                Sofas, Sectionals, and <br /> Modular Chairs
              </h3>
            </div>
            <div className="flex gap-4">
              {/* icon container */}
              <div className="bg-primary text-white flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                <MdTableRestaurant className="text-5xl" />
              </div>
              {/* text  */}
              <h3 className="text-lg font-semibold">
              Fire Pit Table
              </h3>
            </div>
            <div className="flex gap-4">
              {/* icon container */}
              <div className="bg-primary text-white flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                <TbBrandAirtable className="text-5xl" />
              </div>
              {/* text  */}
              <h3 className="text-lg font-semibold">
              Large Outdoor Rugs
              </h3>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduledDetails;
