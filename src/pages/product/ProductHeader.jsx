import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const ProductHeader = ({ product, category }) => {
  console.log(product);
  return (
    <header className="hero h-[50vh] lg:h-[66.666vw] relative overflow-hidden">
      <img
        src={ImgBaseUrl(
          category ? product?.collection_pic : product?.category_pic
        )}
        alt="Background"
        className="absolute inset-0 w-full h-full"
      />
      <div className="hero-content text-center relative z-10">
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
