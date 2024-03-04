import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const ProductHeader = ({ product, category }) => {
  console.log(product);
  return (
    <header className="hero md:mb-0 lg:h-auto relative overflow-hidden pt-24 md:pt-0 ">
      <div
        className="absolute left-0 top-0 right-0 bottom-0"
        style={{
          backgroundImage:
            "url(" +
            ImgBaseUrl(
              category ? product?.collection_pic : product?.category_pic
            ) +
            ")",
          backgroundSize: "contain",
          filter: "blur(10px)",
          zIndex: "-1",
        }}
      ></div>
      <img
        src={ImgBaseUrl(
          category ? product?.collection_pic : product?.category_pic
        )}
        alt="Background"
        className="inset-0  object-contain md:w-[50%] sm:w-full"
      />
      <div className="hero-content text-center relative z-10 ">
        <div className="max-w-full">
          <p className="pb-4 text-white">
            {category ? "CATEGORY" : "COLLECTION"}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-white font-semibold uppercase">
            {category ? product?.collection_name : product?.category_name}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
