// src/Hooks/api/useOrderApi.js
import { useMutation } from '@tanstack/react-query';
import { getApiBaseUrl } from '../../utils/api/index';

// 1.https://api.theoutmaker.com.au/api/get/product/seat/types/all 
// 2. https://api.theoutmaker.com.au/api/get/product/combination/types/all
// 3. https://api.theoutmaker.com.au/api/get/product/frame/types/all
// // Hook for clearing order
export const useFetchSeat = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async () => {
        const response = await fetch(`${baseUrl}/get/product/seat/types/all`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }, {
        onError: (error) => {
            // Handle error scenario
            console.error("Error in clearing order:", error);
        }
    });
};


export const useFetchCombination = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async () => {
        const response = await fetch(`${baseUrl}/get/product/combination/types/all`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }, {
        onError: (error) => {
            // Handle error scenario
            console.error("Error in clearing order:", error);
        }
    });
};


export const useFetchFrame = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async () => {
        const response = await fetch(`${baseUrl}/get/product/frame/types/all`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }, {
        onError: (error) => {
            // Handle error scenario
            console.error("Error in clearing order:", error);
        }
    });
};
