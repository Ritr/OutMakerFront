import React, { useEffect, useState } from "react";
import { BsArrowRight, BsFillFilterCircleFill } from "react-icons/bs";
import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import useCollections from "../../Hooks/useCollections";
import CollectionSlider from "./CollectionSlider";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ProductCard from "../../components/ProductCard";
import OutdoorDiningChairCard from "../collections/OutdoorDiningChairCard.jsx";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
const CollectionAllProducts = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const categoryItem = useLoaderData();
  const { id } = useParams();
  const { collections } = useCollections();
  const [sort, setSort] = useState(null);
  const filteredCollection = collections.filter(
    (collection) => collection?.category_id !== parseInt(id)
  );
  const [products, setProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  useEffect(() => {
    fetch(`https://theoutmaker.com/api/get/collection/product/all/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let products = data;
        let productsArr = Object.values(products);
        productsArr.sort((a, b) => {
          return a.product.p_type > b.product.p_type ? -1 : 1;
        });
        console.log("CollectionAllProducts", productsArr);
        setProducts(productsArr);
        setOldProducts(productsArr);
      });
    window.scrollTo(0, 0);
  }, [id, category]);
  useEffect(() => {
    // if (!sort) {
    //   return;
    // }
    let productsArr = [...products];
    switch (sort) {
      // 综合排序
      case "score":
        productsArr.sort((a, b) => {
          return a.review[0].review >
            b.review[0].review
            ? -1
            : 1;
        });
        break;
      // 销量排序
      case "sales":
        productsArr.sort((a, b) => {
          return a.product.sold_item >
            b.product.sold_item
            ? -1
            : 1;
        });
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
      default:
        productsArr = [...oldProducts];
        break;
    }
    setProducts(productsArr);
  }, [sort]);
  return (
    <>
      <ProductHeader
        category={category}
        product={category ? categoryItem?.Collection : categoryItem?.Category}
      />
      <div className="w-full px-5 py-2">
        <nav className="sm:pt-16 md:py-8">
          <ul className="flex text-sm text-[#000000] font-normal">
            <li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/">Home</Link>
            </li>
            <li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/collections">Collections</Link>
            </li>
            <li className="font-medium">
              {!category ? categoryItem?.Category.category_name : ""}
            </li>
          </ul>
        </nav>

        <div className="text-center w-10/12 mx-auto">
          <h2 className="text-primary font-normal text-2xl md:text-4xl">
            {category
              ? categoryItem?.Collection.collection_desc
              : categoryItem?.Category}
          </h2>
        </div>

        <div className="flex  justify-between items-center pt-14 gap-2">
          <p className=" md:mb-0 border-1 border text-xs md:text-lg font-medium rounded-full py-2 px-4 w-max border-primary text-center">
            {products.length} Products
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              className={`p-1 md:py-2 md:px-4 rounded-md  border border-primary font-normal text-sm md:text-base h-auto min-h-0  ${sort === "score" ? " text-white bg-primary" : ""
                }`}
              onClick={() => setSort("score")}
            >
              score
            </button>
            <button
              className={`p-1 md:py-2 md:px-4 rounded-md  border border-primary font-normal text-sm md:text-base h-auto min-h-0  ${sort === "sales" ? " text-white bg-primary" : ""
                }`}
              onClick={() => setSort("sales")}
            >
              sales
            </button>
            <button
              className={`flex p-1 md:py-2 md:px-4 rounded-md  border border-primary font-normal text-sm md:text-base h-auto min-h-0  ${(sort === "price1" || sort === "price2") ? " text-white bg-primary" : ""
                }`}
              onClick={
                () => {
                  sort == "price2"
                    ? setSort("price1") :
                    setSort("price2")
                }
              }
            >
              Price
              <div className="text-3xs md:text-xs ml-2 ">
                <BiSolidUpArrow
                  className={`text-4xs md:text-xs ${sort === "price2" ? "text-red-500" : ""
                    }`}
                /> <BiSolidDownArrow
                  className={`text-4xs md:text-xs ${sort === "price1" ? "text-red-500" : ""
                    }`}
                />
              </div>
            </button>
            <button className="flex p-1 md:py-2 md:px-4 rounded-md  border border-primary font-normal text-sm md:text-base h-auto min-h-0" onClick={() => {
              setSort(null);
            }}>Clear</button>
          </div>
        </div>

        {!category ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {products?.map((product) => (
              <OutdoorDiningChairCard
                categoryId={product.product.category_id}
                purl={product.purl}
                key={product.p_id}
                id={product?.p_id}
                imageUrl={ImgBaseUrl(product?.product?.p_pic)} // Adjust the path as needed
                title={product?.product?.p_name.slice(0, 50)}
                review={product?.review?.[0]?.review}
                price={`A$${product?.price[0].product_sale_price}`} // Display sale price
                originalPrice={`A$${product?.price[0].product_regular_price}`} // Display regular price
                discountMessage={`Save A$${product?.price[0].product_regular_price -
                  product?.price[0].product_sale_price
                  } `} // Calculate discount
                colorOptions={["#222222", "#0453AA"]} // Set default or derive from category data
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {/* obj handle */}
            {products?.map((product) => (
              // <div>{JSON.stringify(product)}</div>
              <OutdoorDiningChairCard
                materials={product.product.materials}
                images={product.product.images}
                Product_Colors={product.product.product_colors}
                categoryId={product.product.category_id}
                purl={product.purl}
                key={product?.product?.p_id}
                id={product?.product?.p_id}
                imageUrl={ImgBaseUrl(product?.product?.p_pic)} // Adjust the path as needed
                title={product?.product?.p_name.slice(0, 50)}
                review={product?.review?.[0]?.review}
                price={`A$${product?.price[0].product_sale_price}`} // Display sale price
                originalPrice={`A$${product?.price[0].product_regular_price}`} // Display regular price
                discountMessage={`Save A$${product?.price[0].product_regular_price -
                  product?.price[0].product_sale_price
                  } `} // Calculate discount
                colorOptions={["#222222", "#0453AA"]} // Set default or derive from category data
              />
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

      <CollectionSlider filteredCollection={filteredCollection} />
    </>
  );
};

export default CollectionAllProducts;
