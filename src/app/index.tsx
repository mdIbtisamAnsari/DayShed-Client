import React from "react";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Index() {
  GoogleSignin.configure({
    webClientId:
      "70557043877-c39hshh6qu24p08bj0d9ptrgkau13t8s.apps.googleusercontent.com",
  });

  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/signin" />;
}
