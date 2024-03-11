import React from "react";
import img1 from "../../assets/images/Materials/Teak.png";
import img2 from "../../assets/images/Materials/Aluminum.jpg";
import img3 from "../../assets/images/Materials/Rattan.jpg";
import img4 from "../../assets/images/Materials/Sunbrella.png";
import img5 from "../../assets/stylish/1.jpg";
import imgs2 from "../../assets/stylish/2.jpg";
import imgs3 from "../../assets/stylish/3.jpg";
import imgs4 from "../../assets/stylish/4.jpg";

import MV from "./material_video";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";

const materials = [
  {
    id: 1,
    title: "Teak Wood",
    description:
      "Teak wood is a timeless favorite for outdoor furniture. Its naturally tough and resistant to decay. Teak wood contains oils that keep it safe from water damage, pesky insects and rot. As it ages, teak develops an stunning silver-gray patina, adding character while extending its life.",
    image: img1,
  },
  {
    id: 2,
    title: "Aluminum",
    description:
      "Aluminum frames are another essential ingredient in our outdoor furniture. Its light rust-resistant and incredibly strong. Our aluminum frames are coated with an special powder to offer extra protection against the elements. This ensures that they remain robust and rust-free.",
    image: img2,
  },
  {
    id: 3,
    title: "PE Rattan",
    description:
      "Our PE Rattan mimic the look of rattan but its far more durable. It laughs in the face of UV exposer, moisture, fading, cracking and peeling. With minimal maintenance, our PE Rattan furniture retain its beauty year after year.",
    image: img3,
  },
  {
    id: 4,
    title: "Sunbrella Fabrics",
    description:
      "Our outdoor cushions use High-Performance Sunbrella Fabrics. These fabrics are water-resistant, fade-resistant and easy to clean. They stand up to the elements and provide a comfortable seating without the worry of mildew or color fading.",
    image: img4,
  },
];
const Meterials = () => {
  // const {meterials} = useMeterials();
  const getRandomDuration = () => {
    return (Math.random() * (1.5 - 0.3) + 0.3).toFixed(2); // 生成介于 0.3 到 1.2 之间的随机数
  };
  return (
    <section className="py-10 md:py-20  pl-5 pr-5 ">
      <div className="w-full ">
        <div className="text-left pb-4 mt-1">
          <h2 className="text-primary font-semibold text-2xl md:text-4xl">
            Our product designer
          </h2>
        </div>
        <img
          src={img5}
          alt=""
          className="hidden md:inline-block wow slideInLeft"
        />
        <img
          src={imgs2}
          alt=""
          className="inline-block md:hidden wow slideInLeft"
        />
        <div className="flex mt-3 md:hidden justify-between gap-3  wow slideInLeft">
          <div className="flex-1 bg-[#F5F5F5]">
            <img src={imgs3} alt="" className="w-full h-30 object-cover" />
            <div className="p-3">
              <div className="text-center text-base font-semibold mb-3">
                Furniture designer
              </div>
              <div className="text-xs mb-4">
                He is a renowned designer, artist, and creative directorin
                Mexico, leading the design industry. He has servedas the founder
                and CEO of PANOR Á MICA, the creativedirector of NONO, and the
                CEO and founder of joelEscalona Studio.
              </div>
              {/* <div className="flex justify-center">
                <Link>
                  <button className="border flex items-center border-[#002B5B] color-[#002B5B] text-sm px-3 py-1">
                    View more
                    <BsChevronRight className="ml-1"></BsChevronRight>
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
          <div className="flex-1 bg-[#F5F5F5]">
            <img src={imgs4} alt="" className="w-full h-30 object-cover" />
            <div className="p-3">
              <div className="text-center text-base font-semibold mb-3">
                Furniture designer
              </div>
              <div className="text-xs mb-4">
                He is a renowned designer, artist, and creative directorin
                Mexico, leading the design industry. He has servedas the founder
                and CEO of PANOR Á MICA, the creativedirector of NONO, and the
                CEO and founder of joelEscalona Studio.
              </div>
              {/* <div className="flex justify-center">
                <Link>
                  <button className="border flex items-center border-[#002B5B] color-[#002B5B] text-sm px-3 py-1">
                    View more
                    <BsChevronRight className="ml-1"></BsChevronRight>
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className="text-center w-4/5 md:w-2/3 mx-auto mt-5">
          <h2 className="text-primary font-semibold mt-5 text-2xl md:text-4xl">
            Materials We Use
          </h2>
          <p className="text-[#666666] text-sm font-normal leading-7 pt-4">
            At The Outmaker, we're proud to offer environmentally friendly
            furniture. Just like you, we care about nature, and our pieces are
            crafted with sustainability in mind, providing you with beautiful,
            eco-conscious options for your space. Say goodbye to limited choices
            and high mark-ups!
          </p>
        </div>
        <br></br>

        {/* <div className='mt-10'>
					<iframe
						style={{ height: "600px" }}
						className='w-full rounded-2xl iframe'
						src='https://www.youtube.com/embed/cHBqwj0Ed_I'
						frameBorder={0}
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					/>

				</div> */}

        <MV
          videoSource={
            "https://cdn.shopify.com/videos/c/o/v/418c216f38744437bdc0bce21ac5410b.mp4"
          }
          text_h2="Built to withstand everything life throws at us."
          text_p="Where Durability Embraces the Elements"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-5 pt-10 mb-14">
          {materials.slice(0, 4)?.map((material) => (
            <div
              key={material?.id}
              className="container mx-auto px-2 pt-2 md:pb-4 md:border bg-white max-w-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 hover:scale-105 wow fadeInUp"
              data-wow-duration={`${getRandomDuration()}s`}
            >
              <div className="h-auto md:h-[280px]">
                <img
                  className="rounded-lg object-fill w-full h-full"
                  src={material?.image}
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base md:text-xl py-1 text-primary font-semibold">
                    {material?.title}
                  </h2>
                  <p className="hidden md:block text-xs font-normal">
                    {material?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <MV
          videoSource="https://cdn.shopify.com/videos/c/o/v/36bb127a7fd34c8db6c7edce78a3ed46.mp4"
          text_h2="Sunbrella fabric easily handles various cold weather conditions."
        />
      </div>
    </section>
  );
};

export default Meterials;
