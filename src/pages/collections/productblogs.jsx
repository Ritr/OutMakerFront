// Blogs.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useCollections from "../../Hooks/useCollections.js";
import useProducts from "../../Hooks/useProductAll.js";
import OutdoorDiningChairCard from "./OutdoorDiningChairCard.jsx";
import { FiFilter } from "react-icons/fi";
import { throttle } from "lodash";

const Blogs = () => {
  const { collections } = useCollections();
  const { products } = useProducts();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [topPos, setTopPos] = useState(0);
  const elementRef = useRef(null);
  const divRef = useRef(null);
  const [distanceFromRight, setDistanceFromRight] = useState(null);
  useEffect(() => {}, []);
  useEffect(() => {
    const { top } = elementRef.current.getBoundingClientRect();
    setTopPos(top + 55);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    // const handleScroll = () => {
    //   // const h = Math.min(0, window.scrollY);
    //   const y = window.scrollY;
    //   let h = top + 50 - y;
    //   if(h<0){
    //     h = 0;
    //   }
    //   console.log(window.scrollY);
    //   setTopPos(h);
    // };
    // const handleScroll = throttle(() => {
    //   if (elementRef.current) {
    //     const { top } = elementRef.current.getBoundingClientRect();
    //     const y = window.scrollY;
    //     let h = top + 50 - y;
    //     if (h < 0) {
    //       h = 0;
    //     }
    //     setTopPos(h);
    //   }
    // }, 100); // 控制节流的时间间隔

    // window.addEventListener("scroll", handleScroll);

    return () => {
      // window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isProduct = location?.pathname === "/categories" ? true : false;

  const toggleFilters = () => {
    console.log(showFilters);
    if (!showFilters) {
      setTimeout(() => {
        const divRect = divRef.current.getBoundingClientRect();
        console.log(divRect);
        const distance = divRect.width + window.innerWidth - divRect.right;
        setDistanceFromRight(distance);
      }, 100);
    }
    setShowFilters(!showFilters);
  };

  // State to hold the active filters
  const [activeFilters, setActiveFilters] = useState({
    sort: "recommended", // 'priceLowToHigh' or 'priceHighToLow'
    seatCount: null, // could be '1-2', '3-4', '5-6', '7+'
    productType: null, // could be 'modularChair', 'chaiseLounges', etc.
  });
  // State to hold the filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Effect to filter products whenever the products list or active filters change
  useEffect(() => {
    let updatedProducts = [...Object.values(products)];
    // Implement your sorting logic here based on the activeFilters.sort
    if (activeFilters.sort === "priceLowToHigh") {
      updatedProducts.sort(
        (a, b) => a.price[0].product_sale_price - b.price[0].product_sale_price
      );
    } else if (activeFilters.sort === "priceHighToLow") {
      updatedProducts.sort(
        (a, b) => b.price[0].product_sale_price - a.price[0].product_sale_price
      );
    }

    if (activeFilters.productType) {
      const typeMapping = {
        "combination sofa": 1,
        "single sofa": 2,
        "sun lounge": 3,
        "dining table&chair": 4,
      };
      updatedProducts.map((product) => {
        console.log(product);
      });
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.product.p_type2 === typeMapping[activeFilters.productType]
      );
    }

    // Filtering logic for seat count (seat_type)
    if (activeFilters.seatCount) {
      const seatMapping = {
        "1-2": 1,
        "3-4": 2,
        "5-6": 3,
      };
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.product.seat_type === seatMapping[activeFilters.seatCount]
      );
    }

    // Filtering logic for frame type (frame_type)
    if (activeFilters.frameType) {
      const frameMapping = {
        sunbrella: 17,
        aluminum: 18,
        teak: 19,
        rattan: 20,
      };
      updatedProducts = updatedProducts.filter((product) => {
        let res = product.materials.find((material) => {
          return material.material_id == frameMapping[activeFilters.frameType];
        });
        if (res) {
          return true;
        } else {
          return false;
        }
      });

      console.log(updatedProducts);
    }

    // Implement your filtering logic here based on other activeFilters properties
    // For example, filter by seat count or product type

    setFilteredProducts(updatedProducts);
  }, [products, activeFilters]);

  // Handler functions to update the filters
  const handleSortChange = (sortCriteria) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      sort: sortCriteria,
    }));
  };

  const handleSeatCountChange = (seatCount) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      seatCount: seatCount,
    }));
  };

  const handleProductTypeChange = (productType) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      productType: productType,
    }));
  };

  const handleFrameTypeChange = (frameType) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      frameType: frameType,
    }));
  };

  return (
    <section className="w-full">
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold text-black mb-2">
          {isProduct ? "CATEGORIES" : "COLLECTIONS"}
        </h2>
        <h4 className="text-xl text-gray-800 mb-8">OUTMAKER</h4>
        <p className="text-lg text-gray-600">
          Outmaker offers {collections?.length}{" "}
          {isProduct ? "categories" : "collections"} of outdoor furniture with
          unique designs which will meet your special needs
        </p>
      </div>

      <div
        className={`w-full items-center justify-end p-4 ${
          isProduct ? "flex" : "hidden"
        }`}
      >
        <span
          onClick={toggleFilters}
          ref={elementRef}
          className="cursor-pointer"
        >
          {showFilters ? "Hide" : "Show"} Filters
        </span>
        <FiFilter className="ml-2" />
      </div>

      {/* Main content */}
      <div className="w-full flex flex-col lg:flex-row justify-end">
        {/*Filter bar  Sorting options */}
        <aside
          className={`${
            showFilters ? "filter-container" : "hidden"
          } flex-1 p-4 border text-left transition-all duration-300 ease-in-out  bg-base-100 lg:fixed`}
          style={{
            display: showFilters
              ? windowWidth <= 768
                ? "grid"
                : "block"
              : "none",
            top: `${topPos}px`,
            right: showFilters
              ? windowWidth <= 768
                ? 0
                : distanceFromRight
              : 0,
          }}
        >
          {/* Sort options with larger custom radio buttons */}
          <div className="mb-6 w-full h-auto">
            <h3 className="text-[#181818]">Sort By</h3>
            <div
              className="flex flex-col mb-1 text-sm"
              style={{ lineHeight: 2 }}
            >
              <div className="flex items-center">
                <input
                  id="recommended"
                  type="radio"
                  name="sort"
                  value="recommended"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.sort === "recommended"}
                  onChange={() =>
                    setActiveFilters({ ...activeFilters, sort: "recommended" })
                  }
                />
                <label
                  htmlFor="recommended"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Recommended
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="priceLowToHigh"
                  type="radio"
                  name="sort"
                  value="priceLowToHigh"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.sort === "priceLowToHigh"}
                  onChange={() =>
                    setActiveFilters({
                      ...activeFilters,
                      sort: "priceLowToHigh",
                    })
                  }
                />
                <label
                  htmlFor="priceLowToHigh"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Price (Low to High)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="priceHighToLow"
                  type="radio"
                  name="sort"
                  value="priceHighToLow"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.sort === "priceHighToLow"}
                  onChange={() =>
                    setActiveFilters({
                      ...activeFilters,
                      sort: "priceHighToLow",
                    })
                  }
                />
                <label
                  htmlFor="priceHighToLow"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Price (High to Low)
                </label>
              </div>
            </div>
          </div>

          {/* Seat Count options */}
          <div className="mb-6 w-full h-auto">
            <h3 className="text-[#181818]">Seat Count</h3>
            <div
              className="flex flex-col mb-1 text-sm"
              style={{ lineHeight: 2 }}
            >
              <div className="flex items-center">
                <input
                  id="seatCount1-2"
                  type="radio"
                  name="seatCount"
                  value="1-2"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.seatCount === "1-2"}
                  onChange={() => handleSeatCountChange("1-2")}
                />
                <label
                  htmlFor="seatCount1-2"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  1-2
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="seatCount3-4"
                  type="radio"
                  name="seatCount"
                  value="3-4"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.seatCount === "3-4"}
                  onChange={() => handleSeatCountChange("3-4")}
                />
                <label
                  htmlFor="seatCount3-4"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  3-4
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="seatCount5-6"
                  type="radio"
                  name="seatCount"
                  value="5-6"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.seatCount === "5-6"}
                  onChange={() => handleSeatCountChange("5-6")}
                />
                <label
                  htmlFor="seatCount5-6"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  5-6
                </label>
              </div>
              {/* Add more seat count options as needed */}
            </div>
          </div>

          {/* Product Type options */}
          <div className="mb-6 w-full h-auto">
            <h3 className="text-[#181818]">Product Type</h3>
            <div
              className="flex flex-col mb-1 text-sm"
              style={{ lineHeight: 2 }}
            >
              <div className="flex items-center">
                <input
                  id="productTypeCombinationSofa"
                  type="radio"
                  name="productType"
                  value="combination sofa"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.productType === "combination sofa"}
                  onChange={() => handleProductTypeChange("combination sofa")}
                />
                <label
                  htmlFor="productTypeCombinationSofa"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Combination Sofa
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="productTypeSingleSofa"
                  type="radio"
                  name="productType"
                  value="single sofa"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.productType === "single sofa"}
                  onChange={() => handleProductTypeChange("single sofa")}
                />
                <label
                  htmlFor="productTypeSingleSofa"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Single Sofa
                </label>
              </div>{" "}
              <div className="flex items-center">
                <input
                  id="productTypeSunLounge"
                  type="radio"
                  name="productType"
                  value="sun lounge"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.productType === "sun lounge"}
                  onChange={() => handleProductTypeChange("sun lounge")}
                />
                <label
                  htmlFor="productTypeSunLounge"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Sun lounge
                </label>
              </div>{" "}
              <div className="flex items-center">
                <input
                  id="productTypeDiningTable&chair"
                  type="radio"
                  name="productType"
                  value="dining table&chair"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.productType === "dining table&chair"}
                  onChange={() => handleProductTypeChange("dining table&chair")}
                />
                <label
                  htmlFor="productTypeDiningTable&chair"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Dining table&chair
                </label>
              </div>
            </div>
          </div>

          {/* Frame Type options */}
          <div className="mb-2 w-full h-auto">
            <h3 className="text-[#181818]">Frame Type</h3>
            <div
              className="flex flex-col mb-1 text-sm"
              style={{ lineHeight: 2 }}
            >
              <div className="flex items-center">
                <input
                  id="frameTypeSunbrella"
                  type="radio"
                  name="frameType"
                  value="sunbrella"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.frameType === "sunbrella"}
                  onChange={() => handleFrameTypeChange("sunbrella")}
                />
                <label
                  htmlFor="frameTypeSunbrella"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Sunbrella
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="frameTypeTeak"
                  type="radio"
                  name="frameType"
                  value="teak"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.frameType === "teak"}
                  onChange={() => handleFrameTypeChange("teak")}
                />
                <label
                  htmlFor="frameTypeTeak"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Teak
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="frameTypeRattan"
                  type="radio"
                  name="frameType"
                  value="rattan"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.frameType === "rattan"}
                  onChange={() => handleFrameTypeChange("rattan")}
                />
                <label
                  htmlFor="frameTypeRattan"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Rattan
                </label>
              </div>{" "}
              <div className="flex items-center">
                <input
                  id="frameTypeAluminum"
                  type="radio"
                  name="frameType"
                  value="aluminum"
                  className="w-4 h-4  radio checked:bg-blue-500"
                  checked={activeFilters.frameType === "aluminum"}
                  onChange={() => handleFrameTypeChange("aluminum")}
                />
                <label
                  htmlFor="frameTypeAluminum"
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  Aluminum
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div
          ref={divRef}
          className={`w-full ${
            showFilters
              ? "lg:w-3/4 lg:grid-cols-2 gap-[37px]"
              : "lg:w-full lg:grid-cols-3 gap-[43px]"
          } grid grid-cols-1 sm:grid-cols-2  p-4`}
        >
          {filteredProducts.map(({ product, review, price }) => (
            <OutdoorDiningChairCard
              key={product.p_id}
              id={product?.p_id}
              imageUrl={`https://www.theoutmaker.com/${product.p_pic}`} // Adjust the path as needed
              title={product.p_name}
              review={product?.review?.[0]?.review}
              price={`A$${price[0].product_sale_price}`} // Display sale price
              originalPrice={`A$${price[0].product_regular_price}`} // Display regular price
              discountMessage={`Save A$${
                price[0].product_regular_price - price[0].product_sale_price
              } `} // Calculate discount
              warrantyOptions={[
                {
                  key: "10",
                  text: "10 Year Warranty",
                },
                {
                  key: "waterproof",
                  text: "Waterproof",
                },
                {
                  key: "sunbrella",
                  text: "sunbrella washable",
                },
              ]} // Set default or derive from category data
              colorOptions={["#222222", "#0453AA"]} // Set default or derive from category data
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
