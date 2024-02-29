// src/utils/api.js
export const getApiBaseUrl = () => {
    // Read the environment variable and return the API base URL
    return import.meta.env.VITE_API_BASE_URL;
};
