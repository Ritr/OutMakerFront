// Blogs.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useCollections from "../../Hooks/useCollections.js";
import useProducts from "../../Hooks/useProductAll.js";
import OutdoorDiningChairCard from "./OutdoorDiningChairCard.jsx";
import { FiFilter } from "react-icons/fi";
import { throttle } from "lodash";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl.jsx";

import {
  useFetchSeat,
  useFetchCombination,
  useFetchFrame,
} from "../../Hooks/api/useFilters.js";
const Blogs = () => {
  const seatMutation = useFetchSeat();
  const combinationMutation = useFetchCombination();
  const frameMutation = useFetchFrame();
  const [seat, setSeat] = useState([]);
  const [combination, setCombination] = useState([]);
  const [frame, setFrame] = useState([]);
  const { collections } = useCollections();
  const { products } = useProducts();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [topPos, setTopPos] = useState(0);
  const elementRef = useRef(null);
  const divRef = useRef(null);
  const scrollY = useRef(0);
  const [distanceFromRight, setDistanceFromRight] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      try {
        seatMutation.mutate(null, {
          onSuccess(res) {
            setSeat(res.Types);
          },
        });
        combinationMutation.mutate(null, {
          onSuccess(res) {
            setCombination(res.Types);
          },
        });
        frameMutation.mutate(null, {
          onSuccess(res) {
            setFrame(res.Types);
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const { top } = elementRef.current.getBoundingClientRect();
    setTopPos(top + 55);
    setWindowWidth(window.innerWidth);

    const handleScroll = throttle(() => {
      const root = document.querySelector("#root");
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        // const y = body.scrollTop;
        let h = top + 55;
        if (top < 0) {
          h = 0;
        }
        let direction = root.scrollTop - scrollY.current > 0 ? true : false;
        console.log(direction);
        if (direction) {
          // h += 108;
        } else if (h < 120) {
          h = 120;
        }
        setTopPos(h);
        scrollY.current = root.scrollTop;
      }
    }, 40); // 控制节流的时间间隔

    document.querySelector("#root").addEventListener("scroll", handleScroll);
    return () => {
      document
        .querySelector("#root")
        .removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isProduct = location?.pathname === "/categories" ? true : false;

  const toggleFilters = () => {
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
      updatedProducts.map((product) => {
        console.log(product);
      });
      updatedProducts = updatedProducts.filter(
        (product) => product.product.p_type2 === activeFilters.productType
      );
    }

    // Filtering logic for seat count (seat_type)
    if (activeFilters.seatCount) {
      updatedProducts = updatedProducts.filter(
        (product) => product.product.seat_type === activeFilters.seatCount
      );
    }

    // Filtering logic for frame type (frame_type)
    if (activeFilters.frameType) {
      updatedProducts = updatedProducts.filter((product) => {
        let res = product.materials.find((material) => {
          return material.material_id == activeFilters.frameType;
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
  const clear = () => {
    setActiveFilters({
      sort: "recommended",
    });
  };
  return (
    <section className="w-full ">
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
      <div className="w-full flex flex-col lg:flex-row justify-end  md:min-h-[820px]">
        {/*Filter bar  Sorting options */}
        <aside
          className={`${
            showFilters ? "filter-container" : "hidden"
          } flex-1 p-4 border text-left transition-all duration-300 ease-in-out  bg-base-100 fixed`}
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
              {seat.map((item) => {
                return (
                  <div className="flex items-center">
                    <input
                      id={"seat" + item.type_id}
                      type="radio"
                      name="seatCount"
                      value={item.type_id}
                      className="w-4 h-4  radio checked:bg-blue-500"
                      checked={activeFilters.seatCount === item.type_id}
                      onChange={() => handleSeatCountChange(item.type_id)}
                    />
                    <label
                      htmlFor={"seat" + item.type_id}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {item.type_name}
                    </label>
                  </div>
                );
              })}

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
              {combination.map((item) => {
                return (
                  <div className="flex items-center">
                    <input
                      id={"product" + item.type_id}
                      type="radio"
                      name="productType"
                      value={item.type_id}
                      className="w-4 h-4  radio checked:bg-blue-500"
                      checked={activeFilters.productType === item.type_id}
                      onChange={() => handleProductTypeChange(item.type_id)}
                    />
                    <label
                      htmlFor={"product" + item.type_id}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {item.type_name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frame Type options */}
          <div className="mb-2 w-full h-auto">
            <h3 className="text-[#181818]">Frame Type</h3>
            <div
              className="flex flex-col mb-1 text-sm"
              style={{ lineHeight: 2 }}
            >
              {frame.map((item) => {
                return (
                  <div className="flex items-center">
                    <input
                      id={item.material_id}
                      type="radio"
                      name="frameType"
                      value={item.material_id}
                      className="w-4 h-4  radio checked:bg-blue-500"
                      checked={activeFilters.frameType === item.material_id}
                      onChange={() => handleFrameTypeChange(item.material_id)}
                    />
                    <label
                      htmlFor={item.material_id}
                      className="ml-2 text-gray-700 cursor-pointer"
                    >
                      {item.material_name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-2">
            <button
              onClick={clear}
              className="w-full button border text-xs px-4 py-2 rounded-sm shadow-md"
            >
              Clear All
            </button>
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
          {filteredProducts.map(({ product, review, price, purl }) => (
            <OutdoorDiningChairCard
              purl={purl}
              key={product.p_id}
              id={product?.p_id}
              imageUrl={ImgBaseUrl(product.p_pic)} // Adjust the path as needed
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
