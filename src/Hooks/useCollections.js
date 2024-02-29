import React, { useEffect, useState } from 'react';

const useCollections = () => {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
      fetch("https://www.theoutmaker.com/api/get/collection/all")
        .then((res) => res.json())
        .then((data) => setCollections(data.Collections));
    }, []);
    return {collections}
};

export default useCollections;