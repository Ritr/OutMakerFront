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

const CollectionAllProducts = ({ category }) => {
  const [showModal, setShowModal] = useState(false);
  const categoryItem = useLoaderData();
  const { id } = useParams();
  const { collections } = useCollections();
  const filteredCollection = collections.filter(
    (collection) => collection?.category_id !== parseInt(id)
  );
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (category) {
      fetch(`https://theoutmaker.com/api/get/collection/product/all/${id}`)
        .then((res) => res.json())
        .then((data) => setProducts(JSON.parse(data)));
        console.log("Itzmrnh Collection", collections);
    } else {
      fetch(`https://theoutmaker.com/api/get/category/product/all/${id}`)
        .then((res) => res.json())
        .then((data) => setProducts(JSON.parse(data)));
    }
    window.scrollTo(0, 0);
  }, [id, category]);

  return (
    <>
      <ProductHeader
        category={category}
        product={category ? categoryItem?.Collection : categoryItem?.Category}
      />
      <div className="w-full px-5">
        <nav className="py-8">
          <ul className="flex text-sm text-[#000000] font-normal">
            <li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/">Home</Link>
            </li>
            <li className="me-6 pb-1 border-b-2 border-b-black">
              <Link to="/collections">Collections</Link>
            </li>
            <li className="font-semibold">
              {!category ? categoryItem?.Category.category_name : ""}
            </li>
          </ul>
        </nav>

        <div className="text-center w-10/12 mx-auto">
          <h2 className="text-primary font-normal text-2xl md:text-4xl">
            {category ? categoryItem?.Collection.collection_desc : categoryItem?.Category}
          </h2>
        </div>

        <div className="flex justify-between pt-14 gap-2">
          <p className="border-1 border text-xs md:text-lg font-medium rounded-full py-2 px-4 w-max border-primary text-center">
            {Object.values(products).length} Products
          </p>
        </div>

        {!category ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {Object.values(products)?.map((product) => (
              <OutdoorDiningChairCard
                key={product.p_id}
                id={product?.p_id}
                imageUrl={ImgBaseUrl(product?.product?.p_pic)} // Adjust the path as needed
                title={product?.product?.p_name.slice(0, 50)}
                review={product?.review?.[0]?.review}
                price={`A$${product?.price[0].product_sale_price}`} // Display sale price
                originalPrice={`A$${product?.price[0].product_regular_price}`} // Display regular price
                discountMessage={`Save A$${
                  product?.price[0].product_regular_price -
                  product?.price[0].product_sale_price
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
            {/* obj handle */}
            {Object.values(products)?.map((product) => (
              <OutdoorDiningChairCard
                key={product?.product?.p_id}
                id={product?.product?.p_id}
                imageUrl={ImgBaseUrl(product?.product?.p_pic)} // Adjust the path as needed
                title={product?.product?.p_name.slice(0, 50)}
                review={product?.review?.[0]?.review}
                price={`A$${product?.price[0].product_sale_price}`} // Display sale price
                originalPrice={`A$${product?.price[0].product_regular_price}`} // Display regular price
                discountMessage={`Save A$${
                  product?.price[0].product_regular_price -
                  product?.price[0].product_sale_price
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
