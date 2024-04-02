import React, { useRef, useState, useEffect } from "react";
import img1 from "../../assets/images/fabrics.png";
import img2 from "../../assets/images/leather.png";
import img3 from "../../assets/images/metal.png";
import img4 from "../../assets/images/wood.png";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { FaRegQuestionCircle } from "react-icons/fa";

// Product_Materials
const Meterials = ({ productMaterials }) => {
  return (
    <section className="py-10 md:py-20">
      <div className="w-full ">
        <div className="text-center w-4/5 md:w-2/3 mx-auto">
          <h2 className="text-primary font-medium text-2xl md:text-4xl">
            Product Main Materials
            <div className="tooltip ml-2" data-tip="Note: This is only a rough explanation of the functions and characteristics of the materials. Some material images may not necessarily represent the material images of the product.also does not include all other materials">
              <FaRegQuestionCircle ></FaRegQuestionCircle>
            </div>
          </h2>
        </div>
        <br></br>
        {productMaterials.map((meterial) => (
          <div key={meterial?.material_id} className="mt-4">
            <div className="hidden md:block">
              <img
                className="rounded-lg object-fill w-full h-full"
                src={ImgBaseUrl(meterial.material?.material_pic)}
                alt=""
              />
            </div>
            <div className=" md:hidden">
              {meterial.material?.material_pic_mob && (
                <img
                  className="rounded-lg object-fill w-full h-full"
                  src={ImgBaseUrl(meterial.material?.material_pic_mob)}
                  alt=""
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Meterials;
