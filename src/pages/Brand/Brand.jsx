import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
const image1 = ImgBaseUrl("assets/brand/1.jpg");
const image2 = ImgBaseUrl("assets/brand/2.jpg");
const image3 = ImgBaseUrl("/assets/brand/3.jpg");
const image4 = ImgBaseUrl("/assets/brand/4.jpg");
const image5 = ImgBaseUrl("/assets/brand/5.jpg");
const image6 = ImgBaseUrl("/assets/brand/6.jpg");
const image7 = ImgBaseUrl("/assets/brand/7.jpg");

const Brand = () => {
  return (
    <div className="px-6 md:px-20">
      <h1 className="text-5xl text-blue-950 text-center font-bold">BRAND</h1>
      <p className="py-5">
        Outmaker—Outdoor furniture brand committed to environmental protection
        and sustainable development
      </p>
      <p className="">
        As a brand focusing on outdoor furniture, we are well aware of the
        importance of sustainable development of environmental protection. We
        are committed to using environmentally friendly and sustainable
        materials, promoting green production, and providing consumers with
        high-quality, environmentally friendly outdoor furniture products.
      </p>

      <div className="flex flex-col md:flex-row lg:flex-row py-5">
        <img
          src={image1}
          alt=""
          className="w-full md:w-1/2 lg:w-1/3 object-cover p-1"
        />
        <img
          src={image2}
          alt=""
          className="w-full md:w-1/2 lg:w-1/3 object-cover p-1"
        />
        <img
          src={image3}
          alt=""
          className="w-full md:w-1/2 lg:w-1/3 object-cover p-1"
        />
      </div>

      <h1 className="text-3xl text-blue-950 text-center font-bold">
        MATERIALS
      </h1>
      <p className="py-5">
        Today the fusion between outdoor and indoor style is more and more
        evident, although the outdoor product must seek and use materials with
        unique characteristics for outdoor durability. Nostin materials are
        always chosen for their incomparable quality of resistance to all
        weather conditions, even the most extreme.
      </p>
      <img src={image4} alt="" className="w-full object-cover" />
      <h1 className="text-3xl text-blue-950 text-center font-bold">Rattan</h1>
      <p className=" py-5">
        Rattan: We use high-quality wild rattan as one of the main materials for
        outdoor furniture. Rattan is a natural and renewable resource with
        sustainable characteristics. At the same time, the adhesives and
        coatings used in the process of rattan processing meet environmental
        protection standards to ensure that the products are pollution-free
      </p>
      <img src={image5} alt="" className="w-full object-cover" />

      <h1 className="text-3xl text-blue-950 text-center font-bold">
        Aluminum Alloy
      </h1>
      <p className=" py-5">
        Aluminum alloy: Aluminum alloy is a recyclable metal material with
        sustainable characteristics. Our aluminum alloy furniture has been
        precisionly processed and anodized, which not only maintains metal
        durability, but also gives furniture a sense of fashion.
      </p>
      <img
        src={image6}
        alt=""
        className="w-full h-64 md:h-96 lg:h-700 object-cover"
      />

      <h1 className="text-3xl text-blue-950 text-center font-bold">Yarn</h1>
      <p className=" py-5">
        The yarn is mixed with up to 50% post industrial recycled fibers. These
        waste materials are grouped by color, returned to their fiber state,
        mixed with native fibers, and finally returned to the fabric
        manufacturing process. This blended fiber helps ensure that the product
        meets stringent performance standards.
      </p>
      <img src={image7} alt="" className="w-full object-cover py-5" />
    </div>
  );
};

export default Brand;
