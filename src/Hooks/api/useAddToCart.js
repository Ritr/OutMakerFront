// src/Hooks/api/useAddToCart.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '../../utils/api/index'; // Adjust the path as necessary

export const useAddToCart = (userCode) => {
    const queryClient = useQueryClient();
    const baseUrl = getApiBaseUrl(); // Dynamic API base URL


    return useMutation(
        ({ productId, quantity }) => axios.post(
            `${baseUrl}/user/product/add_to/cart/${userCode}/${productId}`,
            { quantity },
            { headers: { "Content-Type": "application/json" } }
        ),
        {
            onSuccess: () => {

                queryClient.invalidateQueries(['cartData']);
                // Handle modal logic if necessary
            },
            onError: () => {
                toast.error("Failed to add item to cart.");
            }
        }
    );
};
