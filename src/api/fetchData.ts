import axios from 'axios';

const API_DELAY = 1000; // Имитация задержки ответа сервера

export const fetchData = async () => {
    try {
        const response = await axios.get('/api/advisors');
        const { data } = response;
        await new Promise((resolve) => setTimeout(resolve, API_DELAY));
        return data;
    } catch (error) {
        console.error('Error fetching advisors:', error);
        return [];
    }
};
