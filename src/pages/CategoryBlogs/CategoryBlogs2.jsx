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

const CategoryBlog = ({ categoryBlogs }) => {
  if (categoryBlogs.length === 0) {
    return <p>Loading...</p>;
  }

  // console.log("categoryBlogs", categoryBlogs);
  return (
    <>
      <section>
        {/* <Link to={`/category-blogs/${blog?.category?.category_id}`} key={blog?.category?.category_id}>
          <h4 className="text-2xl md:text-3xl font-bold text-primary border-b-4 border-primary">
            {blog?.category?.category_name}
          </h4>
          </Link> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-2">
          {categoryBlogs.map((article) => (
            <>
              <div key={article.post_id} className="flex justify-between py-2">
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
              <div class="md:hidden h-[1px] bg-black w-full"></div>
            </>
          ))}
        </div>
        {/* {index !== categoryBlogs.length - 1 && <br />} Conditionally render <br> */}
      </section>
    </>
  );
};

export default CategoryBlog;
