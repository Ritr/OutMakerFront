import React from "react";
import image1 from "../../../src/assets/care/1.png";
import image2 from "../../../src/assets/care/2.png";
import image3 from "../../../src/assets/care/3.png";
import image4 from "../../../src/assets/care/4.png";
import image5 from "../../../src/assets/care/5.png";
import image6 from "../../../src/assets/care/6.png";
import image7 from "../../../src/assets/care/7.png";
import image8 from "../../../src/assets/care/8.png";
import image9 from "../../../src/assets/care/9.png";

const Care = () => {
  return (
    <div className="px-4 md:px-20">
      <h1 className="hidden md:block text-5xl text-blue-950 text-center font-bold">
        Sunbrella's Fabric Advantage
      </h1>
      <div className="md:hidden bg-primary text-white text-center text-3xl font-bold uppercase py-6 -mx-10">
        Fabric Advantage
      </div>
      <div className=" grid grid-cols sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 py-10 justify-center">
        <div className="border md:border-0 rounded md:rounded-none mb-4 md:mb-0 p-2 md:p-0 flex md:block gap-2">
          <img src={image1} alt="" className="w-24 h-24 md:w-2/5 md:h-auto mx-auto" />
          <h1 className="hidden md:block text-3xl text-blue-950 text-center font-bold">
            UV resistant, non fading
          </h1>
          <p className="text-xs md:text-base text-left md:text-center py-5">
            Sunbrella functional fabric is made of Sunbrella fiber, which evenly
            distributes the color inside the fiber and will not fade even with
            bleach.
          </p>
        </div>
        <div className="border md:border-0 rounded md:rounded-none mb-4 md:mb-0 p-2 md:p-0 flex md:block gap-2">
          <img src={image2} alt="" className="w-24 h-24 md:w-2/5 md:h-auto mx-auto " />
          <h1 className="hidden md:block text-3xl text-blue-950 text-center font-bold">
            Anti mold, easy to clean
          </h1>
          <p className="text-xs md:text-base text-left md:text-center py-5">
            Sunbrella fabric has the function of preventing mold and spots. If
            mold and spots are generated due to stains, all Sunbrella fabrics
            can be easily removed by using bleach.
          </p>
        </div>
        <div className="border md:border-0 rounded md:rounded-none mb-4 md:mb-0 p-2 md:p-0 flex md:block gap-2">
          <img src={image3} alt="" className="w-24 h-24 md:w-2/5 md:h-auto mx-auto " />
          <h1 className="hidden md:block text-3xl text-blue-950 text-center font-bold">
            Bleachable cleaning
          </h1>
          <p className="text-xs md:text-base text-left md:text-center py-5">
            Sunbrella functional fabric is made of Sunbrella fiber, which evenly
            distributes the color inside the fiber and will not fade even with
            bleach.
          </p>
        </div>
      </div>

      <h1 className="text-xl lg:text-5xl md:text-blue-950 text-center md:font-bold mb-8">
        How to Clean Sunbrella
      </h1>
      <div className="bg-[#f7f7f7] md:bg-none rounded-md mb-6 md:mb-0">
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image4} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 1
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 1
            </button>
            <p className="py-5 text-sm md:text-base">
              Brush off floating dust.
            </p>
          </div>
        </div>
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image5} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 2
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 2
            </button>
            <p className="py-5 text-sm md:text-base">
              Prepare cleaning solution and mild soapy water, such as Woolite or
              Dawn detergent.
            </p>
          </div>
        </div>
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image6} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 3
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 3
            </button>
            <p className="py-5 text-sm md:text-base">
              Use a soft bristle brush for brushing.
            </p>
          </div>
        </div>
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image7} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 3
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 4
            </button>
            <p className="py-5 text-sm md:text-base">
              Allow the cleaning solution to fully penetrate into the fabric.
            </p>
          </div>
        </div>
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image8} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 5
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 5
            </button>
            <p className="py-5 text-sm md:text-base">
              Thoroughly rinse until all soap residue is removed.
            </p>
          </div>
        </div>
        <div className="flex md:items-center p-2 md:py-5">
          <div className="flex-shrink-0">
            <img src={image9} alt="" className="w-24" />
          </div>
          <div className="py-4 md:py-0 px-4 md:px-10">
            <h1 className="hidden md:block text-3xl text-blue-950 font-bold">
              Step 6
            </h1>
            <button className="md:hidden button rounded-full bg-[#002B5B] text-sm text-white px-6 py-1">
              Step 6
            </button>
            <p className="py-5 text-sm md:text-base">Natural air drying</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Care;
