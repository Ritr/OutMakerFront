import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
function formatDateTime(isoDateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(isoDateString));
  return formattedDate;
}


const LatestArticle = (latestBlogs) => {
  if (latestBlogs.latestBlogs.length === 0) {
    return <p>Loading...</p>;
  }
  console.log("latestBlogs", latestBlogs);
  return (
    <section>
      <h4 className="text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary">
        Latest Articles
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {latestBlogs.latestBlogs.map((article) => (
          <div key={article.post_id} className="flex justify-between py-2">
            <div className="basis-1/3 mr-2">
              <Link to={`/blog/${article.post_id}/${article.post_url}`} key={article.post_id}>
                <img
                  src={ImgBaseUrl(article.post_pic)}
                  alt=""
                  className="w-full h-full"
                />
              </Link>
            </div>
            <div className="basis-2/3 border-b-4 border-[#B8B8B8] flex flex-col justify-between">
              <Link to={`/blog/${article.post_id}/${article.post_url}`} key={article.post_id}>
              <h3 className="text-xl lg:text-xl font-semibold text-black hover:text-blue-700 underline hover:underline">
                {article.post_title}
              </h3>
              </Link>

              <div className="flex items-center justify-between gap-[6px] md:gap-3 text-xs lg:text-base text-[#213343] font-normal pb-1">
                <span>{formatDateTime(article.updated_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticle;
