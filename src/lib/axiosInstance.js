import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL, // Ensure this starts with http/https
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000, // Optional: 60s timeout
});

export default axiosInstance;