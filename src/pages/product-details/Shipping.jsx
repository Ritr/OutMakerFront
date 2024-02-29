import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Button from "../../shared/Button/Button";

const Shipping = () => {
  return (
    <section className="container mx-auto p-4 md:p-10">
      <h4 className=" text-xl font-semibold uppercase">
        Shipping
      </h4>
      {/* <p className="text-base font-normal text-[#666666] py-4 leading-loose">
        At Yardbird, we take great pride in our outdoor furniture and we strive
        to bring you the best quality at the best price. We guarantee our
        product to be free of any manufacturing flaws in workmanship and
        materials. Ultimately, we will work hard to assure you are happy with
        your Yardbird purchase. We have one of the industry best warranties.
      </p> */}
      {/* 
      <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white font-normal">
        Cleaning Instructions <BsArrowRight className="ms-2" />
      </Button> */}

      {/* <h5 className="text-xl font-semibold text-primary pt-6">Shipping:</h5> */}
      <ul className="list-disc text-xs pl-4">
        <li>
          We will use the large bulk logistics transportation service to deliver
          your goods to the address you specify. Please ensure that the shipping
          address you provided is accurate and accurate to avoid delays or non
          delivery.
        </li>
        <li>
          Normally, your spot order will be shipped within a week. Before
          shipping, we will contact you to confirm the shipping address and
          delivery time.
        </li>
        <li>
          After the goods are shipped, we will provide you with the tracking
          number of the goods so that you can keep track of their transportation
          status at any time. If you have any questions or need assistance,
          please feel free to contact us.
        </li>
        <li>
          Please note that due to the special nature of large items, someone
          needs to receive and sign for confirmation at home during delivery.
          Please ensure that there are people at home within the delivery time
          to avoid non delivery.
        </li>
      </ul>
      <br></br>

      {/* <h5 className="text-xl font-semibold text-primary pt-6">Return:</h5> */}

      <h4 className="text-xl font-semibold uppercase">Return</h4>
      <ul className="list-disc text-xs pl-4">
        <li>
          If the goods you receive have quality issues or do not match the
          order, please contact us within 7 days after receiving them, and we
          will provide you with free on-site pickup and return services. Please
          note that when returning the goods, it is necessary to keep the
          original packaging and accessories intact, otherwise it may affect the
          return progress.{" "}
        </li>
        <li>
          When processing the return procedures, please provide complete order
          information, the reason for the return, and the original packaging and
          accessories of the goods. If there are any missing items, it may
          affect the return progress.{" "}
        </li>
        <li>
          Generally, returns will be completed within 3 working days. If there
          are special circumstances, we will contact you in a timely manner and
          inform you of the relevant progress.{" "}
        </li>
        <li>
          If you choose to return the goods to us on your own, please contact us
          in advance and obtain the return address.
        </li>
      </ul>
    </section>
  );
};

export default Shipping;
