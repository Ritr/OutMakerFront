// src/Hooks/api/useManageProductQuantity.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiBaseUrl } from '../../utils/api/index';

export const useManageProductQuantity = (userCode) => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async ({ productId, action }) => {
        try {
            const urlPath = action === 'increase'
                ? `/user/product/add_to/cart/${userCode}/${productId}`
                : `/user/product/delete_from/cart/${userCode}/${productId}`;

            const response = await axios.post(`${baseUrl}${urlPath}`, {}, {
                headers: { "Content-Type": "application/json" },
            });

            return response.data; // Success path returns the data
        } catch (error) {
            // Log and re-throw the error for the onError callback to handle
            console.error('Error during the operation:', error);
            throw error;
        }
    }, {
        onSuccess: (data) => {
            // Handle success without directly referring to actionMessage variable
            // toast.success(`Product quantity successfully updated.`);
        },
        onError: (error) => {
            // Error handling is here; display a toast message for feedback
            toast.error(error.response?.data?.msg || "Operation failed");
        }
    });
};
