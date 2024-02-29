// src/Hooks/api/useLianlianPayment.js
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api/index'; // Make sure to create this utility

export const useGetLianlianToken = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async () => {
        const response = await axios.get(`${baseUrl}/lianlian/get/token`);
        if (response.data.return_code === "SUCCESS") {
            return response.data.order; // Assuming 'order' is the token needed
        } else {
            throw new Error(response.data.message || "Failed to get LianLian token");
        }
    });
};

export const useLianlianPay = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async (param) => {
        const response = await axios.post(`${baseUrl}/lianlian/pay`, param, {
            withCredentials: true
        });
        if (response.data.code === 1 && response.data.pay_response.return_code === "SUCCESS") {
            return response.data; // Return the response data for the calling component to handle
        } else {
            throw new Error(response.data.pay_response.return_message || "Payment failed");
        }
    });
};

export const useFetchLianlianPayQuery = (id) => {
    const baseUrl = getApiBaseUrl();

    return useQuery(['lianlianPayQuery', id], async () => {
        const { data } = await axios.get(`${baseUrl}/lianlian/pay_query/${id}`);
        return data;
    }, {
        enabled: !!id, // Only run query if id is available
        onError: (error) => {
            console.error('Error fetching Lianlian pay query:', error);
        }
    });
};