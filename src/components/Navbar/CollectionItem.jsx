/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/stylish.css";
import { FaArrowRight } from "react-icons/fa";
import useCollections from "../../Hooks/useCollections";
import ImgBaseUrl from "../ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

const CollectionItem = () => {
  const { collections } = useCollections();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [infinite, setInfinite] = useState(false);
  useEffect(() => {
    if (collections?.length > 0) {
      setIsDataLoaded(true);
    }
  }, [collections]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <section className=" bg-white py-5 md:p-0">
        <div className="pb-20 relative stylish">
          <h3 className="text-primary font-medium text-xl mb-7 uppercase">
            Outmaker Collection
          </h3>
          <Carousel
            key={collections.length}
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerclassName="container-with-dots"
            dotListclassName=""
            draggable
            focusOnSelect={false}
            infinite={false}
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
            {collections?.map((collection) => (
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
                        src={ImgBaseUrl(collection?.collection_pic)}
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
            ))}
          </Carousel>

          <div className="absolute bottom-[5%] left-[15%] bg-[#d5dfff] p-[1px] ml-20 w-[60%] stylish-devider"></div>
        </div>

        {/* button */}
        <div className="my-12 flex items-center lg:items-start justify-center lg:justify-end">
          <Link to="/collections">
            <button className="flex items-center gap-2 bg-primary text-white text-lg py-4 px-7 rounded-full hover:bg-white hover:text-primary border border-primary duration-500 transition-all ease-in-out">
              <span>View All Collections</span>
              <span>
                <FaArrowRight />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CollectionItem;
