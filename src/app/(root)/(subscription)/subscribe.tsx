import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Canvas,
  LinearGradient,
  vec,
  RoundedRect,
} from "@shopify/react-native-skia";
import RazorpayCheckout from "react-native-razorpay";

export default function Subscribe() {
  const [monthlyAmount] = useState<number>(299);
  const [annualAmount] = useState<number>(1999);
  const [monthlyOffer] = useState<string>("");
  const [annualOffer] = useState<string>("");

  const [xPositionOfGradient, setXPositionOfGradient] = useState<5 | 167>(5);
  const [selectedPlan, setSelectedPlan] = useState<"Monthly" | "Annual">("Monthly");

  const setToMonthly = () => {
    setSelectedPlan("Monthly");
    setXPositionOfGradient(5);
  };

  const setToAnnual = () => {
    setSelectedPlan("Annual");
    setXPositionOfGradient(167);
  };

  const handleCancel = () => {
    router.back();
  };

  const user = {
    isSubscribed: false,
    aiCredits: 10,
  };

  const handleSubscriptionPayment = async () => {
    const amountInPaise = selectedPlan === "Monthly" ? monthlyAmount * 100 : annualAmount * 100;

    try {
     
      // const orderResponse = await fetch('https://your-backend.com/create-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plan: selectedPlan, amount: amountInPaise })
      // });
      // const orderData = await orderResponse.json();

      const options = {
        description: `DayShed Pro ${selectedPlan} Subscription`,
        image: 'https://your-logo-url.com/logo.png', // Optional: Your app logo URL
        currency: 'INR',
        key: process.env.RAZORPAY_KEY, // Replace with your Razorpay Test/Live Key ID
        amount: amountInPaise, 
        order_id: "orderData.id", // Uncomment this once you generate orders from your backend server
        name: 'DayShed',
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
          name: 'DayShed User',
        },
        theme: { color: '#06b6d4' }, // Cyan color matching your UI
      };

      RazorpayCheckout.open(options)
        .then((data: { razorpay_payment_id: string }) => {
          Alert.alert("Success", `Payment Success!\nPayment ID: ${data.razorpay_payment_id}`);
        })
        .catch((error: { code: number; description: string }) => {
          Alert.alert(`Error`, `Code: ${error.code}\nDescription: ${error.description}`);
        });

    } catch (error) {
      Alert.alert("Error", "Something went wrong while initiating payment.");
      console.error(error);
    }
  };

  if (user.isSubscribed) {
    return <Text>You are subscribed!</Text>;
  }

  return (
    <View className="m-4 flex-1">
      <View className="flex-row items-center gap-x-2">
        <TouchableOpacity onPress={handleCancel}>
          <View className="bg-[#ffffff55] rounded-2xl">
            <Ionicons name="close" size={34} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-slate-300 font-semibold text-2xl">
          DayShed Pro
        </Text>
      </View>
      <View className="flex items-center justify-center my-4">
        <Ionicons name="diamond-outline" size={34} color="white" />
      </View>
      <View className="flex justify-center mt-3 bg-black/50 rounded-2xl p-4">
        <Text className="text-slate-200 font-semibold text-xl">
          Unlock Infinite Flow & AI Precision
        </Text>
        <Text className="text-slate-300 font-semibold text-md mt-2">
          Get unlimited AI Schedule optimizations, and exclusive features to
          master your day
        </Text>
        <View className="flex-row items-center gap-x-2 mt-2">
          <Ionicons name="diamond" size={15} color="white" />
          <Text className="text-slate-300 font-semibold text-md mt-2">
            Unlimited AI Schedule Refactoring
          </Text>
        </View>
        <View className="flex-row items-center gap-x-2 mt-1">
          <Ionicons name="grid-outline" size={15} color="white" />
          <Text className="text-slate-300 font-semibold text-md mt-2">
            Advanced Productivity Insights
          </Text>
        </View>
        <View className="flex-row items-center gap-x-2 mt-1">
          <Ionicons name="mic" size={15} color="white" />
          <Text className="text-slate-300 font-semibold text-md mt-2">
            AI-Powered Voice Input
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-x-2 mt-5 px-2 relative">
        <View className="absolute w-screen h-40 -z-1">
          <Canvas style={{ flex: 1, borderRadius: 20 }}>
            <RoundedRect
              x={xPositionOfGradient}
              y={12}
              width={160}
              height={116}
              r={16}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(256, 256)}
                colors={["blue", "yellow"]}
              />
            </RoundedRect>
          </Canvas>
        </View>

        <TouchableOpacity
          onPress={setToMonthly}
          className="items-center gap-x-2 bg-black flex-1 rounded-2xl h-32 justify-around z-5"
        >
          <Text className="text-slate-200">Monthly</Text>
          <Text className="text-slate-400 text-xl">{monthlyAmount}Rs/month</Text>
          <Text className={monthlyOffer.length !== 0 ? "bg-cyan-500 py-1 px-2 rounded-full" : ""}>
            {monthlyOffer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={setToAnnual}
          className="items-center gap-x-2 bg-black flex-1 rounded-2xl h-32 justify-around z-5"
        >
          <Text className="text-slate-200">Annual</Text>
          <Text className="text-slate-400 text-xl">{annualAmount}Rs/month</Text>
          <Text className={annualOffer.length !== 0 ? "bg-cyan-500 py-1 px-2 rounded-full" : ""}>
            {annualOffer}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-black/50 rounded-2xl mt-5 p-4">
        <Text className="text-slate-200 font-semibold">
          "Subscribe to our premium plan to unlock all features."
        </Text>
      </View>

      <View className="mt-5 flex-1 items-center justify-end">
        {/* Connected Razorpay Trigger */}
        <TouchableOpacity 
          onPress={handleSubscriptionPayment}
          className="bg-cyan-400 w-full py-4 rounded-full"
        >
          <Text className="text-slate-900 font-semibold text-center">
            Subscribe To {selectedPlan} Plan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}