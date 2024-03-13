import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import ImageScale from "../../components/ImageScale";
import useImageLoader from "../../Hooks/imageLoader";
import Skeleton from "react-loading-skeleton";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex]?.image_url;
  const imageLoaded = useImageLoader(ImgBaseUrl(currentImage));
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      partialVisibilityGutter: 80,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };

  return (
    <>
      <section className="mt-2 flex flex-col md:flex-row items-center gap-5 md:gap-10">
        <div className="hidden md:block w-full md:w-3/4">
          {imageLoaded ? (
            <img
              src={ImageScale(currentImage, 1000)}
              alt="Selected"
              className="w-full rounded-md cursor-zoom-in object-contain h-[725px]"
            />
          ) : (
            <Skeleton className=" w-full h-[500px]"></Skeleton>
          )}
        </div>
        <div className="w-full md:w-1/4 md:mt-auto">
          {imageLoaded ? (
            <Carousel
              responsive={responsive}
              ssr
              infinite={true}
              autoPlay={false}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
              partialVisible={true}
              beforeChange={(nextSlide, { currentSlide }) => {
                // console.log(images);

                let correctIndex = nextSlide - 2; // Get the correct index
                if (correctIndex >= images.length) {
                  correctIndex = 0;
                }
                if (correctIndex < 0) {
                  correctIndex = images.length + correctIndex;
                }
                setCurrentImageIndex(correctIndex);
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="mr-2"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={ImageScale(image?.image_url, 400)}
                    alt={`slider-image-${index}`}
                    className={`object-cover rounded-2xl drop-shadow-xl ${
                      currentImageIndex === index
                        ? "border-2 border-primary"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <Skeleton className=" w-full md:h-[200px]"></Skeleton>
          )}
        </div>
      </section>
    </>
  );
};

export default ImageSlider;
