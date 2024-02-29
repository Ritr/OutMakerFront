import React from 'react';
import image1 from '../../../assets/sustainability-page/image-1.png'

const TopSection = () => {
    return (
        <div className="box-size">
          <img
            src={image1}
            className="object-cover md:object-fill h-full w-full"
            alt="our-product-category"
          />
          <div className="img-gradient absolute h-full w-full top-0">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-center text-xl md:text-3xl text-[#00F0FF] tracking-[7px] md:tracking-[19.05px]">
                HYDROGEN MATERIAL
              </h3>
              <h3 className="text-[33px] md:text-[50px] tracking-[8px] md:tracking-[25px] text-center">
                HYPERSOFA
              </h3>
            </div>
          </div>
        </div>
    );
};

export default TopSection;