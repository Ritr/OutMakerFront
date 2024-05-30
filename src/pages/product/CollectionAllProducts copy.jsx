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
      fetch(`https://api.theoutmaker.com/api/get/collection/product/all/${id}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    window.scrollTo(0, 0);
  }, [id, category]);

  return (
    <>
      <ProductHeader
        category={category}
        product={category ? categoryItem?.Collection : categoryItem?.Category}
      />
      <div className="w-full">
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
          <h2 className="text-primary font-normal text-2xl md:text-5xl">
            Meet Arper’s New 2023 Collections That Inspire Beauty, Energy &
            Vitality
          </h2>
          {/* <p className='text-xl md:text-2xl font-light text-primary py-8 md:py-16'>
					Ludlow mixes materials and textures, creating a design that feels both
					modern and organic. Enjoy a low-profile frame wrapped in a light
					wicker with weathered teak feet and textured Sunbrella fabrics.
				</p> */}
        </div>

        <div className="flex justify-between pt-14 gap-2">
          <p className="border-1 border text-xs md:text-lg font-medium rounded-full py-2 px-4 w-max border-primary text-center">
            {Object.values(products).length} Products
          </p>
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

            {Object.values(products)?.map((product) => (
              <Link
                to={`/product-details/${product?.product?.p_id}/${product?.purl}`}
                key={product?.product?.p_id}
              >
                <div className="rounded-lg shadow-lg relative">
                  <div className="lg:h-[250px]">
                    <img
                      src={ImgBaseUrl(product?.product?.p_pic)}
                      alt=""
                      className="object-contain w-full h-full"
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
            {Object.values(products)?.map((product) => (
              <Link
                to={`/product-details/${product?.product?.p_id}/${product?.purl}`}
                key={product?.product?.p_id}
              >
                <div className="rounded-lg shadow-lg relative">
                  <div className="lg:h-[250px]">
                    <img
                      src={ImgBaseUrl(product?.product?.p_pic)}
                      alt=""
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div
                    className="px-4 pb-4"
                    style={{ boxShadow: "0px 0px 50px 1px #f5f5f5" }}
                  >
                    <p className="text-lg font-medium text-black cursor-pointer">
                      {product?.product?.p_name.slice(0, 50)}
                    </p>
                    {/* <p className="text-xs font-normal text-[#B8B8B8] leading-none">
                {categoryItem?.Category.category_name}
              </p> */}
                    <div className="flex justify-between items-center pt-4">
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
