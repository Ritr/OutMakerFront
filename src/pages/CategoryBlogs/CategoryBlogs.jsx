import React, { useState, useEffect } from "react";
import AllBlogsHeader from "./AllBlogsHeader";
import PageNav from "./PageNav";
import FeatureArticle from "./FeatureArticle";
import LatestArticle from "./LatestArticle";
import SubcategoryBlog from "./SubcategoryBlogs";
import CategoryBlog from "./CategoryBlogs2";
import Ideas from "./Ideas";
import Network from "../../shared/Network/Network";
import Video from "./Video";
import Projects from "./Projects";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { useLoaderData } from "react-router-dom";

const CategoryBlogs = () => {
  const receivedData = useLoaderData();
  const { BlogSubCategories, Category, Subcategory_Blogs, Category_Blogs } = receivedData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // const [featureArticleData, setFeatureArticleData] = useState([]);
  // const [blogCategories, setBlogCategories] = useState([]);
  // const [categoryBlogs, setCategoryBlogs] = useState([]);
  // const [latestBlogs, setLatestBlogs] = useState([]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   // Use useEffect to handle data retrieval
  //   fetch(`https://api.theoutmaker.com/api/get/frontend/blogs/all`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.Category_Blogs);
  //       setFeatureArticleData(data.FeaturedBlogs);
  //       setBlogCategories(data.BlogCategories);
  //       setCategoryBlogs(data.Category_Blogs);
  //       setLatestBlogs(data.LatestBlogs);
  //     });
  // }, []); // Empty array indicates it runs only once when the component mounts

  // console.log('category_blogs', Category_Blogs);


  return (
    <main className="lg:max-w-[1600px] mx-auto">
      <AllBlogsHeader Category={Category} />
      <div className="w-full">
        <br></br>
        {/* <PageNav Category={Category} blogCategories={BlogSubCategories} /> */}
        {/* <FeatureArticle /> */}
        {/* <LatestArticle latestBlogs={Subcategory_Blogs} /> */}

        {/* {Subcategory_Blogs.length > 0 && <SubcategoryBlog subcategoryBlogs={Subcategory_Blogs} />} */}
        {/* {<SubcategoryBlog categoryBlogs={Category_Blogs} />} */}
        {/* <Ideas /> */}
        {/* <Video /> */}

         <CategoryBlog categoryBlogs={Category_Blogs} />

        <Network />
      </div>
    </main>
  );
};

export default CategoryBlogs;
