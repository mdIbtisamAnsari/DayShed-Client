import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { LoadingProvider } from "../context/LoadingContext";
import { View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar' // or expo-navigation-bar;
import { Platform } from 'react-native';

export default function RootLayout() {

  
  return (
    <View className="flex-1 bg-slate-800">
      <StatusBar hidden={true} />
      <LoadingProvider>
        <Slot />
      </LoadingProvider>
    </View>
  );
}
