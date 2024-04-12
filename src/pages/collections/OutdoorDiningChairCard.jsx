import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { BsArrowRight } from "react-icons/bs";
import img1 from "../../assets/images/10.png";
import img2 from "../../assets/images/waterproof.png";
import img3 from "../../assets/images/washable.png";
import { MdOutlineDiscount } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoUmbrellaOutline } from "react-icons/io5";
import { TbWash } from "react-icons/tb";
import { LuHexagon } from "react-icons/lu";
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
const OutdoorDiningChairCard = ({
  materials = [],
  Product_Colors = [],
  images,
  id,
  purl,
  imageUrl,
  title,
  price,
  review,
  originalPrice,
  discountMessage,
  colorOptions,
  categoryId,
  isNew, // assuming this is a new prop to indicate if the item is new                <Link to={`/product-details/${p_id}`}></Link>
}) => {
  const [image, setImage] = useState(imageUrl);
  const [productColor, setProductColor] = useState({});
  const toggleColor = (color) => {
    if (productColor.color_name === color.color_name) {
      setProductColor({});
      setImage(imageUrl);
    } else {
      setProductColor(color);
      // filterColor(color);
    }

  }
  const find24 = () => {
    let res = materials.find(item => {
      return item.material_id == 24;
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    if (productColor.color_name) {
      const currentImage = images.find(item => {
        return item.image_color.color_name === productColor.color_name;
      });
      console.log(currentImage);
      if (currentImage) {
        setImage(ImgBaseUrl(currentImage.image_url));
      }
    }
  }, [productColor]);
  const getTitleFormat = (title) => {
    return title.replace(/\s+/g, '-');
  };
  const titleFormat = getTitleFormat(title);
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto bg-white mb-3 border border-[#e5e7eb]  overflow-hidden relative md:max-h-[515px] shadow-md">
      {isNew && (
        <span className="bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded absolute z-10 m-2">
          NEW
        </span>
      )}

      <div className=" ml-4 mt-4 inline-flex gap-1 text-sm  text-white bg-[#dc2626] rounded-md items-center justify-center  py-1 px-1 md:py-2 md:px-5">
        <MdOutlineDiscount className="text-sm md:text-xl font-medium"></MdOutlineDiscount>
        30%OFF
      </div>


      <div className="flex flex-col relative">
        <div className="w-full sm:p-1  transform transition duration-300 hover:scale-105 ">

          <Link to={`/product-details/${id}/${titleFormat}`}>
            <img src={image}
              alt={title}
              className="w-full h-52 md:h-[300px] object-contain "
            />
          </Link>
        </div>
        <div className="flex mb-2 justify-center">
          <div className="flex gap-2 items-center">
            {Product_Colors.map(({ color }) => (
              <div onClick={(e) => { toggleColor(color) }} key={color.color_id} className="text-center cursor-pointer">
                <div
                  style={{ backgroundColor: color.color_code }}
                  className={`h-3 w-3 rounded-full mx-auto ${color.color_name === productColor.color_name ? " border-2 border-yellow-400 scale-150 " : ""}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-0 p-4 pb-14">

          <p className="text-lg font-bold text-black">{title}</p>
          <div className="flex items-center mt-2" style={{ fontSize: "16px" }}>
            <del className="text-sm text-gray-500 mr-2" style={{ color: "#ADACAC" }}>{originalPrice}</del>
            <p className="text-xl text-red-600 font-bold" style={{ color: "#DC2626" }}>{price}</p>
            <p className="text-sm text-red-600 ml-2" style={{ color: "#DC2626" }}>{discountMessage}</p>

          </div>

          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap  mt-2">
              <div
                style={{
                  borderColor: "#4F5574",
                  color: "#002B5B",
                  height: "31px",
                  lineHeight: "31px",
                  fontSize: "12px",
                }}
                className="text-xs border rounded-md px-3 mr-2 mb-2 flex items-center"
              >
                {/* <img
                  src={img1}
                  style={{ width: "17px" }}
                  className="mr-2"
                  alt=""
                /> */}
                <div className="relative mr-1">
                  <LuHexagon className="text-lg" />
                  <span className="text-base scale-50 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                    {find24() ? "10" : "5"}
                  </span>
                </div>
                {find24() ? "10" : "5"} Year Warranty
              </div>

              <div
                style={{
                  borderColor: "#4F5574",
                  color: "#002B5B",
                  height: "31px",
                  lineHeight: "31px",
                  fontSize: "12px",
                }}
                className="text-xs border rounded-md px-3 mr-2 mb-2 flex items-center"
              >
                <IoUmbrellaOutline className="mr-1 text-lg" />
                {/* <img
                  src={img2}
                  style={{ width: "17px" }}
                  className="mr-2"
                  alt=""
                /> */}
                Waterproof
              </div>
              {categoryId != 8 && categoryId != 10 ? (
                <div

                  style={{
                    borderColor: "#4F5574",
                    color: "#002B5B",
                    height: "31px",
                    lineHeight: "31px",
                    fontSize: "12px",
                  }}
                  className="text-xs border rounded-md px-3 mr-2 mb-2 flex items-center"
                >
                  <TbWash className="mr-1 text-lg" />
                  sunbrella washable
                </div>
              ) : null}
            </div>
            {/* <div className="flex mt-3">
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 rounded-full border-2 border-white shadow-sm mr-2`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div> */}
          </div>
        </div>
      </div>

    </div >
  );
};

export default OutdoorDiningChairCard;
