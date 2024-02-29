import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { BsArrowRight } from "react-icons/bs";
import img1 from "../../assets/images/10.png";
import img2 from "../../assets/images/waterproof.png";
import img3 from "../../assets/images/washable.png";

const OutdoorDiningChairCard = ({
  id,purl,
  imageUrl,
  title,
  price,
  review,
  originalPrice,
  discountMessage,
  warrantyOptions,
  colorOptions,
  isNew, // assuming this is a new prop to indicate if the item is new                <Link to={`/product-details/${p_id}`}></Link>
}) => {
  const imgs = {
    "10":img1,
    "waterproof":img2,
    "sunbrella":img3,
  };
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto bg-white mb-3 border border-gray-300 rounded-lg overflow-hidden relative">
      {isNew && (
        <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded absolute z-10 m-2">
          NEW
        </span>
      )}
      <Link to={`/product-details/${id}/${title}`}>
        <div className="flex flex-col relative">
          <div className="w-full sm:p-1  transform transition duration-300 hover:scale-105">
            <img
              src={imageUrl}
              alt={title}
              className="w-full md:h-[375px] object-contain "
            />

            <div className="opacity-1 md:opacity-0 hover:opacity-[1] duration-300 ">
              <div className="absolute inset-1 z-10 flex justify-end items-center top-1/4 right-7 text-xs text-black font-normal p-1">
                <p className="border-b-2 border-black flex font-bold">
                  Shop <BsArrowRight />
                </p>
              </div>
            </div>
          </div>

          {/* <div className=" absolute top-2 left-2 ">
          <Rating style={{ maxWidth: 100 }} value={review} readOnly />
        </div> */}

          <div className="  bottom-0 p-4">
            <p className="text-lg font-bold text-black">{title}</p>
            <div className="flex items-center mt-2" style={{fontSize:"16px"}}>
              <del className="text-sm text-gray-500 mr-2" style={{color:"#ADACAC"}}>{originalPrice}</del>
              <p className="text-xl text-red-600 font-bold" style={{color:"#DC2626"}}>{price}</p>
              <p className="text-sm text-red-600 ml-2" style={{color:"#DC2626"}}>{discountMessage}</p>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="flex flex-wrap  mt-2">
                {warrantyOptions.map((warranty, index) => (
                  <div
                    key={index}
                    style={{borderColor:"#4F5574",color:"#002B5B",height:"31px",lineHeight:"31px",fontSize:"12px"}}
                    className="text-xs border rounded-md px-3 mr-2 mb-2 flex items-center"
                  >
                    <img src={imgs[warranty.key]} style={{width:"17px"}} className="mr-2" alt="" />
                    {warranty.text}
                  </div>
                ))}
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
      </Link>
    </div>
  );
};

export default OutdoorDiningChairCard;
