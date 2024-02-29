import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import { Pagination, Navigation } from "swiper/modules";

// ... (import statements)

const ImageSlider = ({ images }) => {
  const [sideImage, setSideImage] = useState("");
  const [currentImage, setCurrentImage] = useState(images[0]?.image_url);
  const [zoomed, setZoomed] = useState(false);

  const handleMouseEnter = () => {
    setZoomed(true);
  };

  const handleMouseLeave = () => {
    setZoomed(false);
  };

  const handlePaginationClick = (image) => {
    setSideImage(image);
    setCurrentImage(image);
  };

  const handleSlideChangeTransitionEnd = (swiper) => {
    const currentIndex = swiper.activeIndex;
    const newImage = images[currentIndex]?.image_url;

    // Use callback to ensure state updates are based on the previous state
    setSideImage((prevSideImage) =>
      prevSideImage === newImage ? prevSideImage : newImage
    );
    setCurrentImage((prevCurrentImage) =>
      prevCurrentImage === newImage ? prevCurrentImage : newImage
    );
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row items-end gap-5 lg:gap-10 mb-20">
        <div
          className="hidden md:flex md:w-[3500px] p-3 lg:h-[670px] mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={ImgBaseUrl(sideImage === "" ? currentImage : sideImage)}
            alt=""
            className={`w-full h-full rounded-md cursor-zoom-in ${
              zoomed ? "zoomed" : ""
            }`}
          />
        </div>

        <div className="w-full overflow-hidden">
          <div>
            <Swiper
              modules={[Pagination, Navigation]} // Add Navigation module
              navigation={true}
              loop={true}
              className="w-full h-[340px]"
              spaceBetween={0}
              slidesPerView="auto"
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handlePaginationClick(image?.image_url)}
                  className="px-2 pb-10"
                >
                  <img
                    src={ImgBaseUrl(image?.image_url)}
                    alt="slider-image"
                    className={`object-fill h-full w-full rounded-2xl drop-shadow-xl ${
                      currentImage === image?.image_url
                        ? "border-2 border-primary"
                        : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImageSlider;
