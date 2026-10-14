import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Contact() {
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    // Simulate sending message to backend support system
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Success", 
        "Your message has been sent to DayShed Support. We will get back to you soon!"
      );
      setSubject("");
      setMessage("");
      router.back();
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
          {/* Header */}
          <View className="flex-row items-center gap-x-2 mb-6">
            <TouchableOpacity onPress={handleCancel}>
              <View className="bg-[#ffffff55] rounded-2xl p-1">
                <Ionicons name="close" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="text-slate-300 font-semibold text-2xl">
              Contact Support
            </Text>
          </View>

          {/* Info Card */}
          <View className="bg-black/50 p-4 rounded-2xl mb-6 border border-slate-800">
            <View className="flex-row items-center gap-x-3 mb-2">
              <Ionicons name="headset-outline" size={24} color="#06b6d4" />
              <Text className="text-slate-200 font-semibold text-lg">We're here to help!</Text>
            </View>
            <Text className="text-slate-400 text-sm leading-relaxed">
              Have questions about your subscription, AI credits, or encountered an issue? Send us a message and our support team will respond shortly.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="gap-y-4">
            <View>
              <Text className="text-slate-300 mb-2 font-medium">Subject / Issue Type</Text>
              <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder="e.g., Billing Issue, Feature Request"
                placeholderTextColor="#64748b"
                className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl text-base"
              />
            </View>

            <View>
              <Text className="text-slate-300 mb-2 font-medium">Message</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Describe your issue or feedback in detail..."
                placeholderTextColor="#64748b"
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
                className="bg-slate-900 border border-slate-800 text-white p-4 rounded-xl text-base h-40"
              />
            </View>
          </View>

          {/* Submit Button */}
          <View className="mt-8 mb-10 flex-1 justify-end">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className={`bg-cyan-400 w-full py-4 rounded-full ${loading ? "opacity-50" : ""}`}
            >
              <Text className="text-white font-semibold text-center text-base">
                {loading ? "Sending..." : "Send Message"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}