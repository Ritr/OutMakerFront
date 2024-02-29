import React from "react";
import image1 from "../../../assets/about-section-images/image-3.png";
import image2 from "../../../assets/about-section-images/image-4.png";
import image3 from "../../../assets/about-section-images/image-5.png";

const PhotoGallery = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="relative">
          <div>
            <img src={image1} alt="our-design" />
          </div>
          <div className="group cursor-pointer">
            <div className="absolute z-50 bottom-9 left-7">
              <div className="text-3xl font-bold text-white">
                <span>Globally Inspired +</span>
                <div className="h-[5px] w-[20px] hover:w-full duration-500 transition-all ease-in-out bg-white rounded-lg -left-10 group-hover:w-full mt-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div>
            <img src={image2} alt="our-design" />
          </div>
          <div className="group cursor-pointer">
            <div className="absolute z-50 bottom-9 left-7">
              <div className="text-3xl font-bold text-white">
                <span>Our Commitment  +</span>
                <div className="h-[5px] w-[20px] hover:w-full duration-500 transition-all ease-in-out bg-white rounded-lg -left-10 group-hover:w-full mt-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-2">
          <div>
            <img src={image3} alt="our-design" />
          </div>
          <div className="group cursor-pointer">
            <div className="absolute z-50 bottom-9 left-7">
              <div className="text-3xl font-bold text-white">
                <span>A Crate Storey  +</span>
                <div className="h-[5px] w-[20px] hover:w-full duration-500 transition-all ease-in-out bg-white rounded-lg -left-10 group-hover:w-full mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;
