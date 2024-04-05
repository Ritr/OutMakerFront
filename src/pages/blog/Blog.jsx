import React, { useEffect } from "react";
import BlogHeader from "./BlogHeader";
import Posts from "./Posts";
import Articels from "./Articels";
import Network from "../../shared/Network/Network";
import mic from "../../assets/images/mic.png";
import UserInitialization from "../../components/UserInitialization/UserInitialization";
import { useLoaderData } from "react-router-dom";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const receivedData = useLoaderData();
  const { Category, Post, RelatedPosts, Subcategory } = receivedData;
  return (
    <main className="w-full relative lg:max-w-[1600px] mx-auto">
      <BlogHeader data={Post} />
      <Posts data={Post} />
      <Articels data={RelatedPosts} />
      <Network />

      <div className="absolute right-0 bottom-[0px]">
        <img src={mic} alt="" className="w-3/4 md:w-full" />
      </div>
      {/* to generate a rnadom number when user will land on this page */}
    </main>
  );
};

export default Blog;
