import React from "react";
import { Slot } from "expo-router";
import { LoadingProvider } from "../context/LoadingContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <LoadingProvider>
        <Slot />
      </LoadingProvider>
    </SafeAreaView>
  );
}
