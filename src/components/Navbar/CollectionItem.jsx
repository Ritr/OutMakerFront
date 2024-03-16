/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/stylish.css";
import { FaArrowRight } from "react-icons/fa";
import useCollections from "../../Hooks/useCollections";
import ImgBaseUrl from "../ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperWrapper from "../SwiperWrapper";
const CollectionItem = () => {
  const { collections } = useCollections();
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const [progressValue, setProgressValue] = useState(0);

  return (
    <>
      <section className=" bg-white py-5 md:p-0">
        <div className="pb-4 relative stylish">
          <h3 className="text-primary font-medium text-xl mb-7 uppercase">
            Outmaker Collection
          </h3>
          <SwiperWrapper
            showNavigation={true}
            prevClassName="top-24 md:top-32 "
            nextClassName="top-24 md:top-32  "
            swiperProps={{
              loop: false,
              onProgress: (swiper, progress) => {
                setProgressValue(Math.ceil(progress * 10) * 10);
              },
              breakpoints: {
                375: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4.5,
                  spaceBetween: 20,
                },
              },
            }}
          >
            {collections?.map((collection) => (
              <SwiperSlide>
                <motion.div
                  key={collection?.collection_id}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <div className=" space-y-[16px] text-primary border border-gray-50 p-3 rounded card-hover">
                    <Link
                      to={`collection-product/${collection?.collection_id}/${collection?.collection_name}`}
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      <div
                        className=" w-full flex items-center justify-center"
                        style={{
                          height: 0,
                          paddingBottom: "66.666%",
                          position: "relative",
                        }}
                      >
                        <img
                          src={ImgBaseUrl(collection?.collection_pic)+"?width=600"}
                          alt="IMAGE"
                          className="max-h-full h-full max-w-full rounded object-cover"
                          style={{ position: "absolute", left: 0, top: 0 }}
                        />
                      </div>

                      {collection?.collection_name}

                      <p className="text-xs pb-6">
                        {collection?.collection_desc &&
                          collection.collection_desc
                            .split(" ")
                            .slice(0, 20)
                            .join(" ")}{" "}
                        ....
                      </p>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </SwiperWrapper>
        </div>
        <div className="md:flex justify-between pb-12 gap-4  items-center">
          <progress
            className="progress [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary flex-1 duration-500 transition-all"
            value={progressValue}
            max="100"
          ></progress>
          <Link to="/collections">
            <button className="mt-4 mx-auto md:mt-0 flex items-center gap-2 bg-primary text-white text-lg py-4 px-7 rounded-full hover:bg-white hover:text-primary border border-primary duration-500 transition-all ease-in-out">
              <span>View All Collections</span>
              <span>
                <FaArrowRight />
              </span>
            </button>
          </Link>
        </div>
        {/* button */}
        {/* <div className="my-12 flex items-center lg:items-start justify-center lg:justify-end">
          <Link to="/collections">
            <button className="flex items-center gap-2 bg-primary text-white text-lg py-4 px-7 rounded-full hover:bg-white hover:text-primary border border-primary duration-500 transition-all ease-in-out">
              <span>View All Collections</span>
              <span>
                <FaArrowRight />
              </span>
            </button>
          </Link>
        </div> */}
      </section>
    </>
  );
};

export default CollectionItem;
