import React from "react";
import { Link } from "react-router-dom";
import navImg from "../../assets/images/nav-img.webp";
const LearnItem = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row p-5 lg:p-0 ">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[100px] mt-10 mb-24">
          {/* first column */}
          <div className="flex flex-col w-full">
            <div className="grid">
              <h3 className="nav-text-style">About</h3>
              <div className="space-y-[15px] flex flex-col">
                <Link to="/AboutUs">Our Story</Link>
                <Link to="/brand">Sustainability</Link>
                <Link to="/ContactUs">Contact us</Link>
                <Link to="/all-blogs">Blogs</Link>
                <Link to="/Care">Care & Maintenance</Link>
              </div>
            </div>
          </div>
          {/* second column */}
          <div>
            <h3 className="nav-text-style">Resources</h3>
            <div className="space-y-[15px] flex flex-col">
              {/* <Link to="/all-blogs">Our Blog</Link> */}
              <Link to="/ShippingPolicy">Shipping & Delivery</Link>
              {/* <Link to="/Care">Care & Maintenance</Link> */}
              <Link to="/ReturnPolicy">Return & Refunds</Link>
              <Link to="/FAQ">Frequently Asked Questions</Link>
            </div>
          </div>
          {/* third column */}
          <div>
            <h3 className="nav-text-style">Contact Info.</h3>
            <div className="">
              <a href="tel:+61483966676" className="mb-4 block">
                +61483966676
              </a>
              {/*<a href="tel:+1234567890" className="block mb-6">
                +1 (234) 567-890
              </a>*/}
              <a href="mailto:kaium@outmaker.com" className="mb-6">
                contact@theoutmaker.com
              </a>
              <p>139 Keys Road, Moorabbin, VIC , Australia </p>
            </div>
          </div>
          {/* img container */}
        </div>
        <div>
          <img src={navImg} alt="" className="object-fill h-full w-full" />
        </div>
      </div>
    </>
  );
};

export default LearnItem;
