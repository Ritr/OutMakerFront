// src/hooks/api/useOrderOperations.js
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api/index';
import toast from 'react-hot-toast';

export const useFetchOrderDetailsPaypal = (number) => {
    return useQuery(['orderDetailsPaypal', number], async () => {
        const url = `${getApiBaseUrl()}/paypal/order/${number}/details`;
        try {
            const { data } = await axios.get(url);
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }, {
        enabled: !!number, // only run query if number is truthy
    });
};

export const useFetchOrderDetailsLianlian = (number) => {
    return useQuery(['orderDetailsLianlian', number], async () => {
        const url = `${getApiBaseUrl()}/lianlian/pay_query/${number}`;
        try {
            const { data } = await axios.get(url);
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }, {
        enabled: !!number, // only run query if number is truthy
    });
};

export const useFetchSingleOrder = (number) => {
    return useQuery(['singleOrder', number], async () => {
        const url = `${getApiBaseUrl()}/user/single/order/${number}`;
        try {
            const { data } = await axios.get(url);
            if (!data.ok) {
                throw new Error("Network response was not ok");
            }
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
            throw new Error(error.message);
        }
    }, {
        enabled: !!number, // only run query if number is truthy
    });
};

export const useCancelOrder = () => {
    return useMutation(async (order_no) => {
        const url = `${getApiBaseUrl()}/user/order/payment/cancell/${order_no}`;
        try {
            const { data } = await axios.get(url);
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            toast.success(data.message || 'Order cancelled successfully');
            return data;
        } catch (error) {
            console.error("Cancellation error:", error);
            throw new Error(error.response?.data?.message || "Failed to cancel order");
        }
    });
};
