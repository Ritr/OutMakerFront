// src/Hooks/api/useAddToCart.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '../../utils/api/index'; // Adjust the path as necessary

export const useAddToCart = (userCode) => {
    const queryClient = useQueryClient();
    const baseUrl = getApiBaseUrl(); // Dynamic API base URL

    return useMutation({
        mutationFn: async ({ productId, quantity }) => {
            const response = await fetch(`${baseUrl}/user/product/add_to/cart/${userCode}/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {quantity:quantity},
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
    // return useMutation(
    //     ({ productId, quantity }) => axios.post(
    //         `${baseUrl}/user/product/add_to/cart/${userCode}/${productId}`,
    //         { quantity },
    //         { headers: { "Content-Type": "application/json" } }
    //     ),
    //     {
    //         onSuccess: () => {

    //             //queryClient.invalidateQueries(['cartData']);
    //             // Handle modal logic if necessary
    //         },
    //         onError: (err) => {
    //             alert(JSON.stringify(err))
    //             toast.error();
    //         }
    //     }
    // );
};
