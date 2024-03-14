import React from "react";
import ImgBaseUrl from "./ImgBaseUrl/ImgBaseUrl";
const ImageScale = (url, width) => {
  // 判断是否是shopify cdn image
  url = ImgBaseUrl(url);
  if (url.indexOf("https://cdn.shopify.com") >= 0) {
    let lastDotIndex = url.lastIndexOf(".");
    let p0 = url.substr(0, lastDotIndex);
    let p1 = url.substr(lastDotIndex);

    url = p0 + "_" + width + "x" + width + p1;
  }
  return url;
};

export default ImageScale;
