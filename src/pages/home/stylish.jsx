/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/images/table1.png";
import img2 from "../../assets/images/table2.png";
import img3 from "../../assets/images/table3.png";
import "../../assets/css/stylish.css";
import useSubCategories from "../../Hooks/useSubCategories";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

import MV from "./material_video";

const services = [
  {
    id: 1,
    title: "Harriet Side Table",
    description:
      "HipVan Is Proud To Be Founded In Singapore. Like You, We're Young Adults Who Care About Creating An Inspiring Home We Call Our Own.",
    image: img1,
  },
  {
    id: 2,
    title: "Harriet Side Table",
    description:
      "HipVan Is Proud To Be Founded In Singapore. Like You, We're Young Adults Who Care About Creating An Inspiring Home We Call Our Own.",
    image: img2,
  },
  {
    id: 3,
    title: "Harriet Side Table",
    description:
      "HipVan Is Proud To Be Founded In Singapore. Like You, We're Young Adults Who Care About Creating An Inspiring Home We Call Our Own.",
    image: img3,
  },
  {
    id: 4,
    title: "Harriet Side Table",
    description:
      "HipVan Is Proud To Be Founded In Singapore. Like You, We're Young Adults Who Care About Creating An Inspiring Home We Call Our Own.",
    image: img1,
  },
];

const Stylish = () => {
  const { subCategories } = useSubCategories();
  
  return (
    <section className="w-full mx-auto  pt-10 md:pb-20  relative stylish">
      <div className="text-center pb-4 mt-1">
        <h2 className="text-primary font-semibold text-2xl md:text-4xl">
          Modular splicing design makes outdoor space more flexible
        </h2>
      </div>
      <MV videoSource="https://cdn.shopify.com/videos/c/o/v/2d814871cb4d47b1b00c1945ddcbc38b.mp4" />
      {/* <div className="text-center pb-4 mt-5">
        <h2 className="text-primary font-semibold text-2xl md:text-4xl mt-4">
          Transform Your Space with Outmaker Style
        </h2>
        <p className="text-[#513f3f] text-sm font-normal leading-10">
          Let the Outmaker's Style Revolutionize Your Space
        </p>
      </div> */}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
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
            items: 3,
          },
          tablet: {
            breakpoint: { max: 1024, min: 780 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 780, min: 0 },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        sliderclassName=""
        slidesToSlide={1}
        swipeable
      >
        {subCategories?.slice(0, 8).map((subCategory) => (
          <div key={subCategory?.subcategory_id} className="px-4">
            <div className="relative max-w-full  hover:overflow-hidden overflow-hidden bg-cover bg-no-repeat">
              <img
                src={ImgBaseUrl(subCategory?.subcategory_pic)}
                className="max-w-full"
                alt="Louvre"
              />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gradient-to-r from-primary via-primary-400 to-accent opacity-0 transition duration-300 ease-in-out hover:opacity-70"></div>
            </div>
            <h4 className="text-primary font-semibold text-xl py-2">
              {subCategory?.subcategory_name}
            </h4>
            <p className="text-primary font-normal text-xs">
              {subCategory?.subcategory_desc}
            </p>
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-[5%] left-[15%] bg-[#d5dfff] p-[1px] ml-20 w-[60%] stylish-devider"></div>
    </section>
  );
};

export default Stylish;
