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
import { API_BASE_URL } from "../../../../constants";

export default function Subscribe() {
  const [monthlyAmount] = useState<number>(299);
  const [annualAmount] = useState<number>(1999);
  const [monthlyOffer] = useState<string>("");
  const [annualOffer] = useState<string>("");

  const [xPositionOfGradient, setXPositionOfGradient] = useState<5 | 167>(5);
  const [selectedPlan, setSelectedPlan] = useState<"Monthly" | "Annual">(
    "Monthly",
  );

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

  const handlePushToContactSupport = () => {
    router.push("/(root)/(subscription)/contact");
  };

  const user = {
    isSubscribed: false,
    aiCredits: 10,
    currentPlan: "Annual",
    subscribedOn: "2025-10-10",
    expiresOn: "2026-12-10",
  };

  // Dynamic progress calculation helper
  const calculateProgress = () => {
    if (!user.subscribedOn || !user.expiresOn) return 0;

    const start = new Date(user.subscribedOn).getTime();
    const end = new Date(user.expiresOn).getTime();
    const now = new Date().getTime();

    if (now >= end) return 0;
    if (now <= start) return 100;

    const totalDuration = end - start;
    const timeElapsed = now - start;
    const timeLeft = totalDuration - timeElapsed;

    const percentageLeft = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));
    return Math.round(percentageLeft);
  };

  const progressPercentage = calculateProgress();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscriptionPayment = async () => {
    if (loading) return;
    setLoading(true);

    const amountInPaise =
      selectedPlan === "Monthly" ? monthlyAmount * 100 : annualAmount * 100;

    try {
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, amount: amountInPaise }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success || !orderData.order) {
        throw new Error(
          orderData.message || "Failed to fetch order from server",
        );
      }

      const options = {
        description: `DayShed Pro ${selectedPlan} Subscription`,
        currency: "INR",
        key: process.env.EXPO_PUBLIC_RAZORPAY_KEY,
        amount: orderData.order.amount,
        order_id: orderData.order.id,
        name: "DayShed",
        prefill: {
          email: "user@example.com",
          contact: "9999999999",
          name: "DayShed User",
        },
        theme: { color: "#06b6d4" },
      };

      if (!RazorpayCheckout || typeof RazorpayCheckout.open !== "function") {
        Alert.alert(
          "Error",
          "Razorpay native module is not available. Make sure you are using a development build.",
        );
        setLoading(false);
        return;
      }

      RazorpayCheckout.open(options)
        .then((data:any) => {
          setLoading(false);
          Alert.alert(`Success`, `Payment ID: ${data.razorpay_payment_id}`);
          router.replace("/(root)/(tabs)/home");
        })
        .catch((error:any) => {
          setLoading(false);
          Alert.alert(
            `Payment Cancelled/Failed`,
            `${error.code} | ${error.description}`,
          );
        });
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "Error",
        error.message || "Something went wrong while initiating payment.",
      );
      console.error(error);
    }
  };

  if (user.isSubscribed) {
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
        <View className="bg-black/50 p-4 rounded-xl">
          <Text className="text-slate-300 font-semibold text-2xl">
            Welcome to DayShed Pro!
          </Text>
          <Text className="text-slate-300 mt-3">
            You are currently in the {user.currentPlan} plan. Enjoy full access
            to premium features.
          </Text>
        </View>
        
        {/* Subscribed Plan Card with Dynamic Progress Bar */}
        <View className="mt-4 items-center justify-center relative">
          <View className="w-[300px] h-[180px] absolute">
            <Canvas style={{ flex: 1 }}>
              <RoundedRect
                x={0}
                y={0}
                width={300}
                height={180}
                r={16}
              >
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(256, 256)}
                  colors={[
                    "#00000055",
                    "#ffffff55",
                    "#00000055",
                    "#ffffff55",
                    "#00000055",
                    "#ffffff55",
                    "#00000055",
                    "#ffffff55",
                  ]}
                />
              </RoundedRect>
            </Canvas>
          </View>
          
          <View className="bg-slate-900 w-[290px] h-[170px] m-4 rounded-2xl p-4 justify-between">
            <View>
              <Text className="text-white text-xl mb-2 font-semibold">
                Active Subscription: {user.currentPlan}
              </Text>
              <Text className="text-white text-xs my-0.5">
                <Text className="text-slate-400">Subscribed on: </Text> {user.subscribedOn}
              </Text>
              <Text className="text-white text-xs my-0.5">
                <Text className="text-slate-400">Expires on: </Text> {user.expiresOn}
              </Text>
            </View>
    
            <View className="mt-2">
              <View className="flex-row justify-between mb-1">
                <Text className="text-slate-400 text-xs">Duration Left</Text>
                <Text className="text-cyan-400 text-xs font-semibold">{progressPercentage}% Left</Text>
              </View>
              <View className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <View className="bg-cyan-400 h-full rounded-full" style={{ width: `${progressPercentage}%` }} />
              </View>
            </View>
          </View>
        </View>
        
        <View className="flex-1 justify-end">
          <TouchableOpacity onPress={handlePushToContactSupport} className="bg-cyan-400 rounded-full p-3 mt-4">
            <Text className="text-white text-center font-semibold">
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
          <Text className="text-slate-400 text-xl">
            {monthlyAmount}Rs/month
          </Text>
          <Text
            className={
              monthlyOffer.length !== 0
                ? "bg-cyan-500 py-1 px-2 rounded-full"
                : ""
            }
          >
            {monthlyOffer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={setToAnnual}
          className="items-center gap-x-2 bg-black flex-1 rounded-2xl h-32 justify-around z-5"
        >
          <Text className="text-slate-200">Annual</Text>
          <Text className="text-slate-400 text-xl">{annualAmount}Rs/month</Text>
          <Text
            className={
              annualOffer.length !== 0
                ? "bg-cyan-500 py-1 px-2 rounded-full"
                : ""
            }
          >
            {annualOffer}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-black/50 rounded-2xl mt-5 p-4">
        <Text className="text-slate-200 font-semibold">
          "Subscribe to our premium plan to unlock all features."
        </Text>
      </View>

      <View className="mt-5 flex-1 items-center justify-end gap-y-3">
        <TouchableOpacity
          onPress={handleSubscriptionPayment}
          disabled={loading}
          className={`bg-cyan-400 w-full py-4 rounded-full ${loading ? "opacity-50" : ""}`}
        >
          <Text className="text-white font-semibold text-center">
            {loading ? "Processing..." : `Subscribe To ${selectedPlan} Plan`}
          </Text>
        </TouchableOpacity>
     
        <TouchableOpacity onPress={handlePushToContactSupport} className="bg-cyan-400 w-full py-4 rounded-full">
          <Text className="text-white text-center font-semibold">
            Contact Support
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}