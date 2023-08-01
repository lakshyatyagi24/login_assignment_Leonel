import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers you need
    },
});

export default instance;