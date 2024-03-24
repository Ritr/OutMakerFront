import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../../shared/Button/Button";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";

const Dimensions = ({ dimensions }) => {
  return (
    <section className="container mx-auto p-4 md:p-10">
      <h4 className="text-black text-xl font-medium uppercase">
        Dimensions
      </h4>

      <div className="py-6">
        {dimensions?.map((dimension) => (
          <div
            key={dimension?.dimension?.dim_id}
            className="md:flex gap-4 py-4"
          >
            <div className="h-full border-2 border-gray-200 rounded-lg text-black font-normal text-base  md:w-1/3 p-4 mb-4 md:mb-0">
              <p>
                {dimension?.dimension?.dim_title}
                <span className="px-2">WIDTH</span>
                {dimension?.dimension?.dim_width}" x{" "}
                {dimension?.dimension?.dim_length}' x{" "}
                {dimension?.dimension?.dim_height}"
              </p>
              <p>Weight: {dimension?.dimension?.dim_weight}</p>
            </div>
            <div className="md:w-2/3">
              <img
                src={ImgBaseUrl(dimension?.dimension?.dim_pic)}
                alt={dimension?.dimension?.dim_title}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white font-normal px-6 mt-5">
        View Full Spec PDF <BsArrowRight className="ms-2" />
      </Button> */}
    </section>
  );
};

export default Dimensions;
