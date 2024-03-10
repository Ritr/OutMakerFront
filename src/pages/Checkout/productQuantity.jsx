import React from "react";
import useProductDetail from "../../Hooks/useProductDetail";
const ProductQuantity = ({ product }) => {
  const { productDetail } = useProductDetail(product.p_id);
  console.log("productDetail", productDetail);
  console.log(product);
  return productDetail.quantity > 0 ? (
    <span className="text-[#002B5B] text-[10px] font-semibold px-3 py-1 rounded-full border border-[#002B5B]">
      Ship within 72 hours
    </span>
  ) : null;
};
export default ProductQuantity;
