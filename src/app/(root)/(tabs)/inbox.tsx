import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, SharedValue } from "react-native-reanimated";

export type NotificationType = "task" | "system" | "ai_insight" | "alert";

export interface NotificationAction {
  label: string;
  actionId: string;
  payload?: any;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  action?: NotificationAction;
}

export const dummyNotifications: Notification[] = [
  {
    id: "notif_001",
    title: "Upcoming: Sprint Standup",
    message: "Your async written update is due in 15 minutes.",
    type: "task",
    timestamp: "2026-09-24T13:45:00Z",
  },
  {
    id: "notif_002",
    title: "AI Schedule Optimized",
    message:
      "I reorganized your afternoon blocks to give you 2 hours of uninterrupted deep work for your MERN stack deployment.",
    type: "ai_insight",
    timestamp: "2026-09-24T10:05:00Z",
  },
  {
    id: "notif_003",
    title: "Sync Successful",
    message:
      "Your Morning Run & Cardio data was successfully synced via Apple Health.",
    type: "system",
    timestamp: "2026-09-24T08:30:00Z",
  },
  {
    id: "notif_004",
    title: "Overdue Task",
    message: "Review thermodynamics assignment notes from yesterday.",
    type: "alert",
    timestamp: "2026-09-23T18:00:00Z",
  },
  {
    id: "notif_005",
    title: "Upcoming: Sprint Standup",
    message: "Your async written update is due in 15 minutes.",
    type: "task",
    timestamp: "2026-09-24T13:45:00Z",
  },
  {
    id: "notif_006",
    title: "AI Schedule Optimized",
    message:
      "I reorganized your afternoon blocks to give you 2 hours of uninterrupted deep work for your MERN stack deployment.",
    type: "ai_insight",
    timestamp: "2026-09-24T10:05:00Z",
  },
  {
    id: "notif_007",
    title: "Sync Successful",
    message:
      "Your Morning Run & Cardio data was successfully synced via Apple Health.",
    type: "system",
    timestamp: "2026-09-24T08:30:00Z",
  },
  {
    id: "notif_008",
    title: "Overdue Task",
    message: "Review thermodynamics assignment notes from yesterday.",
    type: "alert",
    timestamp: "2026-09-23T18:00:00Z",
  },
];

export type Theme = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  borderBackground: string;
  backgroundBackground: string;
};

const getSlotTheme = (type: NotificationType): Theme => {
  switch (type) {
    case "task":
      return {
        icon: "checkmark-circle-outline" as const,
        iconColor: "#93c5fd", // Blue 300
        iconBg: "bg-blue-400/15",
        borderBackground: "border-blue-400/15",
        backgroundBackground: "bg-blue-400/15",
      };
    case "ai_insight":
      return {
        icon: "sparkles-outline" as const,
        iconColor: "#d8b4fe", // Purple 300
        iconBg: "bg-purple-400/15",
        borderBackground: "border-purple-400/15",
        backgroundBackground: "bg-purple-400/15",
      };
    case "alert":
      return {
        icon: "warning-outline" as const,
        iconColor: "#fda4af", // Rose 300
        iconBg: "bg-rose-400/15",
        borderBackground: "border-rose-400/15",
        backgroundBackground: "bg-rose-400/15",
      };
    case "system":
    default:
      return {
        icon: "pulse-outline" as const,
        iconColor: "#99f6e4", // Teal 300
        iconBg: "bg-teal-400/15",
        borderBackground: "border-teal-400/15",
        backgroundBackground: "bg-teal-400/15",
      };
  }
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};



export default function Inbox() {

  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleDelete = (idToRemove: string) => {
    setNotifications(notifications.filter((item) => item.id !== idToRemove));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <View className=" flex-1">
      <SafeAreaView className="flex-1">
        <View className="px-5 py-6">
          <Text className="text-3xl font-medium text-slate-100 tracking-wide">
            Inbox
          </Text>
        </View>
        <View className="px-5 justify-between items-center flex-row">
          <Text className="text-slate-200 text-xl my-2">
            {notifications.length} Notification(s)
          </Text>
          <TouchableOpacity onPress={clearAllNotifications}>
            <Text className="text-gray-200 font-bold">
              Clear All
            </Text>
          </TouchableOpacity>
          
        </View>

        <View className="px-5 flex-1 relative">
          {notifications.length > 0 ?
            <FlatList
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}
            data={notifications}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

              const theme:Theme = getSlotTheme(item.type);
              
              const renderRightActions = (_progress:SharedValue<number>, dragX: SharedValue<number>) => {

                return (
                  <TouchableOpacity onPress={() => handleDelete(item.id)} className={`${theme.backgroundBackground}  p-4 mb-4 rounded-3xl items-end justify-center`}>
                      <Text className="text-slate-100">
                        Clear
                      </Text>
                  </TouchableOpacity>
                );
              };

              

              return (
                <ReanimatedSwipeable
                  renderRightActions={renderRightActions}
                  overshootRight={false}
                >
                  <View
                    className={`bg-black/15 p-5 rounded-3xl mb-4 flex-row items-start border-r-8 ${theme.borderBackground} shadow-md shadow-black/30`}
                  >
                    <View
                      className={`h-12 w-12 rounded-full items-center justify-center mr-4 ${theme.iconBg}`}
                    >
                      <Ionicons
                        name={theme.icon}
                        size={22}
                        color={theme.iconColor}
                      />
                    </View>

                    <View className="flex-1 pt-1">
                      <View className="flex-row justify-between items-center mb-1.5">
                        <Text className="text-base font-semibold text-slate-200">
                          {item.title}
                        </Text>
                        <Text className="text-xs text-slate-500 font-medium">
                          {formatTime(item.timestamp)}
                        </Text>
                      </View>
                      <Text className="text-sm text-slate-400 leading-relaxed pr-2">
                        {item.message}
                      </Text>
                    </View>
                  </View>
                </ReanimatedSwipeable>
              );
            }}
            /> :
            (
              <Text className="text-center text-sm text-slate-500 py-10">
              No notifications
              </Text>
            )
          }

          <LinearGradient
            colors={["#1e293b", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientTop}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["transparent", "#1e293b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBottom}
            pointerEvents="none"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  notificationContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: '#666',
  },
  deleteBackground: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
