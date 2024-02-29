import React from "react";
import image1 from "../../../assets/about-section-images/image-1.png";
import image2 from "../../../assets/about-section-images/image-2.png";
const WelcomeSection = () => {
  return (
    <div>
      <div className="bg-[#002b5b08] text-[#002B5B] py-5 px-8 md:py-7 md:px-24">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Welcome to Outmaker
        </h1>
        <p className="text-xl md:text-2xl text-justify">
          A stone’s throw from the city hustle, a handcrafted street sign
          reading “Birch Lane” leads the way to joy. Here live families who
          share a modern ethos to reimagining tradition, with open doors and
          open minds. It’s a community that hums with togetherness, where
          there’s always reason to add a little magic to every day. Think
          wine-soaked summer lunches and the impromptu dance parties they turn
          into. Or laughter-fueled nights around the fire pit, warmed by friends
          old and new. This is how we make it feel like home.
        </p>
      </div>
      <div className="my-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 lg:w-1/3 text-center">
          <h3 className="text-2xl lg:text-3xl font-medium mb-5 md:mb-2 lg:mb-5">Keep it Classic</h3>
          <p className="text-lg md:text-base lg:text-xl mb-8 md:mb-4 lg:mb-8">
            We believe trends come and go – but style should stand the test of
            time. Our selection of classic anchor pieces is made for today – and
            made for all life’s moments. Enduring artisanship means you’ll love
            it (and it’ll last) for years.
          </p>
          <button className="underline font-bold">Discover The Classics</button>
        </div>
        <div className="md:w-1/2 lg:w-full">
          <img src={image1} className="object-fill w-full h-full" alt="our-design" />
        </div>
      </div>
      <div className="my-8 flex flex-col md:flex-row items-center gap-6">
      <div className="md:w-1/2 lg:w-full">
          <img src={image2} className="object-fill w-full h-full" alt="our-design" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 text-center">
        <h3 className="text-2xl lg:text-3xl font-medium mb-5 md:mb-2 lg:mb-5">Celebrate the Everyday</h3>
        <p className="text-lg md:text-base lg:text-xl mb-8 md:mb-4 lg:mb-8">
            It’s the little moments that make lasting memories, so we’re always
            ready for any celebration. Whether you’re planning big holiday
            dinners or enjoying Sunday mornings at home, our selection of
            seasonal decor makes every day feel extra special.
          </p>
          <button className="underline font-bold">Make it a moment</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
