import axios from 'axios';
import { API_BASE_URL } from '../../constants';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const setupInterceptors = (setGlobalLoading: (loading: boolean) => void) => {
    let activeRequests = 0;

    apiClient.interceptors.request.use((config) => {
        activeRequests++;
        setGlobalLoading(true);
        return config;
    });

    apiClient.interceptors.response.use(
        (response) => {
            activeRequests--;
            if (activeRequests === 0) setGlobalLoading(false);
            return response;
        },
        async (error) => { 
            activeRequests--;
            if (activeRequests === 0) setGlobalLoading(false);

            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    });

                    const newAccessToken = res.data.accessToken;

                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest); 

                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
};