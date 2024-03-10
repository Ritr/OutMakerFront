import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";
import ImgBaseUrl from "../ImgBaseUrl/ImgBaseUrl";
import Aluminum from "../../assets/Navbar/product-item/Aluminum.svg";
import Wicker from "../../assets/Navbar/product-item/Wicker.svg";
import Teak from "../../assets/Navbar/product-item/Teak.svg";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import useImageLoader from "../../Hooks/imageLoader";

const ProductItems = () => {
  const { categories } = useCategories();

  // Material Buttons component for reuse
  const MaterialButtons = () => (
    <div className="grid grid-cols-3 gap-1 md:flex md:flex-wrap md:gap-1 items-center">
      <p className="hidden md:block mr-2">Aluminum</p>
      {/* Button for Aluminum */}
      <button className="flex items-center justify-center gap-1 bg-primary text-white text-sm py-2 md:text-lg md:py-4 px-4 md:px-7 rounded-full hover:bg-white hover:text-primary border border-primary transition duration-500 ease-in-out">
        <img src={Aluminum} alt="Aluminum" className="h-6 w-6" />
        <span>Aluminum</span>
      </button>
      {/* Button for Wicker */}
      <button className="flex items-center justify-center gap-1 bg-gray-300 text-black text-sm py-2 md:text-lg md:py-4 px-4 md:px-7 rounded-full hover:bg-white hover:text-primary border border-primary transition duration-500 ease-in-out">
        <img src={Wicker} alt="Wicker" className="h-6 w-6" />
        <span>Wicker</span>
      </button>
      {/* Button for Teak */}
      <button className="flex items-center justify-center gap-1 bg-gray-300 text-black text-sm py-2 md:text-lg md:py-4 px-4 md:px-7 rounded-full hover:bg-white hover:text-primary border border-primary transition duration-500 ease-in-out">
        <img src={Teak} alt="Teak" className="h-6 w-6" />
        <span>Teak</span>
      </button>
    </div>
  );

  const handleImageLoaded = (categoryId) => {
    setLoadedImages((prevState) => ({ ...prevState, [categoryId]: true }));
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const ImageWithSkeleton = ({ src, alt, width, height }) => {
    const imageLoaded = useImageLoader(ImgBaseUrl(src));
    return (
      <>
        {/* {!imageLoaded ? (
          <Skeleton width={width} className="h-40" />
        ) : ( */}
        <img src={src} style={{ display: "block", height: "120px" }} alt="" />
        {/* )} */}
      </>
    );
  };

  return (
    <>
      <section className=" w-full bg-white py-5 p-1 md:p-0">
        {/* Material Buttons - shown at the top on mobile */}
        {/* <div className="block md:hidden mb-4">
          <MaterialButtons />
        </div> */}

        <h3 className="text-primary font-medium text-xl mb-7 uppercase hidden md:block">
          Outmaker Products
        </h3>

        {/* Grid layout for products */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {categories?.map((category) => (
            <Link
              to={`category-product/${category?.category_id}/${category?.category_url}`}
            >
              <motion.div
                key={category?.category_id}
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.7 }}
                className="p-2 min-h-40"
              >
                <ImageWithSkeleton
                  src={ImgBaseUrl(category?.category_pic)}
                  alt={category?.category_name}
                  width="100%"
                />

                <p className="mt-2 text-sm py-2 text-center md:text-lg text-gray-500 md:text-black">
                  {category?.category_name}
                </p>
                {/* <p className="text-sm text-gray-600 hidden md:block">
                  {category?.category_desc}
                </p> */}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Material Buttons and "View All Products" button in the same row for desktop */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-8">
          <Link to="/categories" className="mb-4 md:mb-0">
            <button className="flex items-center gap-2 bg-primary text-white text-lg py-4 px-7 rounded-full hover:bg-white hover:text-primary border border-primary duration-500 transition-all ease-in-out">
              <span>View All Products</span>
              <FaArrowRight />
            </button>
          </Link>
          <div className="hidden md:block">{/* <MaterialButtons /> */}</div>
        </div>
      </section>
    </>
  );
};

export default ProductItems;
