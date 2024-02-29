import React, { useRef, useState, useEffect } from "react";
import img1 from "../../assets/images/fabrics.png";
import img2 from "../../assets/images/leather.png";
import img3 from "../../assets/images/metal.png";
import img4 from "../../assets/images/wood.png";
import useMeterials from "../../Hooks/useMeterials";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import test from "../../assets/test.jpg";

// import headerVideo from "../../assets/images/homePage-video.mp4";
// import { BsArrowRight } from "react-icons/bs";
// import { FaPlay, FaPause } from "react-icons/fa";

// import Button from "../../shared/Button/Button";
// import headerImage from "../../assets/images/home-banner.png";
// import { Link } from "react-router-dom";

const meterials = [
  {
    id: 1,
    title: "Wood",
    description:
      "HipVan is proud to be founded in  Like you, we're young adults who.",
    image: img1,
  },
  {
    id: 2,
    title: "Fabrics",
    description:
      "HipVan is proud to be founded in  Like you, we're young adults who.",
    image: img2,
  },
  {
    id: 3,
    title: "Metal",
    description:
      "HipVan is proud to be founded in  Like you, we're young adults who.",
    image: img3,
  },
  {
    id: 4,
    title: "Leather",
    description:
      "HipVan is proud to be founded in  Like you, we're young adults who.",
    image: img4,
  },
];

const Meterials = () => {
  const { meterials } = useMeterials();

  return (
    <section
      className="py-10 md:py-20"
      
    >
      <div className="w-full ">
        <div className="text-center w-4/5 md:w-2/3 mx-auto">
          <h2 className="text-primary font-semibold text-2xl md:text-4xl">
            Product Materials
          </h2>
        </div>
        <br></br>
        {/* 
        <div className="mt-10">
          <iframe
            style={{ height: "600px" }}
            className="w-full rounded-2xl iframe"
            src="https://www.youtube.com/embed/cHBqwj0Ed_I"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-10">
          {meterials.slice(0, 4)?.map((meterial) => (
            <div
              key={meterial?.material_id}
              className="container mx-auto px-2 pt-2 pb-4 border bg-white max-w-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 hover:scale-105"
            >
              <div className="h-[280px]">
                <img
                  className="rounded-lg object-fill w-full h-full"
                  src={ImgBaseUrl(meterial?.material_pic)}
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl py-1 text-primary font-semibold">
                    {meterial?.material_name}
                  </h2>
                  <p className="text-xs font-normal">
                    {meterial?.material_desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* das */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          <div data-aos="fade-up" className="md:col-span-3 ">
            <img
              src={img1}
              alt="Outdoor Furniture"
              className="mx-auto w-full h-[500px] mb-4"
            />
          </div>

          <div className="md:col-span-1">
            <div data-aos="fade-up">
              <p className="text-2xl font-semibold mb-2">Incredibly durable</p>
              <p className="text-lg text-left text-gray-400">
                Engineered for the outdoors, All-Weather wicker is built to
                last, rain or shine - so you can enjoy the ultimate in outdoor
                relaxation with minimal upkeep.
              </p>
            </div>
          </div>
          <div className="md:col-span-1">
            <div data-aos="fade-up">
              <p className="text-2xl font-semibold mb-2">
                Made with stainless-steel
              </p>
              <p className="text-lg text-left text-gray-400">
                Experience luxury and durability with our All-Weather Wicker
                seating, which rests upon sturdy, rust-proof cast stainless
                steel legs, and is backed by our warranty.
              </p>
            </div>
          </div>
          <div className="md:col-span-1">
            <div data-aos="fade-up">
              <p className="text-2xl font-semibold mb-2">Hand-crafted</p>
              <p className="text-lg text-left text-gray-400">
                Master artisans carefully craft every seat by hand using a
                special technique for a beautiful and durable weave.
              </p>
            </div>
          </div>
        </div> */}



          {meterials.slice(0, 4)?.map((meterial) => (
            <div
              key={meterial?.material_id}
              className=""
            >
              <div className="">
                <img
                  className="rounded-lg object-fill w-full h-full"
                  src={ImgBaseUrl(meterial?.material_pic)}
                  alt=""
                />
              </div>
             
            </div>
          ))}

        
        {/* <img src={test} alt="" />
      <br></br>
      <img src={test} alt="" /> */}

        {/* da */}
      </div>
    </section>
  );
};

export default Meterials;
