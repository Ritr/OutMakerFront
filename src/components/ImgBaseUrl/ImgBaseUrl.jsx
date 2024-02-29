import React from "react";

const ImgBaseUrl = (id) => {
  if(id && id.indexOf('http') === 0){
    return id;
  }
  const ImgUrl = `https://www.theoutmaker.com/${id}`;
  // const ImgUrl = `https://backend.outmaker.cn//${id}`;
  return ImgUrl; // Return inside the function
};

export default ImgBaseUrl;
