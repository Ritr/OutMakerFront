// src/Hooks/api/useOceanpayment.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '../../utils/api/index';
export const useCreateOceanpayment = () => {
    const baseUrl = getApiBaseUrl(); // 使用动态API基础URL
    return useMutation(async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/pay/orders/create`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            return result;

        } catch (error) {
            console.error("Error oceanpayment order:", error);
            toast.error(error.message);
            throw error; // 抛出错误，让 useMutation 的 onError 捕获
        }
    });
};
export const useOrderStatus = (data) => {
    const baseUrl = getApiBaseUrl(); // 使用动态API基础URL
    return useMutation(async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/pay/orders/status`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            return result;

        } catch (error) {
            console.error("Error oceanpayment order:", error);
            toast.error(error.message);
            throw error; // 抛出错误，让 useMutation 的 onError 捕获
        }
    });
};

export const useOrderDetail = (data) => {
    const baseUrl = getApiBaseUrl(); // 使用动态API基础URL
    return useMutation(async (data) => {
        try {
            const response = await axios.post(`${baseUrl}/pay/orders/detail`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = response.data;
            return result;

        } catch (error) {
            console.error("Error oceanpayment order:", error);
            toast.error(error.message);
            throw error; // 抛出错误，让 useMutation 的 onError 捕获
        }
    });
};