import React, { useEffect, useState } from 'react';

const useSubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    useEffect(() => {
      fetch("https://www.theoutmaker.com/public/api/get/subcategory/all")
        .then((res) => res.json())
        .then((data) => setSubCategories(data.Subcategories));
    }, []);
    return {subCategories}
};

export default useSubCategories;