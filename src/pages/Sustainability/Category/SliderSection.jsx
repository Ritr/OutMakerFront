import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import image1 from "../../../assets/sustainability-page/image-2.png";
import image2 from "../../../assets/sustainability-page/image-1.png";
import image3 from "../../../assets/sustainability-page/image-3.png";

const SliderSection = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <div className="box-size">
            <img
              src={image1}
              className="object-cover h-full w-full"
              alt="our-product-category"
            />
            <div className="img-gradient absolute z-50 h-full w-full top-0">
              <div className="flex flex-col justify-center items-center h-full">
                <h3 className="text-center text-lg md:text-2xl text-[#00F0FF] tracking-[7px] md:tracking-[15.06px]">
                  SPACE TECHNOLOGY
                </h3>
                <h1 className="text-[33px] md:text-[50px] text-center font-bold">
                  For The Garden
                </h1>

                <button className="w-52 uppercase border border-[#00F0FF] text-[#00F0FF] px-[26px] py-4 mt-9 md:mt-[121px] rounded-xl hover:bg-[#20c2ce] hover:text-white hover:drop-shadow-2xl transition-all duration-500 ease-linear">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box-size">
            <img
              src={image2}
              className="object-cover h-full w-full"
              alt="our-product-category"
            />
            <div className="img-gradient absolute z-50 h-full w-full top-0">
              <div className="flex flex-col justify-center items-center h-full">
                <h3 className="text-center text-lg md:text-2xl text-[#00F0FF] tracking-[7px] md:tracking-[15.06px]">
                  SPACE TECHNOLOGY
                </h3>
                <h1 className="text-[33px] md:text-[50px] text-center font-bold">
                  For The Garden
                </h1>

                <button className="w-52 uppercase border border-[#00F0FF] text-[#00F0FF] px-[26px] py-4 mt-9 md:mt-[121px] rounded-xl hover:bg-[#20c2ce] hover:text-white hover:drop-shadow-2xl transition-all duration-500 ease-linear">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box-size">
            <img
              src={image3}
              className="object-cover h-full w-full"
              alt="our-product-category"
            />
            <div className="img-gradient absolute z-50 h-full w-full top-0">
              <div className="flex flex-col justify-center items-center h-full">
                <h3 className="text-center text-lg md:text-2xl text-[#00F0FF] tracking-[7px] md:tracking-[15.06px]">
                  SPACE TECHNOLOGY
                </h3>
                <h1 className="text-[33px] md:text-[50px] text-center font-bold">
                  For The Garden
                </h1>

                <button className="w-52 uppercase border border-[#00F0FF] text-[#00F0FF] px-[26px] py-4 mt-9 md:mt-[121px] rounded-xl hover:bg-[#20c2ce] hover:text-white hover:drop-shadow-2xl transition-all duration-500 ease-linear">
                  Discover
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderSection;
