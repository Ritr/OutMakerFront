import React from "react";
import parcelImage from "../../../assets/shipping-page/image-5.png";

const ParcelDetails = () => {
  return (
    <>
      <div className="relative my-[30px]" id="parcel">
        <div className="h-[700px] lg:h-[600px]">
          <img
            src={parcelImage}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
        <div className="parcel-img-gradient h-full w-full absolute top-0 py-[90px] px-20 md:px-[100px] text-primary">
          <h1 className="text-2xl md:text-5xl font-semibold mb-8 font-shadow">
          Free Small Parcel Shipping
          </h1>
          <ul className="grid grid-cols-1 lg:grid-cols-2 md:text-2xl list-disc space-y-5">
            <li className="font-shadow">Ottomans</li>
            <li className="font-shadow">Coffee Tables</li>
            <li className="font-shadow">Side Tables</li>
            <li className="font-shadow">Small/Medium Outdoor Rugs</li>
            <li className="font-shadow">All-Weather Covers</li>
            <li className="font-shadow">Bug Shield Blankets</li>
            <li className="font-shadow">Dining Chairs sold separately from Dining Tables</li>
            <li className="font-shadow">Seating Accessories</li>
            <li className="font-shadow">Accessories</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ParcelDetails;
