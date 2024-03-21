import React, { useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import roundedImage from "../../assets/images/slider-rounded.png";
import slider1 from "../../assets/images/details-slider1.png";
import slider2 from "../../assets/images/details-slider2.png";
import slider3 from "../../assets/images/details-slider3.png";
import slider4 from "../../assets/images/video.mp4";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/details.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { FaPlay } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GoSearch } from "react-icons/go";
const DetailsSlider = ({
  product,
  images,
  Product_Colors,
  dimensions,
  collectionId,
  collectionName,
}) => {
  const [headerImage, setHeaderImage] = useState(null);
  const images2 = [{ image_url: product.p_pic }, ...images];
  // handler for image change
  const handleImageClick = (image) => {
    setHeaderImage(image);
  };
  const carouselRef = React.useRef(null);

  const handleNext = () => {
    carouselRef.current.next();
    let index = images2.findIndex((item) => {
      return ImgBaseUrl(item.image_url) === headerImage;
    });
    let nextIndex = index + 1;
    if (nextIndex <= 0) {
      nextIndex = 1;
    }
    if (nextIndex >= images2.length) {
      nextIndex = 0;
    }
    let image = images2[nextIndex];
    setHeaderImage(ImgBaseUrl(image.image_url));
  };

  const handlePrev = () => {
    carouselRef.current.previous();
    let index = images2.findIndex((item) => {
      return ImgBaseUrl(item.image_url) === headerImage;
    });
    let prevIndex = index - 1;
    if (prevIndex < 0) {
      prevIndex = images2.length - 1;
    }
    let image = images2[prevIndex];
    setHeaderImage(ImgBaseUrl(image.image_url));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (images && images.length) {
      // console.log(images);
      // setHeaderImage(ImgBaseUrl(images[0].image_url));
    }
  }, images);

  return (
    <header>
      <div className="text-center w-full ">
        <div className="hidden md:block absolute top-10 right-0">
          <div className="bg-[#EDEDEF] px-2 py-2 mb-2 text-xs text-center">
            THIS SET INCLUDES
          </div>
          <div className="border border-color-[#E3E3E3] text-left px-3 py-3 pb-0 rounded-sm">
            {dimensions.map((item, index) => {
              return (
                <div className="flex items-center mb-3 text-xs">
                  <div className="mr-2 justify-center items-center flex h-6 w-6 rounded-full border border-[#002B5B] bg-[#D8EDF5]">
                    {index + 1}
                  </div>
                  <span className="">{item.dimension.dim_title}</span>
                </div>
              );
            })}
          </div>
        </div>
        <Link to={`/collection-product/${collectionId}/${collectionName}`}>
          <div className=" hidden md:flex p-6 py-2 w-52 md:absolute top-[500px] right-0 border rounded-full  items-center justify-center">
            <GoSearch className="mr-2"></GoSearch> Explore collection
          </div>
        </Link>
        <div>
          <div className="block md:flex items-center justify-center">
            <h4 className="uppercase text-xl md:text-3xl font-semibold">
              {product?.p_name}
            </h4>
          </div>

          {/* <div className="flex items-center justify-center mt-2">
            <Rating
              style={{ maxWidth: 100 }}
              value={product?.review ? product?.review?.[0]?.review : 4.5}
              readOnly
            />
          </div> */}
          <div className="flex flex-wrap justify-start ml-14">
            <div className="flex gap-4 pt-2">
              {Product_Colors.map(({ color }) => (
                <div key={color.color_id} className="text-center">
                  <div
                    style={{ backgroundColor: color.color_code }}
                    className="h-9 w-9 rounded-full mx-auto"
                  ></div>
                  <p className="text-xs text-[#666666] font-normal">
                    {color.color_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {headerImage?.endsWith(".mp4") ? (
          <div className="h-[25vh] lg:h-[370px] mx-auto">
            <video
              className="w-full h-full"
              controls
              muted
              poster={headerImage}
            >
              <source src={headerImage} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="">
            <img
              src={headerImage ? headerImage : ImgBaseUrl(product?.p_pic)}
              alt="Product Image"
              className=" h-28 md:h-[430px] lg:h-[500px] w-full object-cover mt-5 mb-3"
            />
          </div>
        )}
        <div className="flex justify-end md:hidden">
          <Link to={`/collection-product/${collectionId}/${collectionName}`}>
            <div className="flex mt-4 mb-2 mr-4 p-6 py-2 w-52 border rounded-full  items-center justify-center">
              <GoSearch className="mr-2"></GoSearch> Explore collection
            </div>
          </Link>
        </div>

        <div className="bg-[#f3f3f3] rounded-md px-4 py-4 md:px-[57px] md:py-[24px] flex items-center justify-center">
          {/* {JSON.stringify(images)} */}
          {/* <img
                      src={ImgBaseUrl(images[0]?.image_url)}
                      alt=""
                      className="object-cover md:object-contain w-full h-full"
                    /> */}
          {images2.length && (
            <div>
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-[2rem] h-[2rem] md:w-[53px] md:h-[53px] bg-[#626262] bg-opacity-50 text-white rounded-full md:text-2xl font-semibold"
              >
                <SlArrowLeft />
              </button>
            </div>
          )}
          <Carousel
            itemClass="carousel-item-padding"
            className="md:mx-[130px] w-full"
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            containerclassName="container-with-dots"
            dotListclassName=""
            draggable
            focusOnSelect={false}
            infinite
            itemclassName=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 5000, min: 1024 },
                items: 6,
              },
              tablet: {
                breakpoint: { max: 1024, min: 780 },
                items: 6,
              },
              mobile: {
                breakpoint: { max: 780, min: 0 },
                items: 5,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderclassName=""
            slidesToSlide={1}
            swipeable
            ref={carouselRef}
          >
            {images2?.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(ImgBaseUrl(image?.image_url))}
                className="cursor-pointer"
              >
                <div
                  className={`lg:w-[150px] lg:h-[150px] h-[3rem] w-[3rem] bg-white mx-auto flex justify-center items-center rounded ${
                    headerImage === ImgBaseUrl(image?.image_url)
                      ? "border-2 border-primary"
                      : ""
                  }`}
                >
                  {image?.image_url?.endsWith(".mp4") ? (
                    <div className="relative w-full h-full">
                      <video
                        src={ImgBaseUrl(image?.image_url)}
                        className="object-cover w-full h-full"
                      ></video>
                      <FaPlay className="absolute inset-0 m-auto" />
                    </div>
                  ) : (
                    <img
                      src={ImgBaseUrl(image?.image_url) + "?width=300"}
                      alt=""
                      className="object-cover md:object-contain w-full h-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </Carousel>
          {images2.length && (
            <div>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-[2rem] h-[2rem] lg:w-[53px] lg:h-[53px] bg-[#626262] bg-opacity-50 text-white rounded-full md:text-2xl font-semibold"
              >
                <SlArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DetailsSlider;
