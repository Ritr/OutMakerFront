import { useMutation } from '@tanstack/react-query';
import { getApiBaseUrl } from '../../utils/api/index'; // 确保路径正确

export const saveNotes = (orderNumber, notes) => {
    let url = `https://www.theoutmaker.com/api/user/order/save_notes/${orderNumber}`;
    const formData = new URLSearchParams();
    formData.append('notes', notes);
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
};