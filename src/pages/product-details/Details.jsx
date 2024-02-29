import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../../shared/Button/Button";
import Description from "./Description";
import ImageSlider from "./ImageSlider";

const Details = ({ product, content, images }) => {
  console.log(images);
  return (
    <section className="w-full p-4 md:p-10">
      <h4 className=" text-xl font-semibold uppercase">Product details</h4>

      <div className="text-base font-normal py-4 leading-loose">
        <Description data={product?.p_l_description} />
      </div>

      {/* <ImageSlider images={images} /> */}
      {/* <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white font-normal">
        Cleaning Instructions <BsArrowRight className="ms-2" />
      </Button> */}

      {/* <h5 className="text-xl font-semibold text-primary pt-8">
        THIS SET INCLUDES
      </h5>
      <ul className="list-disc block md:flex gap-10 text-primary pl-4 pt-1">
        <li>Right Arm</li>
        <li>Left Arm</li>
        <li>Armless Inserts</li>
        <li>90° or 45° Corner</li>
      </ul> */}
    </section>
  );
};

export default Details;
