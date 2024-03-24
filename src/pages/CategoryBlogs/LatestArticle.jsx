import React from "react";
import { LuArrowRight } from "react-icons/lu";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
function formatDateTime(isoDateString) {
  const date = new Date(isoDateString);
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleString("en-US", options);
}

const LatestArticle = (Subcategory_Blogs) => {
  if (Subcategory_Blogs.latestBlogs.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <section>
      <h4 className="text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary">
        Latest Articles
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {Subcategory_Blogs.latestBlogs.map((article) => (
          <div
            key={article.subcatgory_id}
            className="flex justify-between py-2"
          >
            <div className="basis-1/3 mr-2">
              <img
                src={ImgBaseUrl(article.post_pic)}
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="basis-2/3 pl-2 md:border-b-4 border-[#B8B8B8] flex flex-col justify-between">
              <Link
                to={`/blog/${article.post_id}/${article.post_url}`}
                key={article.post_id}
              >
                <h5 className="text-xl lg:text-xl font-medium text-black hover:text-blue-700 md:underline hover:underline">
                  {article.post_title}
                </h5>
              </Link>
              <div className="flex items-center justify-end md:justify-between gap-[6px] md:gap-3 text-xs lg:text-base text-[#213343] font-normal pb-1">
                <span className="hidden md:block">
                  {formatDateTime(article.updated_at)}
                </span>
                <Link to={`/blog/${article.post_id}/${article.post_url}`}>
                  <span className="md:hidden flex gap-1 items-center text-md">
                    LEARN MORE<LuArrowRight></LuArrowRight>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticle;
