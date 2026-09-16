import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { submitOtpAndRegisterUser, resendOtp } from "../../services/authApi";
import axios from "axios";

export default function otp() {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const { email, name, password } = useLocalSearchParams<{
    email: string;
    name: string;
    password: string;
  }>();

  const handleSubmitOtpAndRegisterUser = async () => {
    try {
      await submitOtpAndRegisterUser(name, email, password, otp).then(() => {
        router.push("/(root)/(tabs)/home");
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "An error occurred during registration. Please try again.";
      setError(message);
    }
  };

  const handlepushToSignUp = () => {
    router.push({
      pathname: "/(auth)/signup",
      params: { email, name, password },
    });
  };


  

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex-1 mt-28 mx-4">
        <View className="flex">
          <Text className="text-5xl font-bold text-slate-50">DayShed</Text>
          <Text className="text-4xl font-bold text-slate-50 mt-3">Start Your Journey</Text>
        </View>
        <View className="mt-5 py-7">
          {error ? <Text className="text-red-500 mt-3">{error}</Text> : null}
          <Text className="text-slate-200 text-xl mt-3">
            Enter the OTP sent to your email
          </Text>
          <TextInput
            className="bg-[#434D56] border-2 border-[#434D56] rounded-xl text-slate-100 p-2 mt-1 text-xl h-14"
            placeholder="Enter OTP"
            placeholderTextColor="C1C1C1"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          <View className="flex-row justify-between mb-5">
            <Pressable
              className="text-blue-500 font-semibold"
              onPress={() => resendOtp(email)}
            >
              <Text className="text-blue-500 font-semibold">Resend OTP</Text>
            </Pressable>
            <Pressable className="text-gray-700" onPress={handlepushToSignUp}>
              <Text className="text-blue-500 font-semibold">Change Email</Text>
            </Pressable>
          </View>
          <TouchableOpacity
            className="bg-blue-500 p-2 mt-8 rounded-full"
            onPress={handleSubmitOtpAndRegisterUser}
          >
            <Text className="text-white text-center text-xl font-normal">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
