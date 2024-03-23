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
      <div className="text-left border-b-4 border-primary">
        <h2 className="text-primary text-xl md:text-3xl font-bold pb-3">
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
            <Link
              key={collection?.collection_id}
              to={`/collection-product/${collection?.collection_id}/${collection.collection_name}`}
            >
              <div className="py-6 md:py-10 ">
                <div className="relative text-center overflow-hidden h-[300px]">
                  <img
                    src={ImgBaseUrl(collection?.collection_pic)}
                    alt=""
                    className="hover:scale-125 transition ease-in-out duration-1000 object-cover w-full h-full"
                  />
                  <div
                    className="flex flex-col absolute"
                    style={{
                      top: "40%",
                      transform: "translate(-50%, 0)",
                      left: "50%",
                    }}
                  >
                    <p className="text-lg md:text-xl font-light text-white">
                      COLLECTION
                    </p>
                    <h4 className="text-4xl md:text-5xl text-white font-medium">
                      {collection?.collection_name}
                    </h4>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </SwiperWrapper>

      <Network />
    </section>
  );
};

export default CollectionSlider;
