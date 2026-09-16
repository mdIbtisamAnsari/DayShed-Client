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
import { OtpInput } from "react-native-otp-entry";
import { StyleSheet } from "react-native";

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
        router.replace("/(root)/(tabs)/home");
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
          <Text className="text-5xl font-bold text-slate-50">DayShed -</Text>
          <Text className="text-4xl font-bold text-slate-50 mt-3">Start Your Journey</Text>
        </View>
        <View className="mt-5 py-7">
          {error ? <Text className="text-red-500 mt-3">{error}</Text> : null}
          <Text className="text-slate-200 text-xl my-3">
            Enter the OTP sent to your email
          </Text>
          <OtpInput
            numberOfDigits={6}
            focusColor="blue"
            autoFocus={true}
            hideStick={true}
            placeholder=""
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => (setOtp(text), handleSubmitOtpAndRegisterUser())}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
            textProps={{
              accessibilityRole: "text",
              accessibilityLabel: "OTP digit",
              allowFontScaling: false,
            }}
            theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                placeholderTextStyle: styles.placeholderText,
                filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
              }}
            
          />

          <View className="flex-row justify-between my-5">
            
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
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBlockColor: "#fff",
  },
  pinCodeContainer: {
    
  },
  pinCodeText: {
    color: "#fff",
  },
  focusStick: {
    
  },
  activePinCodeContainer: {
    borderBlockColor: "#fff",
  },
  placeholderText: {
    
  },
  filledPinCodeContainer: {
    
  },
  disabledPinCodeContainer: {
    
  },
});