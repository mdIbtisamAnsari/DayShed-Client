import { apiClient } from "../api/client";
import { API_BASE_URL } from "../../constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";

export const getUser = async (accessToken: string) => {
  try {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/v1/auth/getuser`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Login Response:", response?.data);
    const accessToken = response.data.accessToken;
    console.log("Access Token:", accessToken);
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
    return;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const submitOtpAndRegisterUser = async (
  name: string,
  email: string,
  password: string,
  otp: string,
) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/register`,
      {
        name,
        email,
        password,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const accessToken = response.data.accessToken;
    console.log("Access Token:", accessToken);
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", response.data.refreshToken);

    return;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getOtp = async (email: string) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/otp`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error getting OTP:", error);
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/otp`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

export const submitNewPasswordWithOtp = async (
  otp: string,
  email: string,
  newPassword: string,
) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/savenewpassword`,
      {
        email,
        newPassword,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const accessToken = response.data.accessToken;
    await SecureStore.setItemAsync('accessToken', accessToken);
    return response.data;
  }
  catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

export const handleGoogleSignIn = async () => {
    console.log("0")
  try {
    try {
      await GoogleSignin.signOut();
    } catch (e) {
      // Ignore if not previously signed in
    }

    
    
    await GoogleSignin.hasPlayServices();
    console.log("1")
    const signInResult = await GoogleSignin.signIn();
    console.log("2")
    console.log("signInResult", signInResult)
    
    const idToken = 
      signInResult.data?.idToken || 
      (signInResult as any).idToken || 
      (signInResult as any).user?.idToken;

    if (!idToken) {
      throw new Error("Failed to retrieve Google ID Token from sign-in result.");
    }

    const response: any = await fetch(`${API_BASE_URL}/api/v1/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const result = await response.json();

    if (result.success && result.data) {
      const { accessToken, refreshToken, user } = result.data;
      
      await SecureStore.setItemAsync("accessToken", accessToken);
      if (refreshToken) {
        await SecureStore.setItemAsync("refreshToken", refreshToken);
      }

      console.log("Google Sign-In Success:", user);
      return result.data;
    } else {
      throw new Error(result.message || "Google authentication failed");
    }
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};


export const checkRegistration = async (email: string) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/v1/auth/checkemail`,
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error checking registration:", error);
    throw error;
  }
};
