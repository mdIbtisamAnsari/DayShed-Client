import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import axios from "axios";
import { loginUser, handleGoogleSignIn } from "../../services/authApi";
import { useRouter } from "expo-router";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AntDesign } from "@expo/vector-icons";



export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setError("Email and Password are required");
        return;
      }
      await loginUser(email, password).then(() => {
        router.push("/(root)/(tabs)/home");
      });
    } catch (err) {
      console.error("Sign-in error:", err);

      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "An error occurred during sign-in. Please try again.";

      setError(message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.WEB_CLIENT_ID,
    });
  }, []);

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex-1 mx-4 mt-10">
        <Text className="text-gray-50 text-5xl font-bold">DayShed -</Text>
        <Text className="text-gray-100 text-5xl font-bold mt-2">
          Welcome Back
        </Text>

        <View className="my-5">
          {error ? <Text className="text-red-500">{error}</Text> : null}
          <Text className="text-gray-100 text-xl">Email Address</Text>
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

          <View className="flex-row items-end justify-between">
            <Text className="text-gray-100 text-xl">Password</Text>
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Text className="text-blue-500 font-medium">
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
            text-white
            "
            placeholder="Enter Your Password"
            placeholderTextColor="#C1C1C1"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          <Pressable
            className="self-end"
            onPress={() => router.push("/(auth)/forgotPassword")}
          >
            <Text className="text-blue-500 font-medium mb-10">
              Forgot Password?
            </Text>
          </Pressable>
          <Pressable
            className="bg-blue-500 rounded-full py-2"
            onPress={handleSignIn}
          >
            <Text className="text-gray-100 text-2xl text-center font-semibold">
              Sign In
            </Text>
          </Pressable>
        </View>

        <View className="flex-row items-center my-1 w-full px-4">
          <View className="flex-1 h-[1px] bg-slate-500/40" />
          <Text className="mx-4 text-slate-400 text-md font-medium">or</Text>
          <View className="flex-1 h-[1px] bg-slate-500/40" />
        </View>

        <TouchableOpacity
          className="bg-[#434D56] py-3 px-3 rounded-full flex-row items-center mt-5"
          onPress={handleGoogleSignIn}
        >
          <AntDesign name="google" size={20} color="#E5E7EB" />
          <Text className="text-gray-100 flex-1 text-center -translate-x-4 text-lg">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className="flex-1 flex-row items-end justify-center mb-5">
          <Text className="text-gray-200">Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text className="text-blue-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
