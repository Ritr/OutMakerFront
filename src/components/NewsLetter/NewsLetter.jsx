import React from "react";
import image from "../../assets/about-section-images/news-letter.png";
import { BiPaperPlane } from "react-icons/bi";
const NewsLetter = () => {
  return (
    <div className="my-8 w-full">
      <div className="flex flex-col md:flex-row">
        <div className="h-[500px] flex-1">
          <img src={image} alt="" className="w-full h-full object-fill" />
        </div>
        <div className="bg-[#002b5b08] space-y-[30px] text-[#002B5B] p-5 md:px-16 md:py-24">
          <h1 className="text-5xl md:text-[45px]">
            Join our list to receive 15% off your first purchase
          </h1>
          <div className="flex items-center gap-4 underline">
            <h4>Daily</h4>
            <h4>weekly</h4>
          </div>
          <div>
            <form className="flex flex-col gap-5">
              <input
                className="border-2 border-[#002B5B] rounded-lg w-full p-2"
                type="email"
                placeholder="Email *"
                required
              />
              <div>
                <input className="mr-2" type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">
                  *Some exclusions apply. See Terms & Conditions for details.
                </label>
              </div>
              <button className="bg-primary text-white flex items-center gap-2 text-xl font-semibold w-28 px-5 py-2 rounded-2xl">
                <span>Send</span>
                <span>
                  <BiPaperPlane />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
