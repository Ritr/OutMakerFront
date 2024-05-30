import { useQuery } from '@tanstack/react-query';

const useProductDetail = (id) => {
    const { data } = useQuery([id], () =>
        fetch(`https://api.theoutmaker.com/api/get/product/single/${id}`).then(
            (res) => res.json(),
        ),
        {
            cacheTime: 60000, // 设置缓存时间为 60 秒
            staleTime: 30000, // 设置数据过期时间为 30 秒
        }
    );
    return { productDetail: data ? data.Product : {} };
};

export default useProductDetail;
