import React, { useEffect, useState } from 'react';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://theoutmaker.com/api/get/category/all")
      .then((res) => res.json())
      .then((data) => setCategories(data.Categories));
  }, []);
    return { categories}
};

export default useCategories;