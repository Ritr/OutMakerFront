import { useMutation } from '@tanstack/react-query';

export const sendDiscountEmail = (email) => {
    let url = "https://api.theoutmaker.com/api/activity/discount/send";
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email : email,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });
};