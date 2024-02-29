import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../../shared/Button/Button";

const Warranty = () => {
  return (
    <section className="container mx-auto p-4 md:p-10">
      <h4 className=" text-xl font-semibold uppercase">
        Warranty
      </h4>
      <p className="text-xs  py-4 leading-loose">
        At Outmaker, your outdoor furniture comes with professional warranty
        services, so you can fully enjoy outdoor life.we promise a 5-year
        sunbrella fabric warranty，frame with 10-year warranty for all product
      </p>

      {/* <Button className='btn btn-primary rounded-full text-white hover:text-primary hover:bg-white font-normal'>
				Cleaning Instructions <BsArrowRight className='ms-2' />
			</Button>

			<h5 className='text-xl font-semibold text-primary pt-6'>We Cover:</h5>
			<ul className='list-disc text-primary pl-4'>
				<li>
					Any defects from craftsmanship will be replaced within 3 years of your
					purchase
				</li>
				<li>
					Our Sunbrella fabric has a 5 year warranty and frames have a 10 year
					warranty
				</li>
				<li>
					Adirondack chair components are warrantied under normal use for 5
					years from the date of shipment
				</li>
				<li>Umbrellas are covered by their</li>
			</ul> */}
    </section>
  );
};

export default Warranty;
