import { apiClient } from '../api/client';import { API_BASE_URL } from "../../constants";
import otp from '@/app/(auth)/otp';



export const getUser = async (accessToken: string) => {
    try {
        const response = await apiClient.get(`${API_BASE_URL}/api/v1/user/getuser`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/api/v1/user/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Login Response:", response?.data);
        const accessToken = response.data.accessToken;
        console.log("Access Token:", accessToken);
        // await SecureStore.setItemAsync('accessToken', accessToken);
        return
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const submitOtpAndRegisterUser = async (name: string, email: string, password: string, otp: string) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/api/v1/user/register`, {
            name,
            email,
            password,
            otp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const accessToken = response.data.accessToken;
        console.log("Access Token:", accessToken);
        // await SecureStore.setItemAsync('accessToken', accessToken);
        return


    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}


export const getOtp = async (email: string) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/api/v1/user/otp`, {
            email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error getting OTP:", error);
        throw error;
    }
}


export const resendOtp = async (email: string) => {
    try {
        const response = await apiClient.post(`${API_BASE_URL}/api/v1/user/otp`, {
            email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error resending OTP:", error);
        throw error;
    }
}

export const submitNewPasswordWithOtp = async(otp:string, email:string, newPassword:string)=>{
    try {
        const response = await apiClient.post(`${API_BASE_URL}/api/v1/user/savenewpassword`, {
            email, newPassword, otp
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        });

        const accessToken = response.data.accessToken;
        console.log("Access Token:", accessToken);
        // await SecureStore.setItemAsync('accessToken', accessToken);
        return response.data;

    } catch (error) {
        console.error("Error resending OTP:", error);
        throw error;
    }
}
