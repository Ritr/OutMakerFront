import React, { useRef, useCallback } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const SwiperWrapper = ({ children, showNavigation, swiperProps }) => {
  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="relative">
      {showNavigation && (
        <div className="absolute z-10 top-[50%] left-[1rem] -translate-y-[50%]">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-[2rem] h-[2rem]  bg-[#626262] bg-opacity-50 text-white rounded-full  font-semibold"
          >
            <SlArrowLeft />
          </button>
        </div>
      )}
      <Swiper ref={sliderRef} loop={true} {...swiperProps} className="mySwiper">
        {children}
      </Swiper>
      {showNavigation && (
        <div className="absolute z-10 top-[50%] right-[1rem] -translate-y-[50%]">
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-[2rem] h-[2rem]  bg-[#626262] bg-opacity-50 text-white rounded-full  font-semibold"
          >
            <SlArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};
export default SwiperWrapper;
