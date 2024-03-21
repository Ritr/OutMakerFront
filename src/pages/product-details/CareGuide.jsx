import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../../shared/Button/Button";
import { Link } from 'react-router-dom';

const CareGuide = () => {
  return (
    <section className="container mx-auto p-4 md:p-10">
      <h4 className=" text-xl font-semibold uppercase">CareGuide</h4>
      <p className="text-base  py-4 leading-loose">
        Sunbrella fabric combines design and functionality, making daily
        maintenance easy and convenient.
      </p>

      {/* <h5 className="text-xl font-semibold text-primary pt-6">Care Guide</h5> */}
      <ul className="list-disc pl-4">
        <li>Brush off floating dust.</li>
        <li>
          Prepare cleaning solution and mild soapy water, such as Woolite or
          Dawn detergent.
        </li>
        <li>Use a soft bristle brush for brushing.</li>
        <li>Allow the cleaning solution to fully penetrate into the fabric.</li>
        <li>Thoroughly rinse until all soap residue is removed.</li>
        <li>Natural air drying.</li>
      </ul>
      <br></br>
      <Link to="/Care">
        <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white font-normal">
          Cleaning Instructions <BsArrowRight className="ms-2" />
        </Button>
      </Link>
    </section>
  );
};

export default CareGuide;
