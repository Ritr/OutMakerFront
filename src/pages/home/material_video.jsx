import React from "react";
import useWowAnimation from "../../Hooks/useAnimate";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
const MV = ({ text_h2, text_p, videoSource }) => {
  useWowAnimation();

  return (
    <div className="hero relative">
      <div className="video-wrapper w-full h-full">
        <div className="w-full h-[50vh] md:h-[100vh] object-cover lg:object-cover wow fadeInUp">
          <VideoPlayer url={videoSource}></VideoPlayer>
        </div>
      </div>
      <div className="hero-content text-center">
        <div className="max-w-full pb-32">
          <h2 className="text-4xl md:text-5xl text-white font-medium uppercase">
            {text_h2}
          </h2>
          <p className="py-6 text-white">{text_p}</p>
        </div>
      </div>
    </div>
  );
};

export default MV;
