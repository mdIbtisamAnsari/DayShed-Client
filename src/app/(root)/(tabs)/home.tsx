import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ArcProgress from "@/helper/arkProvider";
import { useRouter } from "expo-router";
import VoiceInputScreen from "@/helper/voiceInputProvider";

export default function Home() {
  const router = useRouter();

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [aiCredits, setAiCredits] = useState(0);
  const [todaysFocus, setTodaysFocus] = useState("Add Tasks To Get Started!");

  setTimeout(() => setAiCredits(0), 1000);

  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <View className="flex-row items-center mt-5">
        <View className="flex-1 py-4 px-4">
          <Text className="text-white text-3xl font-bold">DayShed</Text>
          <Text className="text-white text-lg font-normal">
            {formattedDate}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/(root)/(subscription)/subscribe");
          }}
          className="
          my-4
          mx-5
          w-12
          h-12
          bg-slate-800
          rounded-full
          relative
          items-center
          justify-center
          rotate-90"
        >
          <ArcProgress
            className="absolute bg-slate-800 rounded-full"
            size={38}
            strokeWidth={4}
            progress={1}
            arcSweepAngle={270} // 270° arc (gauge style)
            rotation={45} // starts at 135° (bottom-left)
            colors={["orange", "yellow", "cyan"]}
            backgroundColor="gray"
          >
            {aiCredits ? (
              <Text className="text-white -rotate-90">AI</Text>
            ) : (
              <Text className="text-white -rotate-90">AI</Text>
            )}
          </ArcProgress>
        </TouchableOpacity>
      </View>
      <View className="flex-row mx-4">
0        <Text className="text-gray-300 font-light">Today's Focus: </Text>
        <Text className="text-white font-bold">{todaysFocus}</Text>
      </View>

      <View className="m-4 bg-[#1b264f]  border-[#5c24e6] border-2 rounded-xl px-2 shadow-2xl shadow-violet-500">
        <VoiceInputScreen />
      </View>
    </SafeAreaView>
  );
}
