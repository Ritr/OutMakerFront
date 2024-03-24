import React, { useRef, useState, useEffect } from "react";
import Button from "../../shared/Button/Button";
import { BsArrowRight } from "react-icons/bs";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { Link } from "react-router-dom";
import useWowAnimation from "../../Hooks/useAnimate";
const Header = () => {
  useWowAnimation();

  return (
    <header
      className="hero h-[50vh]  md:h-[100vh] relative  "
      // style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="video-wrapper w-full h-full wow fadeInUp">
        <VideoPlayer url="https://cdn.shopify.com/videos/c/o/v/c3ed803a059d415fbd4421870148771f.mp4"></VideoPlayer>
      </div>
      <div className="hero-content text-center">
        <div className="max-w-full pb-32">
          <h1 className="text-4xl md:text-5xl text-white font-medium">
            Nature's Touch for Your Outdoors
          </h1>
          <p className="py-6 text-white">
            Where Comfort Meets the Great Outdoors
          </p>
          <Link to="/product-details/1474/Femshade%20Outdoor%203%20Seater%20Sofa%20Set">
            <Button className="btn btn-primary bg-white text-primary hover:text-white border-0 rounded-full capitalize font-medium">
              Shop Now <BsArrowRight className="ms-2" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
