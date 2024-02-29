import React from "react";
import image1 from "../../../assets/care-guide/image-1.png";
import image2 from "../../../assets/care-guide/image-2.png";
import image3 from "../../../assets/care-guide/image-3.png";
import image4 from "../../../assets/care-guide/image-8.png";
import image5 from "../../../assets/care-guide/image-9.png";
import image6 from "../../../assets/care-guide/image-4.png";
import image7 from "../../../assets/care-guide/image-5.png";

const ProductSection = () => {
  return (
    <section className="mb-[60px] p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        <div className="space-y-5 lg:h-[477px]  mb-[50px]">
          <img
            src={image1}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Bedding</h4>
        </div>
        <div className="space-y-5 lg:h-[477px]  mb-[50px]">
          <img
            src={image2}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Wellcoverings</h4>
        </div>
        <div className="space-y-5 lg:h-[477px]  mb-[50px]">
          <img
            src={image3}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Upholstry</h4>
        </div>
        <div className="space-y-5 lg:h-[477px]  mb-[50px]">
          <img
            src={image4}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Natural Materials</h4>
        </div>
        <div className="space-y-5 lg:col-span-2 h-[477px] mb-[50px]">
          <img
            src={image5}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Rugs</h4>
        </div>
        <div className="space-y-5 lg:col-span-2 h-[477px] mb-[50px]">
          <img
            src={image6}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Outdoor</h4>
        </div>
        <div className="space-y-5 lg:h-[477px]  mb-[50px]">
          <img
            src={image7}
            alt="our-products"
            className="object-cover w-full h-full"
          />
          <h4 className="text-xl text-center underline">Pillows & Throws</h4>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
