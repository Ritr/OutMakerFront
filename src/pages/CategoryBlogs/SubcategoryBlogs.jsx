import React from "react";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

function formatDateTime(isoDateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(isoDateString)
  );
  return formattedDate;
}

const SubcategoryBlog = ({ subcategoryBlogs }) => {
  if (subcategoryBlogs.length === 0) {
    return <p>Loading...</p>;
  }

  console.log("subcategoryBlogs", subcategoryBlogs);
  return (
    // <div>Sub category blogs</div>
    <>
      {subcategoryBlogs.map((blog, index) => (
        <section key={blog?.category?.category_id} className="px-2">
          <h4 className="text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary">
            {blog?.category?.category_name}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {blog?.category_posts?.map((article) => (
              <div key={article.post_id} className="flex justify-between py-2">
                <div className="basis-1/3 mr-2">
                  <Link to={`/blog/${article.post_id}`} key={article.post_id}>
                    <img
                      src={ImgBaseUrl(article.post_pic)}
                      alt=""
                      className="w-full h-full"
                    />
                  </Link>
                </div>
                <div className="basis-2/3 pl-2 md:border-b-4 border-[#B8B8B8] flex flex-col justify-between">
                  <Link
                    to={`/blog/${article.post_id}/${article.post_url}`}
                    key={article.post_id}
                  >
                    <h5 className="text-xl lg:text-xl font-semibold text-black hover:text-blue-700 md:underline hover:underline">
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
          {index !== subcategoryBlogs.length - 1 && <br />}{" "}
          {/* Conditionally render <br> */}
        </section>
      ))}
    </>
  );
};

export default SubcategoryBlog;
