import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChartKitProvider,
  createChartPreset,
  LineChart,
} from "react-native-chart-kit/v2";
import VoiceInputScreen from "@/helper/voiceInputProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = screenWidth - 64;

interface task {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
}

interface dayData {
  id: string;
  date: string;
  tasks?: task[];
}

const datap = [
  { date: "01-01", productivity: 0.52 },
  { date: "02-01", productivity: 0.6 },
  { date: "03-01", productivity: 0.58 },
  { date: "04-01", productivity: 1 },
  { date: "05-01", productivity: 0.55 },
  { date: "06-01", productivity: 0.55 },
  { date: "07-01", productivity: 0.25 },
];

const INITIAL_DAYS_DATA: dayData[] = [
  {
    id: "1",
    date: "Oct 12",
    tasks: [
      {
        id: "t1",
        title: "Team Sync Meeting",
        startTime: "12:10",
        endTime: "12:15",
        description: "Discuss sprint progress and blockers.",
      },
      {
        id: "t2",
        title: "Review PR #204",
        startTime: "12:15",
        endTime: "12:20",
        description: "Check navigation state and component mounts.",
      },
      {
        id: "t3",
        title: "Design System Update",
        startTime: "12:30",
        endTime: "12:35",
        description: "Align colors with dark mode specs.",
      },
      {
        id: "t4",
        title: "Design Update",
        startTime: "12:50",
        endTime: "12:55",
        description: "Update wireframes for the settings screen.",
      },
    ],
  },
  {
    id: "2",
    date: "Oct 13",
    tasks: [
      {
        id: "t4",
        title: "Client Presentation",
        startTime: "12:10",
        endTime: "12:15",
        description: "Walk through phase 1 deliverables.",
      },
      {
        id: "t5",
        title: "Database Optimization",
        startTime: "12:10",
        endTime: "12:15",
        description: "Index slow queries on user logs.",
      },
    ],
  },
  {
    id: "3",
    date: "Oct 14",
    tasks: [
      {
        id: "t6",
        title: "Sprint Planning",
        startTime: "12:10",
        endTime: "12:15",
        description: "Prioritize backlog tickets for next cycle.",
      },
      {
        id: "t7",
        title: "Update Documentation",
        startTime: "12:10",
        endTime: "12:15",
        description: "Add notes on chart kit setup.",
      },
      {
        id: "t8",
        title: "User Testing",
        startTime: "12:10",
        endTime: "12:15",
        description: "Observe user flow interactions.",
      },
    ],
  },
  {
    id: "4",
    date: "Oct 15",
    tasks: [
      {
        id: "t9",
        title: "Refactor Auth Flow",
        startTime: "12:10",
        endTime: "12:15",
        description: "Clean up token storage logic.",
      },
    ],
  },
  {
    id: "5",
    date: "Oct 16",
    tasks: [
      {
        id: "t10",
        title: "Deploy to Staging",
        startTime: "12:10",
        endTime: "12:15",
        description: "Verify environment variables.",
      },
      {
        id: "t11",
        title: "Weekly Retrospective",
        startTime: "12:10",
        endTime: "12:15",
        description: "Review team feedback.",
      },
    ],
  },
];

