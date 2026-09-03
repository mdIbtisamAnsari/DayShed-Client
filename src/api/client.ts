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
        (error) => {
            activeRequests--;
            if (activeRequests === 0) setGlobalLoading(false);
            return Promise.reject(error);
        }
    );
};