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
  TouchableOpacity,
  View,
} from "react-native";
import { getOtp, handleGoogleSignIn } from "../../services/authApi";
import { AntDesign } from "@expo/vector-icons";

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
        router.replace({
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
        <View className="flex-1 mt-5 mx-4">
          <View className="flex">
            <View className="flex">
              <Text className="text-5xl font-bold text-slate-50">
                DayShed -
              </Text>
              <Text className="text-4xl font-bold text-slate-50 mt-2">
                Start Your Journey
              </Text>
            </View>
          </View>
          <Text className="text-slate-200 mt-2">
            Register Your Account here
          </Text>

          <View className="mt-4">
            {error ? <Text className="text-red-500">{error}</Text> : null}
            <Text className="text-gray-100 text-xl">Full Name</Text>
            <TextInput
              className="
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              mb-3
              text-white
              "
              placeholder="Enter Your Full Name"
              placeholderTextColor="#C1C1C1"
              value={name}
              onChangeText={setName}
            />
            <Text className="text-gray-100 text-xl">
              Email
              <Text className="text-gray-500 font-normal text-xs">
                ..A verification OTP will be sent to this email
              </Text>
            </Text>
            <TextInput
              className="
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              mb-3
              text-white
              "
              placeholder="Enter Your Email"
              placeholderTextColor="#C1C1C1"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View className="flex-row justify-between mt-1">
              <Text className="text-gray-100 text-xl">Password</Text>
              <Pressable
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text className="text-blue-500 font-semibold">
                  {isPasswordVisible ? "Hide Password" : "Show Password"}
                </Text>
              </Pressable>
            </View>
            <TextInput
              className="
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              mb-3
              text-white
              "
              placeholder="Enter Your Password"
              placeholderTextColor="#C1C1C1"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <Text className="text-gray-100 text-xl mt-1">Confirm Password</Text>
            <TextInput
              className="
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              mb-3
              text-white
              "
              placeholder="Confirm Your Password"
              placeholderTextColor="#C1C1C1"
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
            />
            <Pressable
              className="bg-blue-500 rounded-full py-2 mt-3"
              onPress={handleOtp}
            >
              <Text className="text-gray-100 text-2xl text-center font-semibold">
                Sign Up
              </Text>
            </Pressable>
          </View>
          <View className="flex-row items-center my-1 w-full px-4">
            <View className="flex-1 h-[1px] bg-slate-500/40" />
            <Text className="mx-4 text-slate-400 text-md font-medium">or</Text>
            <View className="flex-1 h-[1px] bg-slate-500/40" />
          </View>
          <TouchableOpacity className="bg-[#434D56] py-3 px-3 rounded-full flex-row items-center mt-2" onPress={handleGoogleSignIn}>
            <AntDesign name="google" size={20} color="#E5E7EB" />
            <Text className="text-gray-100 flex-1 text-center -translate-x-4 text-lg">Continue with Google</Text>
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-end justify-center mb-5">
            <Text className="text-gray-200">Already have an account? </Text>
            <Link href="/(auth)/signin">
              <Text className="text-blue-500">Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
