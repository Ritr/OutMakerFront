import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
function formatDateTime(isoDateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(isoDateString)
  );
  return formattedDate;
}

const LatestArticle = (latestBlogs) => {
  if (latestBlogs.latestBlogs.length === 0) {
    return <p>Loading...</p>;
  }
  console.log("latestBlogs", latestBlogs);
  return (
    <section>
      <h4 className="text-xl md:text-3xl md:font-bold md:text-primary pb-1 md:pb-0 border-b-4 border-primary">
        Latest Articles
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 md:pt-4">
        {latestBlogs.latestBlogs.map((article) => (
          <>
            <div key={article.post_id} className="flex justify-between py-4">
              <div className="basis-1/3 mr-2">
                <Link
                  to={`/blog/${article.post_id}/${article.post_url}`}
                  key={article.post_id}
                >
                  <img
                    src={ImgBaseUrl(article.post_pic)}
                    alt=""
                    className="w-full h-full"
                  />
                </Link>
              </div>
              <div className="basis-2/3 pl-2 md:pl-0 md:border-b-4 border-[#B8B8B8] flex flex-col justify-between">
                <Link
                  to={`/blog/${article.post_id}/${article.post_url}`}
                  key={article.post_id}
                >
                  <h3 className="text-xl lg:text-xl font-semibold text-black hover:text-blue-700 md:underline hover:underline">
                    {article.post_title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between gap-[6px] md:gap-3 text-xs lg:text-base text-[#213343] font-normal pb-1">
                  <span>{formatDateTime(article.updated_at)}</span>
                </div>
              </div>
            </div>
            <div className="md:hidden h-[1px] bg-black w-full"></div>
          </>
        ))}
      </div>
    </section>
  );
};

export default LatestArticle;
