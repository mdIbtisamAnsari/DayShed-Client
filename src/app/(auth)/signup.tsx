import axios from "axios";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { getOtp } from "../../services/authApi";

export default function signup() {
  const router = useRouter();

  const emailParam = useLocalSearchParams().email;
  const [email, setEmail] = useState(
    typeof emailParam === "string" ? emailParam : emailParam?.[0] || "",
  );

  const passwordParam = useLocalSearchParams().password;
  const [password, setPassword] = useState(
    typeof passwordParam === "string"
      ? passwordParam
      : passwordParam?.[0] || "",
  );

  const nameParam = useLocalSearchParams().name;
  const [name, setName] = useState(
    typeof nameParam === "string" ? nameParam : nameParam?.[0] || "",
  );

  const [confirmPassword, setConfirmPassword] = useState(
    typeof passwordParam === "string"
      ? passwordParam
      : passwordParam?.[0] || "",
  );
  const [error, setError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOtp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    try {
      await getOtp(email).then(() => {
        router.push({
          pathname: "/(auth)/otp",
          params: { email, name, password },
        });
      });
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "An error occurred while sending OTP. Please try again.";
      setError(message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 mt-10 mx-4">
          <View className="flex">
            <View className="flex">
              <Text className="text-5xl font-bold text-slate-50">DayShed</Text>
              <Text className="text-4xl font-bold text-slate-50 mt-3">
                Start Your Journey
              </Text>
            </View>
          </View>
          <Text className="text-slate-200 mt-5">
            Register Your Account here
          </Text>

          <View className="mt-4 py-7">
            {error ? <Text className="text-red-500">{error}</Text> : null}
            <Text className="text-gray-700 font-semibold">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter Your Full Name"
              value={name}
              onChangeText={setName}
            />
            <Text className="text-gray-700 mt-5 font-semibold">
              Email
              <Text className="text-gray-500 font-thin">
                {" "}
                A verification OTP will be sent to this email
              </Text>
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter Your Email"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View className="flex-row justify-between mt-5">
              <Text className="text-gray-700 font-semibold">Password</Text>
              <Pressable
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text className="text-blue-500 font-semibold">
                  {isPasswordVisible ? "Hide Password" : "Show Password"}
                </Text>
              </Pressable>
            </View>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Enter Your Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <Text className="text-gray-700 mt-5 font-semibold">
              Confirm Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Confirm Your Password"
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <Pressable
              className="bg-blue-500 rounded-md p-2 mt-7"
              onPress={handleOtp}
            >
              <Text className="text-white text-center font-semibold">
                Sign Up
              </Text>
            </Pressable>
          </View>
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-700">Already have an account? </Text>
            <Link href="/(auth)/signin">
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
