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
import { CreateIconSetFromIcoMoon, Ionicons } from "@expo/vector-icons";

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
  tasks: task[];
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

export default function Insights() {
  const [data, setData] = useState<dayData[]>(INITIAL_DAYS_DATA);

  // Edit modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<task | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleOpenEdit = (dayId: string, taskItem: task) => {
    setSelectedDayId(dayId);
    setSelectedTask(taskItem);
    setEditTitle(taskItem.title);
    setEditStartTime(taskItem.startTime);
    setEditEndTime(taskItem.endTime);
    setEditDescription(taskItem.description || "");
    setModalVisible(true);
  };

  const handleAddTask = (dayId : string) => {
    // if (!selectedDayId) return;

    const newTask: task = {
      id: Date.now().toString(),
      title: "",
      startTime: "",
      endTime: "",
      description: "",
    };
    setSelectedDayId(dayId);
    setSelectedTask(newTask);
    setEditTitle(newTask.title);
    setEditStartTime(newTask.startTime);
    setEditEndTime(newTask.endTime);
    setEditDescription(newTask.description || "");
    setModalVisible(true);
  };

  const handleDeleteTask = () => {
    if (!selectedTask || !selectedDayId) return;
  
    setData((prevData) =>
      prevData.map((day) => {
        if (day.id === selectedDayId) {
          return {
            ...day,
            tasks: day.tasks.filter((t) => t.id !== selectedTask.id),
          };
        }
        return day;
      })
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
          const exists = day.tasks.some((t) => t.id === selectedTask.id);
          return {
            ...day,
            tasks: exists
              ? day.tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t))
              : [...day.tasks, updatedTask],
          };
        }
        return day;
      })
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
            <Ionicons name="add-circle" size={16} color="gray" className="mr-1" />
          </TouchableOpacity>
          <View className="bg-black/20 px-2.5 py-1 rounded-full border border-blue-500/20">
          <Text className="text-xs font-medium text-gray-300">
            {dayItem.tasks.length} tasks
          </Text>
        </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} className="max-h-64">
        {dayItem.tasks.map((task) => (
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
                {task.title}
              </Text>
              {task.description ? (
                <Text className="text-slate-400 text-xs mt-1" numberOfLines={1}>
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
        {/* Chart Section */}
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
          Edit Task
        </Text>
        <VoiceInputScreen />

        <View className="mt-6">
          <Text className="text-xl font-bold text-slate-100 px-4 mb-4 tracking-tight">
            Upcoming Schedule
          </Text>
          
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

      {/* Edit Task Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60 mb-14">
          <KeyboardAvoidingView behavior="padding">
            <View className="bg-slate-950 rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-slate-200 mb-4">
                  {data.some((d) => d.tasks.some((t) => t.id === selectedTask?.id))
                    ? "Edit Task"
                    : "Add Task"}
                </Text>
                <TouchableOpacity onPress={handleDeleteTask}>
                  <Ionicons name="trash-outline" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              <Text className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Title
              </Text>
              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Task title"
                placeholderTextColor="#64748b"
                className="bg-slate-900 text-slate-100 border p-3.5 rounded-xl mb-4 text-base"
              />

              <Text className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Time
              </Text>
              <TextInput
                value={editStartTime}
                onChangeText={setEditStartTime}
                placeholder="12:10"
                placeholderTextColor="#64748b"
                className="bg-slate-900 text-slate-100 border p-3.5 rounded-xl mb-4 text-base"
              />
              <TextInput
                value={editEndTime}
                onChangeText={setEditEndTime}
                placeholder="12:10"
                placeholderTextColor="#64748b"
                className="bg-slate-900 text-slate-100 border p-3.5 rounded-xl mb-4 text-base"
              />

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
                className="bg-slate-900 text-slate-100 border p-3.5 rounded-xl mb-6 text-base h-24 textAlignVertical-top"
              />

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 bg-slate-800 border border-slate-700 p-4 rounded-xl items-center mx-2"
                >
                  <Text className="text-slate-300 font-semibold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveTask}
                  className="flex-1 bg-blue-600 p-4 rounded-xl items-center mx-2"
                >
                  <Text className="text-white font-semibold">Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

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
