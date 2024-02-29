import React from "react";
import deliveryImage from '../../../assets/shipping-page/image-3.png'

const DeliveryDetails = () => {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-[30px] items-center my-[30px]" id="delivery-details">
        {/* text container */}
        <div className="flex-1 text-center px-5">
           <div className="text-primary space-y-10">
           <h1 className="text-5xl font-semibold">Delivery Details</h1>
            <p className="text-2xl">Freight shipments require an adult 18 or <br /> older to be present at time of delivery</p>
           </div>
        </div>
        {/* image container */}
        <div className="flex-1 md:px-20">
            <img src={deliveryImage} alt="our-delivery-service" />
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;
