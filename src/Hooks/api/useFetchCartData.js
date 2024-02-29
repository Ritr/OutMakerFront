// src/Hooks/api/useFetchCartData.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api/index'; // Adjust the path as necessary

// 将 fetchCartData 函数导出，以便外部可以直接调用
export const fetchCartData = async (userId) => {
    const baseUrl = getApiBaseUrl();
    const { data } = await axios.get(`${baseUrl}/user/product/all/cart/${userId}`);
    return data;
};

export const useFetchCartData = (userId) => {
    return useQuery(['cartData', userId], () => fetchCartData(userId), {
        onError: (error) => {
            console.error("Error fetching cart data:", error);
        },
        select: (data) => {
            if (!data || data.length === 0) {
                return null;
            }
            return Object.values(data);
        }
    });
};
