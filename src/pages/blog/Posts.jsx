import React from "react";
import img from "../../assets/images/blog-section.png";
import Post from "./Post";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import './posts.css';

const Posts = (data) => {
  return (
    <div className="blog-format">
      {/* <img src={img} alt="" /> */}

                <img
                  src={ImgBaseUrl(data.data.post_pic)}
                  alt=""
                  className="w-full h-full"
                />

      <div className="px-0 md:px-14 blog-format">
        <Post
          id={data.data.post_id}
          title={data.data.post_title}
          description={data.data.post_body}
        />
      </div>
    </div>
  );
};

export default Posts;
