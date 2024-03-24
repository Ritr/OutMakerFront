import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/article.css";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-scroll";

const Articels = (data) => {
  const articles = data.data;
  console.log("NH", articles);
  return (
    <div className="">
      <div className="text-left border-b-4 border-primary">
        <h2 className="text-primary text-2xl md:text-3xl font-bold pb-3">
          Related Articles
        </h2>
      </div>

      <div className="articles">
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
          {articles.map((articel) => (
            <div key={articel.post_id} className="mx-6">
              <div className="relative">
                <div className="md:border-b-4 border-[#B8B8B8] my-10 mx-2">
                  <img src={ImgBaseUrl(articel.post.post_pic)} alt="" />
                  <div className="h-36">
                    <a
                      href={`/blog/${articel.post.post_id}/${articel.post.post_url}`}
                      key={articel.post_id}
                      className="hover:underline hover:text-primary"
                    >
                      <h4 className="text-xl md:text-3xl font-medium pt-2">
                        {articel.category_name || ""}
                      </h4>

                      <p className="text-base md:text-xl font-normal py-1 md:py-4">
                        {articel.post.post_title} &rarr;
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Articels;
