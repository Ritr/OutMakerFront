// src/Hooks/api/useOrderApi.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiBaseUrl } from '../../utils/api/index';

// Hook for fetching order
export const useFetchOrder = () => {
    const queryClient = useQueryClient();
    const baseUrl = getApiBaseUrl();

    return useMutation(async ({ userId, data, order_no }) => {
        const response = await fetch(`${baseUrl}/user/order/draft/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }, {
        onSuccess: () => {

            queryClient.invalidateQueries(['order']);
        },
        onError: (error) => {
            // Handle error scenario
            console.error("Error in fetching order:", error);
        }
    });
};

// Hook for clearing order
export const useFetchClear = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async ({ userId, order_no }) => {
        const response = await fetch(`${baseUrl}/user/order/payment/clear/${userId}/${order_no}`, {
            method: "POST",
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
