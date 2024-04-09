//  https://theoutmaker.com/public/api/get/product/all
import React, { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://theoutmaker.com/public/api/get/product/all")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    return { products }
};

export default useProducts;