interface CustomTimePickerProps {
  visible: boolean;
  initialTime?: string;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

function TimePicker({
  visible,
  initialTime = "12:00",
  onClose,
  onConfirm,
}: CustomTimePickerProps) {
  const parts = (initialTime || "12:00").split(":");
  const [selectedHour, setSelectedHour] = useState(parts[0] || "12");
  const [selectedMinute, setSelectedMinute] = useState(parts[1] || "00");

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  const handleConfirm = () => {
    onConfirm(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70 px-6">
        <View className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-xs">
          <Text className="text-slate-200 text-lg font-bold mb-4 text-center">
            Select Time
          </Text>

          <View className="flex-row justify-center items-center h-48 mb-4">
            <View className="flex-1 items-center">
              <Text className="text-slate-400 text-xs font-semibold mb-2">
                HOUR
              </Text>
              <ScrollView
                className="w-full"
                showsVerticalScrollIndicator={false}
              >
                {hours.map((h) => (
                  <TouchableOpacity
                    key={h}
                    onPress={() => setSelectedHour(h)}
                    className={`py-2 my-0.5 rounded-lg items-center ${
                      selectedHour === h ? "bg-blue-600" : "bg-transparent"
                    }`}
                  >
                    <Text className="text-slate-100 font-mono text-base">
                      {h}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <Text className="text-slate-400 text-xl font-bold px-2 self-center pt-4">
              :
            </Text>

            <View className="flex-1 items-center">
              <Text className="text-slate-400 text-xs font-semibold mb-2">
                MINUTE
              </Text>
              <ScrollView
                className="w-full"
                showsVerticalScrollIndicator={false}
              >
                {minutes.map((m) => (
                  <TouchableOpacity
                    key={m}
                    onPress={() => setSelectedMinute(m)}
                    className={`py-2 my-0.5 rounded-lg items-center ${
                      selectedMinute === m ? "bg-blue-600" : "bg-transparent"
                    }`}
                  >
                    <Text className="text-slate-100 font-mono text-base">
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-slate-800 p-3 rounded-xl items-center mx-1"
            >
              <Text className="text-slate-400 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="flex-1 bg-blue-600 p-3 rounded-xl items-center mx-1"
            >
              <Text className="text-white font-medium">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function Insights() {
  const [data, setData] = useState<dayData[]>(INITIAL_DAYS_DATA);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<task | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStartTime, setEditStartTime] = useState("12:00");
  const [editEndTime, setEditEndTime] = useState("12:30");
  const [editDescription, setEditDescription] = useState("");

  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

  const isEditingExisting = data.some((d) =>
    d?.tasks?.some((t) => t.id === selectedTask?.id),
  );

  const handleOpenEdit = (dayId: string, taskItem: task) => {
    setSelectedDayId(dayId);
    setSelectedTask(taskItem);
    setEditTitle(taskItem.title);
    setEditStartTime(taskItem.startTime || "12:00");
    setEditEndTime(taskItem.endTime || "12:30");
    setEditDescription(taskItem.description || "");
    setModalVisible(true);
  };

  const handleAddTask = (dayId: string) => {
    const newTask: task = {
      id: Date.now().toString(),
      title: "",
      startTime: "12:00",
      endTime: "12:30",
      description: "",
    };

    setSelectedDayId(dayId);
    setSelectedTask(newTask);
    setEditTitle("");
    setEditStartTime("12:00");
    setEditEndTime("12:30");
    setEditDescription("");
    setModalVisible(true);
  };

  const handleTimeSelected = (selectedTime: string) => {
    if (pickerMode === "start") {
      setEditStartTime(selectedTime);

      // Auto adjust end time if end time is before start time
      const [sH, sM] = selectedTime.split(":").map(Number);
      const [eH, eM] = editEndTime.split(":").map(Number);
      const startMins = sH * 60 + sM;
      const endMins = eH * 60 + eM;

      if (startMins >= endMins) {
        const newEndMins = (startMins + 30) % 1440;
        const newEH = Math.floor(newEndMins / 60)
          .toString()
          .padStart(2, "0");
        const newEM = (newEndMins % 60).toString().padStart(2, "0");
        setEditEndTime(`${newEH}:${newEM}`);
      }
    } else if (pickerMode === "end") {
      setEditEndTime(selectedTime);
    }
    setPickerMode(null);
  };

  const handleDeleteTask = () => {
    if (!selectedTask || !selectedDayId ) return;

    setData((prevData) =>
      prevData.map((day) => {
        if (day.id === selectedDayId) {
          return {
            ...day,
            tasks: day?.tasks?.filter((t) => t.id !== selectedTask.id),
          };
        }
        return day;
      }),
    );

    setModalVisible(false);
  };

  const handleSaveTask = () => {
    if (!selectedTask || !selectedDayId) return;

    const updatedTask: task = {
      ...selectedTask,
      title: editTitle,
      startTime: editStartTime,
      endTime: editEndTime,
      description: editDescription,
    };

    setData((prevData) =>
      prevData.map((day) => {
        if (day.id === selectedDayId) {
          const currentTasks = day.tasks ?? [];
          const exists = currentTasks.some((t) => t.id === selectedTask.id);
          return {
            ...day,
            tasks: exists
              ? currentTasks.map((t) =>
                  t.id === selectedTask.id ? updatedTask : t,
                )
              : [...currentTasks, updatedTask],
          };
        }
        return day;
      }),
    );

    setModalVisible(false);
  };

  const renderDayColumn = ({ item: dayItem }: { item: dayData }) => (
    <View
      style={{ width: CARD_WIDTH }}
      className="bg-black/30 border border-slate-700/50 mx-2 p-5 rounded-2xl"
    >
      <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <Text className="text-lg font-semibold text-slate-100 tracking-wide">
          {dayItem.date}
        </Text>
        <View className="flex-row items-center gap-x-3">
          <TouchableOpacity onPress={() => handleAddTask(dayItem.id)}>
            <Ionicons
              name="add-circle"
              size={20}
              color="#38bdf8"
              className="mr-1"
            />
          </TouchableOpacity>
          <View className="bg-black/20 px-2.5 py-1 rounded-full border border-blue-500/20">
            <Text className="text-xs font-medium text-gray-300">
              {dayItem.tasks ? `${dayItem.tasks.length} tasks` : "0 tasks"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        className="max-h-64"
      >
        {dayItem.tasks &&
          dayItem.tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              activeOpacity={0.7}
              onPress={() => handleOpenEdit(dayItem.id, task)}
              className="bg-slate-800/80 border border-slate-700/40 p-3.5 rounded-xl mb-2.5 flex-row items-center justify-between"
            >
              <View className="flex-1 mr-3">
                <Text
                  className="text-slate-200 font-medium text-sm mb-0.5"
                  numberOfLines={1}
                >
                  {task.title || "Untitled Task"}
                </Text>
                {task.description ? (
                  <Text
                    className="text-slate-400 text-xs mt-1"
                    numberOfLines={1}
                  >
                    {task.description}
                  </Text>
                ) : null}
              </View>
              <View className="bg-slate-700/50 px-2 py-0.5 rounded">
                <Text className="text-slate-400 text-xs font-mono">
                  {task.startTime} - {task.endTime}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#1e293b", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientTop}
        pointerEvents="none"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 pt-5">
          <Text className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
            Insights
          </Text>
          <View className="bg-black/50 border border-slate-700/50 p-4 rounded-2xl">
            <Text className="text-xl font-semibold text-slate-300 mb-2">
              Your Productivity
            </Text>
            <ChartKitProvider mode="dark" preset="acme" presets={{ acme }}>
              <LineChart
                data={datap}
                xKey="date"
                yKey="productivity"
                width={CARD_WIDTH - 32}
                height={160}
                curve="monotone"
                areaFill={{ fromOpacity: 0.15, toOpacity: 0.01 }}
                area
              />
            </ChartKitProvider>
          </View>
        </View>

        <Text className="mx-4 mt-5 font-semibold text-xl text-slate-300">
          Voice Action
        </Text>
        <VoiceInputScreen />

        <View className="mt-6 flex">
          <View className="flex-row items-center justify-between px-4">
            <Text className="text-xl font-bold text-slate-100 px-4 mb-4 tracking-tight">
              Upcoming Schedule
            </Text>
            <TouchableOpacity className="flex -translate-y-3">
              <Ionicons name="add-circle" size={26} color="#ef4444" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderDayColumn}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 16}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 8 }}
            scrollEventThrottle={16}
          />
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60 mb-14">
          <KeyboardAvoidingView behavior="padding">
            <View className="bg-slate-950 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-4 z-20">
                <Text className="text-xl font-bold text-slate-200">
                  {isEditingExisting ? "Edit Task" : "Add Task"}
                </Text>

                {isEditingExisting && (
                  <TouchableOpacity
                    onPress={handleDeleteTask}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    activeOpacity={0.6}
                    className="p-1 z-30"
                  >
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                  </TouchableOpacity>
                )}
              </View>

              <Text className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Title
              </Text>
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Task title"
                placeholderTextColor="#64748b"
                className="bg-slate-900 text-slate-100 border border-slate-800 p-3.5 rounded-xl mb-4 text-base"
              />

              <Text className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Time
              </Text>
              <View className="flex-row space-x-2 mb-4">
                <TouchableOpacity
                  onPress={() => setPickerMode("start")}
                  className="flex-1 bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex-row items-center justify-between mx-1"
                >
                  <Text className="text-slate-100 text-base font-mono">
                    {editStartTime || "Start"}
                  </Text>
                  <Ionicons name="time-outline" size={18} color="#94a3b8" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPickerMode("end")}
                  className="flex-1 bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex-row items-center justify-between mx-1"
                >
                  <Text className="text-slate-100 text-base font-mono">
                    {editEndTime || "End"}
                  </Text>
                  <Ionicons name="time-outline" size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              <Text className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Description
              </Text>
              <TextInput
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Add description..."
                placeholderTextColor="#64748b"
                multiline
                numberOfLines={3}
                className="bg-slate-900 text-slate-100 border border-slate-800 p-3.5 rounded-xl mb-6 text-base h-24 textAlignVertical-top"
              />

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 bg-slate-800 border border-slate-700 p-4 rounded-xl items-center mx-1"
                >
                  <Text className="text-slate-300 font-semibold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveTask}
                  className="flex-1 bg-blue-600 p-4 rounded-xl items-center mx-1"
                >
                  <Text className="text-white font-semibold">
                    {isEditingExisting ? "Save Changes" : "Add Task"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <TimePicker
        visible={pickerMode !== null}
        initialTime={pickerMode === "start" ? editStartTime : editEndTime}
        onClose={() => setPickerMode(null)}
        onConfirm={handleTimeSelected}
      />

      <LinearGradient
        colors={["#1e293b", "#1e293b", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
}

const acme = createChartPreset({
  light: {
    background: "#ffffff",
    grid: "#e5edf7",
    series: ["#155eef", "#12b76a"],
  },
  dark: {
    background: "transparent",
    plotBackground: "transparent",
    grid: "#33415550",
    series: ["#38bdf8", "#34d399"],
  },
});

const styles = StyleSheet.create({
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 10,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 10,
  },
});
