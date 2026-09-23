import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";

export type ScaleZeroToThree = 0 | 1 | 2 | 3;
export type SlotStatus =
  "pending" | "in_progress" | "partially_completed" | "completed" | "cancelled";

export interface SlotRenderData {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  systemComment?: string;
}

export interface SlotSystemMetadata {
  importance: ScaleZeroToThree;
  isTimeLocked: boolean;
  status: SlotStatus;
  notificationEnabled: boolean;
  productivityIndex: ScaleZeroToThree;
}

export interface SlotItem extends SlotRenderData, SlotSystemMetadata {}



const timelineData: SlotItem[] = [
  {
    id: "slot_001",
    startTime: "2026-09-24T06:30:00.000Z",
    endTime: "2026-09-24T07:15:00.000Z",
    title: "Morning Run & Cardio",
    description: "5km outdoor run followed by cooldown stretching",
    systemComment: "Logged via fitness sync",
    importance: 2,
    isTimeLocked: false,
    status: "pending",
    notificationEnabled: true,
    productivityIndex: 2,
  },
  {
    id: "slot_002",
    startTime: "2026-09-24T07:30:00.000Z",
    endTime: "2026-09-24T08:15:00.000Z",
    title: "Breakfast & News Briefing",
    description: "High-protein meal while skimming tech briefs",
    systemComment: "Routine auto-scheduled",
    importance: 1,
    isTimeLocked: false,
    status: "partially_completed",
    notificationEnabled: false,
    productivityIndex: 1,
  },
  {
    id: "slot_003",
    startTime: "2026-09-24T08:30:00.000Z",
    endTime: "2026-09-24T09:00:00.000Z",
    title: "Sprint Planning & Standup",
    description: "Align with product team on current sprint deliverables",
    systemComment: "Calendar sync locked",
    importance: 3,
    isTimeLocked: true,
    status: "cancelled",
    notificationEnabled: true,
    productivityIndex: 2,
  },
  {
    id: "slot_004",
    startTime: "2026-09-24T09:15:00.000Z",
    endTime: "2026-09-24T11:15:00.000Z",
    title: "Deep Work: Authentication Refactor",
    description: "Implement OAuth2 and token rotation middleware",
    systemComment: "Do Not Disturb triggered",
    importance: 3,
    isTimeLocked: false,
    status: "partially_completed",
    notificationEnabled: true,
    productivityIndex: 3,
  },
  {
    id: "slot_005",
    startTime: "2026-09-24T11:30:00.000Z",
    endTime: "2026-09-24T12:15:00.000Z",
    title: "PR Reviews & Git Clean-up",
    description: "Review peer pull requests on backend microservices",
    systemComment: "GitHub webhook integration",
    importance: 2,
    isTimeLocked: false,
    status: "in_progress",
    notificationEnabled: false,
    productivityIndex: 2,
  },
  {
    id: "slot_006",
    startTime: "2026-09-24T12:30:00.000Z",
    endTime: "2026-09-24T13:15:00.000Z",
    title: "Lunch Break",
    description: "Away from keyboard",
    systemComment: "Buffer time detected",
    importance: 0,
    isTimeLocked: false,
    status: "completed",
    notificationEnabled: false,
    productivityIndex: 0,
  },
  {
    id: "slot_007",
    startTime: "2026-09-24T13:30:00.000Z",
    endTime: "2026-09-24T14:30:00.000Z",
    title: "Client Status Sync",
    description: "Walkthrough staging deployment and bug triage",
    systemComment: "Meeting link attached",
    importance: 3,
    isTimeLocked: true,
    status: "in_progress",
    notificationEnabled: true,
    productivityIndex: 1,
  },
  {
    id: "slot_008",
    startTime: "2026-09-24T14:45:00.000Z",
    endTime: "2026-09-24T16:45:00.000Z",
    title: "API Gateway Optimization",
    description: "Profile latency bottlenecks and tune Redis caching",
    systemComment: "Performance benchmark active",
    importance: 3,
    isTimeLocked: false,
    status: "in_progress",
    notificationEnabled: true,
    productivityIndex: 3,
  },
  {
    id: "slot_009",
    startTime: "2026-09-24T17:00:00.000Z",
    endTime: "2026-09-24T17:45:00.000Z",
    title: "Database Migration Scripting",
    description: "Draft zero-downtime schema migration for users collection",
    systemComment: "Staging environment connected",
    importance: 2,
    isTimeLocked: false,
    status: "in_progress",
    notificationEnabled: true,
    productivityIndex: 2,
  },
  {
    id: "slot_010",
    startTime: "2026-09-24T18:00:00.000Z",
    endTime: "2026-09-24T18:30:00.000Z",
    title: "Daily Retro & Inbox Zero",
    description: "Sort Slack threads, archive emails, log daily blockers",
    systemComment: "Automated end-of-day digest",
    importance: 1,
    isTimeLocked: false,
    status: "in_progress",
    notificationEnabled: false,
    productivityIndex: 1,
  },
];

