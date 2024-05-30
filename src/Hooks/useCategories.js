import React, { useEffect, useState } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let flag = false;
    let data = localStorage.getItem("Categories");
    if (data) {
      let jsonData = JSON.parse(data);
      let oldTime = new Date(jsonData.time);
      let nowTime = new Date();
      if (nowTime - oldTime < 24 * 3600 * 1000) {
        flag = true;
        setCategories(jsonData.Categories);
      }
    }

    !flag && fetch("https://api.theoutmaker.com/api/get/category/all")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.Categories)
        localStorage.setItem("Categories", JSON.stringify({
          time: new Date().getTime(),
          Categories: data.Categories
        }))
      });
  }, []);
  return { categories }
};

export default useCategories;