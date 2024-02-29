import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/images/product-collection.png";
import img2 from "../../assets/images/product-collection2.png";
import Network from "../../shared/Network/Network";
import "../../assets/css/product.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    name: "LAPE",
    image: img1,
  },
  {
    id: 2,
    name: "RXTRADOS",
    image: img2,
  },
  {
    id: 3,
    name: "Lape",
    image: img1,
  },
];

const CollectionSlider = ({ filteredCollection }) => {
  return (
    <section className="w-full px-5 pb-10 relative product-collection">
      <div className="text-left border-b-4 border-primary">
        <h2 className="text-primary text-xl md:text-3xl font-bold pb-3">
          Other Collections
        </h2>
      </div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerclassName="container-with-dots"
        dotListclassName=""
        draggable
        focusOnSelect={false}
        infinite
        itemclassName=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: { max: 5000, min: 1024 },
            items: 2,
          },
          tablet: {
            breakpoint: { max: 1024, min: 780 },
            items: 2,
          },
          mobile: {
            breakpoint: { max: 780, min: 0 },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderclassName=""
        slidesToSlide={1}
        swipeable
      >
        {filteredCollection?.map((collection) => (
          <Link
            key={collection?.collection_id}
            to={`/collection-product/${collection?.collection_id}/${collection.collection_name}`}
          >
            <div className="py-6 md:py-10 mx-6">
              <div className="relative text-center overflow-hidden h-[300px]">
                <img
                  src={ImgBaseUrl(collection?.collection_pic)}
                  alt=""
                  className="hover:scale-125 transition ease-in-out duration-1000 object-cover w-full h-full"
                />
                <div
                  className="flex flex-col absolute"
                  style={{
                    top: "40%",
                    transform: "translate(-50%, 0)",
                    left: "50%",
                  }}
                >
                  <p className="text-lg md:text-xl font-light text-white">
                    COLLECTION
                  </p>
                  <h4 className="text-4xl md:text-5xl text-white font-medium">
                    {collection?.collection_name}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>

      <Network />
    </section>
  );
};

export default CollectionSlider;
