import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import ImgBaseUrl from "../../components/ImgBaseUrl/ImgBaseUrl";
import { GoPlusCircle } from "react-icons/go";
import SwiperWrapper from "../../components/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
const ProductCard = ({ product, onAdd }) => {
    const [productDetail, setProductDetail] = useState(null);
    const mutation = useMutation({
        mutationFn: async (id) => {
            const response = await fetch("https://api.theoutmaker.com.au/api/get/product/single/" + id);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    }
    );
    useEffect(() => {
        if (mutation.data) {
            setProductDetail(mutation.data);
        }
    }, [mutation.data])

    useEffect(() => {
        if (product.p_id) {
            mutation.mutate(product.p_id)
        }
    }, [
        product.p_id
    ]);
    return (
        <div>
            {productDetail ?
                <div className="bordered border round-sm p-4 ">
                    <div className="flex gap-4">
                        <div>
                            <img src={ImgBaseUrl(productDetail.Product.p_pic)} alt="" className="w-20 h-16 object-cover" />
                        </div>
                        <div>
                            <div className="font-medium">
                                {productDetail.Product.p_name}
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <GoPlusCircle onClick={() => {
                            onAdd(productDetail.Product.p_id, productDetail.Product, productDetail.Product_Cost)
                        }} className="text-primary text-2xl font-semibold cursor-pointer"></GoPlusCircle>
                        <span className="text-[#DC2626] font-medium">A${productDetail.Product_Cost.product_sale_price}</span>
                        <del className="text-[#ADACAC]">A${productDetail.Product_Cost.product_regular_price}</del>
                    </div>
                </div> : null
            }
        </div>

    )
}
const Recommend = ({ Product_Recommends, onAdd }) => {
    return (
        Product_Recommends.length > 0 ?
            <div className="mb-4 px-4 md:px-0">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="flex-1 border-b bordered"></div>
                    <span>We also Recommend</span>
                    <div className="flex-1 border-b bordered"></div>
                </div>
                <SwiperWrapper swiperProps={{
                    loop: false,
                    breakpoints: {
                        375: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,

                        },
                    },
                }}>
                    {
                        Product_Recommends.map(item => {
                            return (
                                <SwiperSlide key={item.p_id} >
                                    <ProductCard product={item} onAdd={onAdd}></ProductCard>
                                </SwiperSlide>
                            )
                        }
                        )
                    }
                </SwiperWrapper>
            </div> : null
    )
};
export default Recommend;