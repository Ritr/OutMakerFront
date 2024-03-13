import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import feateImageLg from "../../assets/images/article-lg.png";
import { Link, useNavigate } from "react-router-dom";

function formatDateTime(isoDateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(isoDateString));
  return formattedDate;
}

const FeatureArticle = (data) => {
  if (data.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <section className="block md:flex justify-between pb-10 gap-6">
      <div className="basis-1/2 bg-gray-100">
        <figure>
          <img src={feateImageLg} alt="Shoes" />
        </figure>
        <div className="p-4">
          <h2 className="text-xl md:text-3xl font-semibold text-black">
            How to Furnish Your Small Outdoor Space{" "}
          </h2>
          <p className="text-sm md:text-base font-light text-black py-4">
            En an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting
          </p>
          <div className="flex items-center gap-10 text-base text-[#213343] font-normal">
            <div className="flex items-center gap-2">
              {/* <img src={articleUser1} alt='' className='w-10' /> */}
              <span>Ben Holland</span>
            </div>
            <span>8/25/2022</span>
          </div>
        </div>
      </div>

      <div className="basis-1/2 pt-8 md:pt-0">
        <h4 className="text-xl md:text-3xl md:font-bold md:text-primary border-b-4 border-primary">
          Featured Articles
        </h4>
        {data.data.map((article) => (
          <div
            key={article.post_id}
            className="flex justify-between border-b-4 border-[#B8B8B8] py-4"
          >
            <div className="basis-2/3">
            <Link to={`/blog/${article.post_id}/${article.post_url}`} key={article.post_id}>
            <h5
                className="text-xl lg:text-xl font-semibold text-black hover:text-blue-700 underline hover:underline"
                style={{
                  height: "110px",
                  wordBreak: "break-all",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {article.post_title}
              </h5>
              </Link>
              <div className="flex items-center justify-between md:justify-normal gap-[6px] md:gap-3 text-xs md:text-base text-[#213343] font-normal md:pt-3">
                <div className="divider bg-[#213343] w-[2px] h-4"></div>
                <span>{formatDateTime(article.updated_at)}</span>
              </div>
            </div>

            <div className="basis-1/3 pl-2 md:pl-0">
              <Link to={`/blog/${article.post_id}/${article.post_url}`} key={article.post_id}>
                <img
                  src={ImgBaseUrl(article.post_pic)}
                  alt=""
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureArticle;
