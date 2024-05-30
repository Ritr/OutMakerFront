import React, { useEffect, useState } from 'react';

const useMeterials = () => {
    const [meterials, setMeterials] = useState([]);
    useEffect(() => {
      fetch("https://api.theoutmaker.com.au/api/get/material/all")
        .then((res) => res.json())
        .then((data) => setMeterials(data.Materials));
    }, []);
    return { meterials}
};

export default useMeterials;