const STATUS_STYLES: Record<
  string,
  {
    cardBg: string;
    accentBorder: string;
    titleColor: string;
    metaColor: string;
    dotColor: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  in_progress: {
    cardBg: "bg-slate-700/35",
    accentBorder: "border-l-sky-400/90",
    titleColor: "text-slate-100 font-medium",
    metaColor: "text-slate-400",
    dotColor: "bg-sky-400 shadow-sm shadow-sky-400/50",
    badgeBg: "bg-sky-500/15",
    badgeText: "text-sky-300",
  },
  partially_completed: {
    cardBg: "bg-slate-700/30",
    accentBorder: "border-l-amber-400/80",
    titleColor: "text-slate-100 font-medium",
    metaColor: "text-slate-400",
    dotColor: "bg-amber-400/90",
    badgeBg: "bg-amber-400/15",
    badgeText: "text-amber-300",
  },
  completed: {
    cardBg: "bg-slate-900/30",
    accentBorder: "border-l-emerald-500/50",
    titleColor: "text-slate-400 line-through decoration-slate-600",
    metaColor: "text-slate-500",
    dotColor: "bg-emerald-500/60",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400/80",
  },
  pending: {
    cardBg: "bg-slate-700/20",
    accentBorder: "border-l-slate-600/60",
    titleColor: "text-slate-200 font-normal",
    metaColor: "text-slate-400",
    dotColor: "bg-slate-500/60",
    badgeBg: "bg-slate-700/40",
    badgeText: "text-slate-400",
  },
  cancelled: {
    cardBg: "bg-slate-900/25",
    accentBorder: "border-l-rose-400/40",
    titleColor: "text-slate-500 line-through decoration-slate-600",
    metaColor: "text-slate-600",
    dotColor: "bg-rose-500/40",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400/70",
  },
};

const getTimeRange=(slot: any): { start: string; end: string }=> {
  if (slot.timeRange) {
    const parts = slot.timeRange.split("-");
    return { start: parts[0]?.trim() || "", end: parts[1]?.trim() || "" };
  }

  if (slot.startTime && slot.endTime) {
    const format = (d: string) =>
      new Date(d).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    return {
      start: format(slot.startTime),
      end: format(slot.endTime),
    };
  }

  return { start: slot.timeLabel || "", end: "" };
}

const STATUS_CYCLE: Record<SlotStatus, SlotStatus> = {
  pending: "in_progress",
  in_progress: "partially_completed",
  partially_completed: "completed",
  completed: "cancelled",
  cancelled: "pending", // fallback recovery
};



export default function TableProvider() {
  const [slots, setSlots] = useState<SlotItem[]>(timelineData);

  const handleCycleStatus = (slotId: string) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId
          ? { ...slot, status: STATUS_CYCLE[slot.status] ?? "pending" }
          : slot
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
      {slots.map((slot: SlotItem) => {
        const currentStatus = slot.status || "pending";
        const theme = STATUS_STYLES[currentStatus] ?? STATUS_STYLES.pending;
        const { start, end } = getTimeRange(slot);

        return (
          <View key={slot.id} className="flex-row items-stretch my-1.5 px-3">
            {/* 1. Subtle Left Timestamp */}
            <View className="w-20 pr-1.5 pt-1 items-end justify-start">
              <Text className="text-xs font-medium text-slate-300 tracking-tight">
                {start}
              </Text>
              {end ? (
                <Text className="text-[11px] text-slate-500 mt-0.5">{end}</Text>
              ) : null}
            </View>

            {/* 2. Soft Minimalist Timeline Axis */}
            <View className="flex-col items-center">
              <View
                className={`w-2.5 h-2.5 rounded-full ${theme.dotColor} border-2 border-slate-800 mt-1.5`}
              />
              <View className="flex-1 w-[1.5px] bg-slate-700/50 my-1" />
            </View>

            {/* 3. Soft Card with Accent Strip */}
            <View className="flex-1 ml-3.5 mb-2.5">
              <View className={`w-full rounded-2xl border-l-[3.5px] ${theme.accentBorder} ${theme.cardBg} px-4 py-3`}>
                <View className="flex-row justify-between items-center mb-1">
                  <Text
                    className={`text-[15px] flex-1 mr-2 leading-snug ${theme.titleColor}`}
                  >
                    {slot.title}
                  </Text>

                  {slot.status && (
                    <Pressable
                      onPress={() => handleCycleStatus(slot.id)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      className={`px-2.5 py-0.5 rounded-full ${theme.badgeBg} active:opacity-60`}
                    >
                      <Text
                        className={`text-[10px] font-medium tracking-wide capitalize ${theme.badgeText}`}
                      >
                        {slot.status.replace("_", " ")}
                      </Text>
                    </Pressable>
                  )}
                </View>

                {slot?.description && (
                  <Text
                    className={`text-xs mt-1 leading-relaxed ${theme.metaColor}`}
                  >
                    {slot.description}
                  </Text>
                )}
              </View>

              {slot.systemComment && (
                <Text
                  className={`text-xs ml-3 leading-relaxed ${theme.metaColor}`}
                >
                  {slot.systemComment}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}