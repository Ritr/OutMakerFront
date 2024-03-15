import React from "react";
import { BsArrowRight } from "react-icons/bs";
import loungeVactor from "../../assets/images/loungeVactor.png";
import Button from "../../shared/Button/Button";
import { Link } from "react-router-dom";
import useCollections from "../../Hooks/useCollections";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import SwiperWrapper from "../../components/SwiperWrapper/index";
import { SwiperSlide } from "swiper/react";
// import useWowAnimation from "../../Hooks/useAnimate";

const Collection = () => {
  // useWowAnimation();
  const { collections } = useCollections();
  const getRandomDuration = () => {
    return (Math.random() * (1.5 - 0.3) + 0.3).toFixed(2); // 生成介于 0.3 到 1.2 之间的随机数
  };
  return (
    <section className="w-full pt-10 pl-5 pr-5 md:py-20">
      <div>
        <div className="flex justify-between items-center">
          <div className="basis-2/3">
            <h1 className="text-2xl md:text-4xl font-semibold text-primary">
              Our Popular Collection
            </h1>
          </div>
          <Link
            to="/collections"
            className="flex items-center text-primary text-sm font-semibold cursor-pointer justify-end text-end"
          >
            View All
            <BsArrowRight className="ms-2" />
          </Link>
        </div>
        <div className="md:hidden pt-4">
          <SwiperWrapper showNavigation={false} swiperProps={{ slidesPerView: 2.3, spaceBetween: 10,loop:false }}>
            {collections?.slice(0, 9).map((collection) => (
              <SwiperSlide>
                <Link
                  to={`/collection-product/${collection?.collection_id}/${collection?.collection_name}`}
                  key={collection?.collection_id}
                >
                  <div
                    key={collection?.collection_id}
                    className="block group items-center justify-between rounded-md my-2 lg:mt-[38px] md:pb-6"
                    data-wow-duration={`${getRandomDuration()}s`}
                  >
                    <img
                      className="img w-full h-full object-cover lg:h-[375px] mb-6 rounded-md group-hover:scale-105  duration-300"
                      src={ImgBaseUrl(collection?.collection_pic)}
                      alt=""
                    />
                    <div className=" flex justify-between items-center mb-5 text-xl font-semibold">
                      {collection?.collection_name}

                      <span className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition duration-300 ease-in">
                        Shop <BsArrowRight className="ms-2" />
                      </span>
                      {/* <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white capitalize">
                    Explore <BsArrowRight className="ms-2" />
                  </Button> */}
                    </div>
                    <div className="text-sm">{collection?.collection_desc}</div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </SwiperWrapper>
        </div>
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-4">
          {collections?.slice(0, 9).map((collection) => (
            <Link
              to={`/collection-product/${collection?.collection_id}/${collection?.collection_name}`}
              key={collection?.collection_id}
            >
              <div
                key={collection?.collection_id}
                className="block group  items-center justify-between rounded-md my-2 lg:mt-[38px] pb-6 wow fadeInUp"
                data-wow-duration={`${getRandomDuration()}s`}
              >
                <img
                  className="img w-full h-full object-cover lg:h-[375px] mb-6 rounded-md group-hover:scale-105  duration-300"
                  src={ImgBaseUrl(collection?.collection_pic)}
                  alt=""
                />
                <div className=" flex justify-between items-center mb-5 text-xl font-semibold">
                  {collection?.collection_name}

                  <span className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition duration-300 ease-in">
                    Shop <BsArrowRight className="ms-2" />
                  </span>
                  {/* <Button className="btn btn-primary rounded-full text-white hover:text-primary hover:bg-white capitalize">
                    Explore <BsArrowRight className="ms-2" />
                  </Button> */}
                </div>
                <div className="text-sm">{collection?.collection_desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
