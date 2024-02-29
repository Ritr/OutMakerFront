// src/Hooks/useSetUserCode.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getApiBaseUrl } from '../../utils/api/index';

export const useSetUserCode = () => {
    const baseUrl = getApiBaseUrl();

    return useMutation(async () => {
        const response = await axios.post(`${baseUrl}/user/set/code`, {}, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data; // Assuming the API returns the user code as response data
    });
};
