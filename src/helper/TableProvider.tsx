import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";

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
    <ScrollView>
      {timelineData.map((slot) => (
        <Slot key={slot.id} slot={slot} />
      ))}
    </ScrollView>
  );
}

function Slot({ slot }: { slot: TimelineEvent }) {
  return (
    <View className="flex-row mt-2">
      <View className="flex-col items-center">
        <View className="w-2 h-2 bg-slate-50 rounded-full" />
        <View className="flex-1 mx-4 bg-slate-800  border-[#5c24e6] border-r-2 shadow-xl shadow-violet-500 translate-y-1"></View>
      </View>
      <View className="border border-slate-400 rounded-xl flex-1 mr-4 px-3">
        <Text className="text-3xl">{slot.title}</Text>
        <Text className="text-3xl">{slot.timeLabel}</Text>
      </View>
    </View>
  );
}
