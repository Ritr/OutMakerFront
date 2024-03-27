import React, { useEffect, useState } from "react";
import { BsArrowRight, BsFillFilterCircleFill } from "react-icons/bs";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import useCategories from "../../Hooks/useCategories";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import OutdoorDiningChairCard from "../collections/OutdoorDiningChairCard.jsx";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

const CategoryAllProducts = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const categoryItem = useLoaderData();
  const { id } = useParams();
  const { categories } = useCategories();
  const [sort, setSort] = useState(null);
  const filteredCollection = categories.filter(
    (collection) => collection?.category_id !== parseInt(id)
  );
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://theoutmaker.com/api/get/category/product/all/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let products = JSON.parse(data);
        let productsArr = Object.values(products);
        productsArr.sort((a, b) => {
          return a.product.p_type > b.product.p_type ? -1 : 1;
        });
        setProducts(productsArr);
      });
    window.scrollTo(0, 0);
  }, [id, category]);
  useEffect(() => {
    if (!sort) {
      return;
    }
    let productsArr = [...products];
    switch (sort) {
      // 综合排序
      case "score":
        // productsArr.sort((a, b) => {
        //   return a.price[0].product_regular_price >
        //     b.price[0].product_regular_price
        //     ? -1
        //     : 1;
        // });
        break;
      // 销量排序
      case "sales":
        // productsArr.sort((a, b) => {
        //   return a.price[0].product_regular_price >
        //     b.price[0].product_regular_price
        //     ? -1
        //     : 1;
        // });
        break;
      case "price1":
        productsArr.sort((a, b) => {
          return a.price[0].product_regular_price >
            b.price[0].product_regular_price
            ? -1
            : 1;
        });
        break;
      case "price2":
        productsArr.sort((a, b) => {
          return a.price[0].product_regular_price <
            b.price[0].product_regular_price
            ? -1
            : 1;
        });
        break;
      case "collection":
        productsArr.sort((a, b) => {
          return a.product.collection_id < b.product.collection_id ? -1 : 1;
        });
        break;
    }
    setProducts(productsArr);
  }, [sort]);
  return (
    <>
      <div className="w-full">
        <nav className="sm:pt-16 md:py-8">
          <ul className="flex text-sm text-[#000000] font-normal">
            {/*<li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/">Home</Link>
            </li>
            <li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/collections">Collections</Link>
            </li>
            <li className="font-medium">
              {!category ? categoryItem?.Category.category_name : ""}
            </li>*/}
          </ul>
        </nav>

        <div className="text-center w-10/12 mx-auto">
          <h2 className="text-primary font-normal text-2xl md:text-4xl">
            {categoryItem?.Category.category_desc}
          </h2>
          {/* <p className='text-xl md:text-2xl font-light text-primary py-8 md:py-16'>
					Ludlow mixes materials and textures, creating a design that feels both
					modern and organic. Enjoy a low-profile frame wrapped in a light
					wicker with weathered teak feet and textured Sunbrella fabrics.
				</p> */}
        </div>

        <div className="md:flex  justify-between pt-14 gap-2 px-6 md:px-0">
          <p className="border-1 mb-4 md:mb-0 border text-xs md:text-lg font-medium rounded-full py-2 px-4 w-max border-primary text-center">
            {products.length} Products
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold md:mr-2 text-md">Sort By:</span>
            <button
              className={`p-1 md:p-2 border font-normal text-xs md:text-md h-auto min-h-0  ${
                sort === "score" ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSort("score")}
            >
              score
            </button>
            <button
              className={`p-1 md:p-2 border font-normal text-xs md:text-md h-auto min-h-0  ${
                sort === "sales" ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSort("sales")}
            >
              sales
            </button>
            <button
              className={`flex items-center p-1 md:p-2 border font-normal text-xs md:text-md h-auto min-h-0  ${
                sort === "price1" ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSort("price1")}
            >
              Price <FaArrowDownLong></FaArrowDownLong>
            </button>
            <button
              className={`flex items-center p-1 md:p-2 border font-normal text-xs md:text-md h-auto min-h-0  ${
                sort === "price2" ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSort("price2")}
            >
              Price <FaArrowUpLong></FaArrowUpLong>
            </button>
            <button
              className={`p-1 md:p-2 border font-normal text-xs md:text-md h-auto min-h-0  ${
                sort === "collection" ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSort("collection")}
            >
              Collection
            </button>
            {/* <label htmlFor="score" className="">
              <input type="radio" name="sort1" id="score" className="hidden" />
              <span className="cursor-pointer">score</span>
            </label>
            <label htmlFor="sales">
              <input type="radio" name="sort1" id="sales" className="hidden" />
              <span className="cursor-pointer">sales</span>
            </label>

            <label htmlFor="price1" onClick={() => setSort("price1")}>
              <input type="radio" name="sort1" id="price1" className="hidden" />
              <span className="cursor-pointer">Price (High to Low)</span>
            </label>

            <label htmlFor="price2" onClick={() => setSort("price2")}>
              <input type="radio" name="sort1" id="price2" className="hidden" />
              <span className="cursor-pointer">Price (Low to High)</span>
            </label>

            <label htmlFor="collection" onClick={() => setSort("collection")}>
              <input
                type="radio"
                name="sort1"
                id="collection"
                className="hidden"
              />
              <span className="cursor-pointer">Collection</span>
            </label> */}
          </div>
          {/* <p
					className='flex w-max border items-center px-4 justify-between border-1 text-xs md:text-lg font-medium rounded-full py-2 border-primary cursor-pointer hover:bg-primary hover:text-white gap-x-8'
					onClick={() => setShowModal(true)}>
					Filter
					<span className='pl-0 md:pl-4'>
						<BsFillFilterCircleFill />
					</span>
				</p> */}
        </div>

        {!category ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {/* {products?.map((product) => (
            <div key={product?.p_id} className="rounded-lg shadow-lg relative">
              <div className="lg:h-[250px]">
                <img
                  src={ImgBaseUrl(product?.p_pic)}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div
                className="px-4 pb-4"
                style={{ boxShadow: "0px 0px 50px 1px #f5f5f5" }}
              >
                <h5 className="text-lg font-medium text-black">
                  {product?.p_name}
                </h5>
                <p className="text-xs font-normal text-[#B8B8B8] leading-none">
                  {categoryItem?.Category.category_name}
                </p>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex w-max gap-4">
                    <input
                      type="radio"
                      name={product.id}
                      className="radio radio-warning"
                      checked
                      style={{ width: "25px", height: "25px" }}
                    />
                    <input
                      type="radio"
                      name={product.id + 1}
                      className="radio"
                      checked
                      disabled
                      style={{ width: "25px", height: "25px" }}
                    />
                    <input
                      type="radio"
                      name={product.id + 2}
                      className="radio"
                      checked
                      style={{ width: "25px", height: "25px" }}
                    />
                  </div>
                  <p>$600</p>
                </div>
              </div>

              <div className="absolute inset-0 bg-cover bg-center z-0"></div>

              <div className="opacity-1 md:opacity-0 hover:opacity-[1] duration-300 ">
                <div className="absolute inset-0 z-10 flex justify-start items-start top-4 left-4 text-xs text-black font-normal p-1">
                 <Rating style={{ maxWidth: 100 }} value={3} readOnly activeColor="black"/>
                </div>
                <p className="absolute inset-0 z-10 flex justify-end items-center top-1/4 right-7 text-xs text-black font-normal p-1">
                  <Link to={`/product-details/${"id"}`}>
                    <p className="border-b-2 border-black flex">
                      Shop <BsArrowRight />
                    </p>
                  </Link>
                </p>
              </div>
            </div>
          ))} */}

            {/* obj handle */}

            {products?.map((product) => (
              <Link
                to={`/product-details/${id}/${product.purl}`}
                key={product?.product?.p_id}
              >
                <div className="rounded-lg shadow-lg relative transform transition duration-300 hover:scale-105">
                  <div className="lg:h-[250px]">
                    <img
                      src={ImgBaseUrl(product?.product?.p_pic)}
                      alt=""
                      className="w-full h-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div
                    className="px-4 pb-4"
                    style={{ boxShadow: "0px 0px 50px 1px #f5f5f5" }}
                  >
                    <p className="text-lg font-medium text-black cursor-pointer">
                      {product?.product?.p_name.slice(0, 50)}
                    </p>
                    <p className="text-xs font-normal text-[#B8B8B8] leading-none">
                      {categoryItem?.Category.category_name}
                    </p>
                    <div className="flex justify-between items-center pt-4">
                      {/* for color selection */}

                      {/* <div className="flex w-max gap-4">
                  <input
                    type="radio"
                    name={product.id}
                    className="radio radio-warning"
                    checked
                    style={{ width: "25px", height: "25px" }}
                  />
                  <input
                    type="radio"
                    name={product.id + 1}
                    className="radio"
                    checked
                    disabled
                    style={{ width: "25px", height: "25px" }}
                  />
                  <input
                    type="radio"
                    name={product.id + 2}
                    className="radio"
                    checked
                    style={{ width: "25px", height: "25px" }}
                  />
                </div> */}
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={product?.review?.[0]?.review}
                        readOnly
                      />
                      <p>${product?.price?.[0]?.product_sale_price}</p>
                    </div>
                  </div>

                  {/* <div className="absolute inset-0 bg-cover bg-center z-0"></div> */}

                  <div className="opacity-1 md:opacity-0 hover:opacity-[1] duration-300 ">
                    {/* <div className="absolute inset-0 z-10 flex justify-start items-start top-4 left-4 text-xs text-black font-normal p-1">
              <Rating style={{ maxWidth: 100 }} value={product?.review?.[0]?.review} readOnly />
              </div> */}
                    <div className="absolute inset-1 z-10 flex justify-end items-center top-1/4 right-7 text-xs text-black font-normal p-1">
                      {/* <Link to={`/product-details/${product?.product?.p_id}`}>
                  <p className="border-b-2 border-black flex font-bold">
                    Shop <BsArrowRight />
                  </p>
                </Link> */}
                      <p className="border-b-2 border-black flex font-bold">
                        Shop <BsArrowRight />
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {/* obj handle */}
            {products?.map(({ product, price, purl }) => {
              <OutdoorDiningChairCard
                categoryId={product.category_id}
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
                colorOptions={["#222222", "#0453AA"]} // Set default or derive from category data
              ></OutdoorDiningChairCard>;
            })}
            {products?.map(({ product, price, purl }) => (
              <OutdoorDiningChairCard
                categoryId={product.category_id}
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
                colorOptions={["#222222", "#0453AA"]} // Set default or derive from category data
              ></OutdoorDiningChairCard>
            ))}
          </div>
        )}

        {showModal ? (
          <>
            <div className="justify-start items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-2/3 md:w-5/12 my-6 mr-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-r-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-10">
                  <div className="flex justify-between border-b-2 border-primary mb-4">
                    <p className="md:text-xl font-bold text-primary">FILTER</p>
                    <p
                      className="font-medium text-2xl cursor-pointer"
                      onClick={() => setShowModal(false)}
                    >
                      &#215;
                    </p>
                  </div>
                  <div className="border-b-2 border-primary mb-3">
                    <p className="text-xl font-normal text-primary pb-2">
                      Availability
                    </p>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="in stock"
                        className="radio radio-xs"
                        checked
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">In Stock</p>
                    </div>
                  </div>
                  <div className="border-b-2 border-primary mb-3">
                    <p className="text-xl font-normal text-primary pb-2">
                      Fabric Color
                    </p>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="Pacific Fog Gray"
                        className="radio radio-xs radio-warning"
                        checked
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">
                        Pacific Fog Gray
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="Dark Pebble Gray"
                        className="radio radio-xs"
                        checked
                        disabled
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">
                        Dark Pebble Gray
                      </p>
                    </div>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="Black Hash Gray"
                        className="radio radio-xs"
                        checked
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">
                        Black Hash Gray
                      </p>
                    </div>
                  </div>
                  <div className="border-b-2 border-primary mb-3">
                    <p className="text-xl font-normal text-primary pb-2">
                      Product Type
                    </p>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="Sofa"
                        className="radio radio-xs"
                        checked
                        disabled
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">Sofa</p>
                    </div>
                    <div className="flex items-center pb-3">
                      <input
                        type="radio"
                        name="Sectional"
                        className="radio radio-xs"
                        checked
                        style={{ width: "25px", height: "25px" }}
                      />
                      <p className="ps-2 text-xs font-normal">Sectional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CategoryAllProducts;
