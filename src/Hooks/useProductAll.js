//  https://api.theoutmaker.com.au/api/get/product/all
import React, { useEffect, useState } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://api.theoutmaker.com.au/api/get/product/all")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    return { products }
};

export default useProducts;