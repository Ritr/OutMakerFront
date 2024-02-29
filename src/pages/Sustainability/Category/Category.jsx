import React from "react";
import image1 from "../../../assets/sustainability-page/image-4.png";
import image2 from "../../../assets/sustainability-page/image-5.png";
import image3 from "../../../assets/sustainability-page/image-3.png";
import image5 from "../../../assets/sustainability-page/image-6.png";
import SliderSection from "./SliderSection";
import { BsArrowRight } from "react-icons/bs";
const Category = () => {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="my-5">
          <SliderSection />
        </div>
        <div className="relative h-[300px] md:h-[650px]">
          <img
            src={image3}
            className="object-cover h-full w-full"
            alt="our-product-category"
          />
          <div className="img-gradient absolute z-50 h-full w-full top-0">
            <div className="flex flex-col justify-center items-center h-full">
              <h3 className="text-center text-xl md:text-3xl text-[#00F0FF] tracking-[7px] md:tracking-[15.06px] md:mb-5">
                TECHNOLOGY
              </h3>
              <h1 className="text-[30px] md:text-[50px] text-center font-bold">
                Environment Propulsion
              </h1>

              <button className="w-52 uppercase border border-[#00F0FF] text-[#00F0FF] px-[26px] py-4 mt-9 md:mt-[26px] rounded-xl hover:bg-[#20c2ce] hover:text-white hover:drop-shadow-2xl transition-all duration-500 ease-linear">
                Discover
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:flex-1 relative">
            <img
              src={image1}
              className="object-cover h-full w-full"
              alt="our-product-category"
            />
            <div className="img-gradient absolute z-50 h-full w-full top-0">
              <div className="group flex flex-col items-start justify-end h-full p-9">
                <div className="flex items-center gap-5 group text-2xl md:3xl lg:text-4xl cursor-pointer">
                  <p>Globally Inspired</p>
                  <p>
                    <BsArrowRight />
                  </p>
                </div>
                <div className="h-[5px] w-[20px] duration-500 transition-all ease-in-out bg-black rounded-lg -left-10 group-hover:w-1/2 mt-1"></div>
              </div>
            </div>
          </div>
          <div className="lg:flex-1 relative">
            <img
              src={image2}
              className="object-cover h-full w-full"
              alt="our-product-category"
            />
            <div className="img-gradient absolute z-50 h-full w-full top-0">
              <div className="group flex flex-col items-start justify-end h-full p-9">
                <div className="flex items-center gap-5 group text-2xl md:3xl lg:text-4xl cursor-pointer">
                  <p>Globally Inspired</p>
                  <p>
                    <BsArrowRight />
                  </p>
                </div>
                <div className="h-[5px] w-[20px] duration-500 transition-all ease-in-out bg-black rounded-lg -left-10 group-hover:w-1/2 mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[650px]">
          <img
            src={image5}
            className="object-cover h-full w-full"
            alt="our-product-category"
          />
          <div className="img-gradient absolute z-50 h-full w-full top-0">
            <div className="flex flex-col justify-center items-center h-full">
              <h3 className="text-center text-xl md:text-3xl text-[#00F0FF] tracking-[7px] md:tracking-[15.06px] md:mb-5">
                TECHNOLOGY
              </h3>
              <h1 className="text-[30px] md:text-[50px] text-center font-bold text-white">
                Environment Propulsion
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;

/* 

<div className="box-size">
            
          <img src={image1} className='object-cover md:object-fill h-full w-full' alt="our-product-category" />
          
          <div className="img-gradient absolute z-50 h-full w-full top-0"></div>
         
          <div className="absolute bottom-1/2 left-5 md:left-24 lg:left-0 transform lg:translate-x-1/2 translate-y-1/2">
            <h3 className="text-xl md:text-3xl text-primary tracking-[7px] md:tracking-[19.05px]">HYDROGEN MATERIAL</h3>
            <h1 className="text-[33px] md:text-[50px] tracking-[8px] md:tracking-[25px] text-center">HYPERSOFA</h1>
          </div>
        </div>


*/
