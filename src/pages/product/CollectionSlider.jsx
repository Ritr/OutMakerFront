import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/images/product-collection.png";
import img2 from "../../assets/images/product-collection2.png";
import Network from "../../shared/Network/Network";
import "../../assets/css/product.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";

import SwiperWrapper from "../../components/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
const collections = [
  {
    id: 1,
    name: "LAPE",
    image: img1,
  },
  {
    id: 2,
    name: "RXTRADOS",
    image: img2,
  },
  {
    id: 3,
    name: "Lape",
    image: img1,
  },
];

const CollectionSlider = ({ filteredCollection }) => {
  return (
    <section className="w-full px-5 pb-10 relative product-collection">
      <div className="text-center ">
        <h2 className="mb-2 md:mb-4 text-center md:text-left color-[#181818] text-2xl font-medium">
          Other Collections
        </h2>
      </div>
      <SwiperWrapper
        showNavigation={true}
        swiperProps={{
          loop: false,
          spaceBetween: 10,
          breakpoints: {
            375: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
            },
          },
        }}
      >
        {filteredCollection?.map((collection) => (
          <SwiperSlide className="h-full">
            <div className="relative">
              <Link
                to={`/collection-product/${collection?.collection_id}/${collection?.collection_name}`}
                className="text-xl md:text-2xl lg:text-3xl"
              >
                <div className=" w-full flex items-center justify-center">
                  <img
                    src={ImgBaseUrl(collection?.collection_pic) + "?width=600"}
                    alt="IMAGE"
                    className="max-h-full h-32 md:h-[248px] max-w-full rounded object-cover"
                  />
                </div>
                <div className=" font-medium md:text-md absolute z-10 text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  {collection?.collection_name}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </SwiperWrapper>
      <div className="mb-8"></div>
      <Network />
    </section>
  );
};

export default CollectionSlider;
