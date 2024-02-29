import React from "react";
import image from "../../../assets/shipping-page/image-2.png";

const ShippingDetails = () => {
  return (
    <>
      <div className="relative mt-[30px]" id="shipping-details">
        <div className="h-screen md:h-[700px] lg:h-[600px]">
          <img src={image} className="object-cover w-full h-full" alt="" />
        </div>
        <div className="absolute top-[90px] px-10 md:px-[100px] text-white">
          <h1 className="text-2xl md:text-5xl font-semibold mb-8">
            Shipping Details
          </h1>
          <ul className="md:text-2xl list-disc space-y-5">
            <li>
              Purchasing and shipping is available only within the 48 contiguous
              United States.
            </li>
            <li>
              We cannot ship to PO Boxes, APO (Army Post Office), FPO (Fleet
              Post Office) , DPO (Diplomatic Post Office) destinations or to
              freight forwarders.
            </li>
            <li>
              If you ordered multiple products, you may receive multiple
              shipments.
            </li>
            <li>We do not offer expedited shipping.</li>
            <li>
              Partner products may not be shipped directly by Outer but Outer
              will be responsible for all order notifications and status updates
              from orders placed on liveouter.com.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
