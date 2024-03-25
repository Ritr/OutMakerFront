import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import { BsArrowRight } from "react-icons/bs";
const OutdoorDiningChairCard = ({
  id, purl,
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
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto bg-white mb-3 border border-gray-300 rounded-lg overflow-hidden relative">
      {isNew && (
        <span className="bg-green-200 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded absolute z-10 m-2">
          NEW
        </span>
      )}
      <Link to={`/product-details/${id}/${purl}`}>
        <div className="w-full sm:p-1 ">
          <img src={imageUrl} alt={title} className="w-full " />
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

        <div className="p-4">
          <p className="text-lg font-bold">{title}</p>
          <div className="flex items-center mt-2">
            <del className="text-sm text-gray-500 mr-2">{originalPrice}</del>
            <p className="text-xl text-red-600">{price}</p>
            <p className="text-sm text-red-600 ml-2">{discountMessage}</p>
          </div>

          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap  mt-2">
              {warrantyOptions.map((warranty, index) => (
                <div
                  key={index}
                  className="text-xs border border-gray-500 rounded-full px-3 py-1 mr-2"
                >
                  {warranty}
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
      </Link>
    </div>
  );
};

export default OutdoorDiningChairCard;
