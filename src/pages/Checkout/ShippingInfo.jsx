import React from "react";
import image from "../../assets/images/cutter-sufa.png";
import { Link } from "react-router-dom";
import left from '../../assets/images/left-icon.png';
import UserInitialization from "../../components/UserInitialization/UserInitialization";

const ShippingInfo = () => {

  return (
    <section className="container mx-auto px-2 md:px-10 py-10 md:py-20 text-primary">
      <>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* details part */}
          <div className="shadow-xl px-5 py-8 flex-1">
            <div>
              <h1 className="text-2xl font-semibold">Contact Information</h1>
              <div className="border-2 border-primary rounded-lg px-7 py-4">
                <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-[#B8B8B8]">Contact</h3>
                  <p className="text-primary">info@gamil.com</p>
                  <button className="btn btn-sm btn-primary text-white normal-case">
                    Change
                  </button>
                </div>
                <div className="h-[2px] bg-primary my-5"></div>
                <div className="flex flex-col md:flex-row  md:items-center justify-between gap-2 md:gap-0">
                  <h3 className="text-[#B8B8B8]">Ship to</h3>
                  <p className="text-primary">info@gamil.com</p>
                  <button className="btn btn-sm btn-primary text-white normal-case">
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-semibold">Contact Information</h1>
              <div className="border-2 border-primary rounded-lg px-7 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                    <p className="text-primary">Curbside Delivery</p>
                  </div>
                  <h3 className="font-bold">$120.00</h3>
                </div>
                <div className="h-[2px] bg-primary my-5"></div>
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                    <p className="text-primary">Curbside Delivery</p>
                  </div>
                  
                </div>
                <h3 className="font-bold">$120.00</h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-0 mt-14">
                <Link to='/checkout-info'>
                <button className="flex items-center gap-4">
                    <img src={left} alt="" className="w-[10px]"/>
                    <span>Return to information</span>
                </button>
                </Link>
                <Link to='/payment-info' className="btn btn-primary normal-case">Continue to payment</Link>
              </div>
          </div>
          {/* payment info  */}
          <div className="px-5 py-16 shadow-xl rounded-md w-full lg:w-[550px]">
            {/* product card */}
            <div>
              <div className="flex flex-col md:flex-row lg:items-center justify-between mb-3">
                <div className="flex flex-col md:flex-row lg:items-center gap-4">
                  <figure className="w-full md:w-[100px] h-[100px]">
                    <img
                      src={image}
                      alt=""
                      className="object-fill w-full h-full rounded"
                    />
                  </figure>
                  <div className="space-y-0 lg:space-y-2">
                    <p>Ludlow Small Sectional Set</p>
                    <p>Glacier / 90 Degree Corner / Coffee Table</p>
                  </div>
                </div>
                <p className="text-end lg:text-start">$7,500</p>
              </div>
              <div className="flex flex-col md:flex-row lg:items-center justify-between mb-3">
                <div className="flex flex-col md:flex-row lg:items-center gap-4">
                  <figure className="w-full md:w-[100px] h-[100px]">
                    <img
                      src={image}
                      alt=""
                      className="object-fill w-full h-full rounded"
                    />
                  </figure>
                  <div className="space-y-0 lg:space-y-2">
                    <p>Ludlow Small Sectional Set</p>
                    <p>Glacier / 90 Degree Corner / Coffee Table</p>
                  </div>
                </div>
                <p className="text-end lg:text-start">$7,500</p>
              </div>
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* amount */}
            <div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Subtotal</p>
                <p>$4,780.00</p>
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Shipping</p>
                <p className="text-[#B8B8B8]">Calculated at next step</p>
              </div>
              <div className="flex lg:items-center justify-between mb-2">
                <p>Estimatd Tax</p>
                <p>$394.35</p>
              </div>
            </div>
            {/* divider */}
            <div className="h-[2px] bg-primary mb-7"></div>
            {/* total */}
            <div className="flex lg:items-center justify-between mb-2 text-xl font-bold">
              <p>Total Cost</p>
              <p>$394.35</p>
            </div>
          </div>
        </div>
      </>

      {/* to generate a rnadom number when user will land on this page */}
      <UserInitialization/>
    </section>
  );
};

export default ShippingInfo;
