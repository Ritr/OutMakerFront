import React from "react";
import img1 from "../../assets/images/Network/1.jpg";
import img2 from "../../assets/images/Network/2.jpg";
import img3 from "../../assets/images/Network/3.jpg";
import img4 from "../../assets/images/Network/4.jpg";
import img5 from "../../assets/images/Network/5.jpg";
import img6 from "../../assets/images/Network/6.jpg";
import img7 from "../../assets/images/Network/7.jpg";
import img8 from "../../assets/images/Network/8.jpg";
import img9 from "../../assets/images/Network/9.jpg";
import img10 from "../../assets/images/Network/10.jpg";
import img11 from "../../assets/images/Network/11.jpg";

const Network = () => {
  const networkImages = [img8, img7, img9, img10, img2, img11, img5, img6];
  const getRandomDuration = () => {
    return (Math.random() * (1.5 - 0.3) + 0.3).toFixed(2); // 生成介于 0.3 到 1.2 之间的随机数
  };
  return (
    <section className="w-full">
      <div className="text-left">
        <h2 className="text-primary text-2xl md:text-3xl font-bold pb-3">
          Outmaker Instagram Network
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-auto-fit gap-0 relative">
        {networkImages.map((imgSrc, index) => (
          <div
            key={index}
            className="w-full wow fadeInUp"
            data-wow-duration={`${getRandomDuration()}s`}
          >
            <img
              src={imgSrc}
              alt="Network Image"
              className="w-full h-[21rem] object-cover"
            />
            <a
              href="https://instagram.com/outmaker_furniture?igshid=bTVxM3JzZ2g4cmUy"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
            ></a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Network;
