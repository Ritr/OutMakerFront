// src/Hooks/api/useCreatePaypalOrder.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '../../utils/api/index';

export const useCreatePaypalOrder = () => {
    const baseUrl = getApiBaseUrl(); // 使用动态API基础URL

    return useMutation(async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/paypal/createOrder`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            return result;

        } catch (error) {
            console.error("Error creating PayPal order:", error);
            toast.error(error.message);
            throw error; // 抛出错误，让 useMutation 的 onError 捕获
        }
    });
};
export const useFetchOrderPaypal = () => {
    const baseUrl = getApiBaseUrl(); // 使用动态API基础URL

    return useMutation(async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/shopping/cart/paypal`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;

            if (result.code === 1) {
                // 成功逻辑，如果需要的话
                return result.data; // 返回成功的数据供 onSuccess 回调使用
            } else {
                toast.error(result.msg);
                throw new Error(result.msg); // 抛出错误以触发 onError 回调
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            throw error; // 继续抛出错误以确保 onError 能够捕获
        }
    }, {
        onSuccess: (data) => {
            // 可以处理成功逻辑，例如跳转页面或更新 UI 状态
            console.log('成功响应数据:', data);
        },
        onError: (error) => {
            // 错误处理逻辑已经在 mutation 中完成，这里可以添加额外的错误处理逻辑
            console.error('请求失败:', error);
        }
    });
};