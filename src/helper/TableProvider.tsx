import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Background } from "expo-router/build/react-navigation";
import { LinearGradient } from "expo-linear-gradient";

type TimelineStatus =
  "completed" | "standard" | "active" | "flexible" | "system" | "lunch";

type TimelineEvent = {
  id: string;
  timeLabel?: string;
  title: string;
  timeRange?: string;
  subtitle?: string;
  location?: string;
  isLocked?: boolean;
  status: TimelineStatus;
};

// 2. Data is purely data now (No UI classes mixed in)
const timelineData: TimelineEvent[] = [
  {
    id: "1",
    timeLabel: "6:00 AM",
    title: "MORNING RECOVERY",
    status: "standard",
  },
  {
    id: "2",
    timeLabel: "7:00 AM",
    title: "BREATHING BREAK",
    status: "completed",
  },
  {
    id: "3",
    timeLabel: "8:00 AM",
    title: "DEEP WORK: DESIGN REVIEW",
    timeRange: "8:00 - 10:00",
    subtitle: "Client Project X\nGoal: Final Polish",
    isLocked: true,
    status: "active",
  },
  {
    id: "4",
    timeLabel: "10:00 AM",
    title: "COFFEE & EMAIL",
    status: "standard",
  },
  {
    id: "5",
    timeLabel: "11:00 AM",
    title: "TEAM SYNC",
    timeRange: "11:30",
    status: "flexible",
  },
  {
    id: "6",
    title: "*Meeting overrunning. Rebalancing remaining day...",
    status: "system",
  },
  {
    id: "7",
    timeLabel: "12:00 PM",
    title: "LUNCH WITH SARAH",
    timeRange: "12:00 - 1:00",
    location: "Downtown Café",
    status: "lunch",
  },
];

export default function TableProvider() {
  return (
    
    <ScrollView >
      
     
      {timelineData.map((slot) => (
        <Slot key={slot.id} slot={slot} />
      ))}
      <View className="h-32 w-10" />
    </ScrollView>
  );
}

function Slot({ slot }: { slot: TimelineEvent }) {
  let backGroundColor, textColor;
  slot.status === "completed"
    ? ((backGroundColor = "bg-slate-500"), (textColor = "text-gray-200"))
    : ((backGroundColor = "bg-blue-300"), (textColor = "text-gray-900"));
  return (
    <View className="flex-row mt-2">
      <View className="flex-col items-center">
        <View className="w-3 h-3 bg-slate-500 rounded-full" />
        <View className="flex-1 mx-4 bg-slate-800  border-slate-500 border-r-2 shadow-2xl shadow-violet-700 translate-y-1" />
      </View>
      <View
        className={`flex-1 border border-blue-200 rounded-xl mt-1 mr-4 px-3 ${backGroundColor} shadow-2xl shadow-blue-300 ${textColor}`}
      >
        <Text className={`text-xl ${textColor}`}>{slot.title}</Text>
        {slot?.timeLabel && (
          <Text className={`text-md ${textColor}`}>{slot.timeLabel}</Text>
        )}
        {slot?.timeRange && (
          <Text className={`text-md ${textColor}`}>{slot.timeRange}</Text>
        )}
        {slot?.subtitle && (
          <Text className={`text-md ${textColor}`}>{slot.subtitle}</Text>
        )}
        {slot?.location && (
          <Text className={`text-md ${textColor}`}>{slot.location}</Text>
        )}
        {slot.status && (
          <Text className={`text-md ${textColor}`}>{slot.status}</Text>
        )}
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    height: 144,
  },
});