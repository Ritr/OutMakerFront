import React, { useState, useEffect } from "react";
import AllBlogsHeader from "./AllBlogsHeader";
import PageNav from "./PageNav";
import FeatureArticle from "./FeatureArticle";
import LatestArticle from "./LatestArticle";
import CategoryBlog from "./CategoryBlogs";
import Ideas from "./Ideas";
import Network from "../../shared/Network/Network";
import Video from "./Video";
import Projects from "./Projects";
import UserInitialization from "../../components/UserInitialization/UserInitialization";

const AllBlogs = () => {
  const [featureArticleData, setFeatureArticleData] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Use useEffect to handle data retrieval
    fetch(`https://theoutmaker.com/api/get/frontend/blogs/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Category_Blogs);
        setFeatureArticleData(data.FeaturedBlogs);
        setBlogCategories(data.BlogCategories);
        setCategoryBlogs(data.Category_Blogs);
        setLatestBlogs(data.LatestBlogs);
      });
  }, []); // Empty array indicates it runs only once when the component mounts

  return (
    <main>
      <AllBlogsHeader />
      <div className="md:mx-10 px-4 md:px-0">
        
        <PageNav blogCategories={blogCategories} />

        {featureArticleData.length > 0 && (
          <FeatureArticle data={featureArticleData} />
        )}

      
        {latestBlogs.length > 0 && <LatestArticle latestBlogs={latestBlogs} />}
        <br></br>
        {categoryBlogs.length > 0 && <CategoryBlog categoryBlogs={categoryBlogs} />}
        {/* {categoryBlogs.length > 0 && <Ideas categoryBlogs={categoryBlogs} />} */}
        {/* <Video /> */}
        <Network />
        <UserInitialization />
      </div>
    </main>
  );
};

export default AllBlogs;
