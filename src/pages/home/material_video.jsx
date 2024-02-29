import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MV = ({ text_h2, text_p, videoSource }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <mv className="hero min-h-screen relative">
      <div className="video-wrapper w-full h-full">
        <video
          playsInline
          autoPlay
          muted
          loop
          poster="cake.jpg"
          className="absolute top-0 left-0 w-full h-[100vh] object-cover lg:object-cover"
          ref={videoRef}
        >
          <source src={videoSource} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="hero-content text-center">
        <div className="max-w-full pb-32">
          <h2 className="text-4xl md:text-5xl text-white font-semibold uppercase">
            {text_h2}
          </h2>
          <p className="py-6 text-white">{text_p}</p>
        </div>
      </div>

      {/* button for pause and  */}
      <div className="absolute right-8 bottom-8">
        <button
          onClick={togglePlayPause}
          className="border border-primary bg-white hover:bg-[#D8EDF5] transition-all duration-300 ease-linear p-2 rounded-full"
        >
          {isPlaying ? (
            <div className="flex items-center gap-2 px-2 text-primary">
              <p className="bg-primary p-2 rounded-full">
                <FaPause className="text-white text-sm" />
              </p>
              <p>Pause</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2 text-primary">
              <p className="bg-primary p-2 rounded-full">
                <FaPlay className="text-white text-sm" />
              </p>
              <p>Play</p>
            </div>
          )}
        </button>
      </div>
    </mv>
  );
};

export default MV;
