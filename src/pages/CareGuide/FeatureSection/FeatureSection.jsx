import React from "react";
import image1 from "../../../assets/care-guide/image-9.png";
import image2 from "../../../assets/care-guide/image-7.png";
import image3 from "../../../assets/care-guide/image-6.png";

const FeatureSection = () => {
  return (
    <section className="mb-[60px] p-5">
      <div className="text-primary mb-9">
        <h1 className="text-2xl lg:text-4xl font-bold mb-1">
          Ready to live out all your design dreams ?
        </h1>
        <div className="h-1 bg-primary"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-5 border-b-4 border-[#002B5B] pb-12">
          <div className="h-[712px]">
            <img
              src={image1}
              alt="our-best-features"
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-3xl font-medium">Free 2-Day Delivery</h3>
          <p className="text-2xl">
            Need it ASAP? Thousands of styles deliever to you within 2 days.
          </p>
        </div>
        <div className="space-y-5 border-b-4 border-[#002B5B] pb-12">
          <div className="h-[712px]">
            <img
              src={image2}
              alt="our-best-features"
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-3xl font-medium">Free Design Services</h3>
          <p className="text-2xl">
            We have everything you need to help bring bring your space to life.
          </p>
        </div>
        <div className="space-y-5 border-b-4 border-[#002B5B] pb-12">
          <div className="h-[712px]">
            <img
              src={image3}
              alt="our-best-features"
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-3xl font-medium">Shop online & In-store</h3>
          <p className="text-2xl">
            Wherever you like to shop, the latest trends are ready for you to
            take home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
