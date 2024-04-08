import { useMutation } from '@tanstack/react-query';
import { getApiBaseUrl } from '../../utils/api/index'; // 确保路径正确

export const applyDiscount = (code) => {
    let url = getApiBaseUrl() + "/activity/discount/ticket";
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code : code,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
};