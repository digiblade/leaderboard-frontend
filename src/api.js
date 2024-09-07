import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://localhost:8000/api';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Helper to handle GET, POST, PUT, DELETE requests
const api = {
    // Get all users with optional search and sorting
    getUsers: async (search = '', sortBy = 'name', order = 'asc') => {
        const params = {
            search,
            sort_by: sortBy,
            order
        };
        const response = await axiosInstance.get('/users', { params });
        return response.data;
    },

    // Add a new user
    addUser: async (userData) => {
        const response = await axiosInstance.post('/users', userData);
        return response.data;
    },

    // Update user points
    updateUserPoints: async (userId, points_change) => {
        const response = await axiosInstance.put(`/users/${userId}/points`, { points_change });
        return response.data;
    },

    // Delete a user
    deleteUser: async (userId) => {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    },

    // Get user details
    getUserDetails: async (userId) => {
        const response = await axiosInstance.get(`/users/${userId}`);
        return response.data;
    },

    // Group users by score and get average age
    groupByScore: async () => {
        const response = await axiosInstance.get('/users/grouped-by-score');
        return response.data;
    }
};

export default api;
