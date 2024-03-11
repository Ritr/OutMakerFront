import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api/index'; // 确保路径正确

export const useFetchOrders = (searchType, searchParam) => {
    const fetchOrders = async ({ queryKey }) => {
        const [_key, { searchType, searchParam }] = queryKey;
        let url = getApiBaseUrl(); // 使用 getApiBaseUrl 获取 API 基础 URL

        if (searchType === 'email') {
            url += `/user/all/order/${searchParam}`;
        } else {
            url += `/user/all/order_code/${searchParam}`;
        }

        const { data } = await axios.get(url);
        return data;
    };

    return useQuery(['orders', { searchType, searchParam }], fetchOrders, {
        enabled: !!searchParam, // 只有当 searchParam 非空时才执行查询
        onError: (error) => console.error("Error fetching orders:", error),
        cacheTime: 60000, // 设置缓存时间为 60 秒
        staleTime: 30000, // 设置数据过期时间为 30 秒
    });
};
