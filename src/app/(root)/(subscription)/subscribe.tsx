import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Sample To-Do Data structured by days
const INITIAL_DAYS_DATA = [
  {
    id: '1',
    day: 'Monday',
    date: 'Oct 12',
    tasks: [
      { id: 't1', title: 'Team Sync Meeting', completed: true },
      { id: 't2', title: 'Review PR #204', completed: false },
      { id: 't3', title: 'Design System Update', completed: false },
      { id: 't4', title: 'Design Update', completed: false },
    ],
  },
  {
    id: '2',
    day: 'Tuesday',
    date: 'Oct 13',
    tasks: [
      { id: 't4', title: 'Client Presentation', completed: false },
      { id: 't5', title: 'Database Optimization', completed: false },
    ],
  },
  {
    id: '3',
    day: 'Wednesday',
    date: 'Oct 14',
    tasks: [
      { id: 't6', title: 'Sprint Planning', completed: false },
      { id: 't7', title: 'Update Documentation', completed: true },
      { id: 't8', title: 'User Testing', completed: false },
    ],
  },
  {
    id: '4',
    day: 'Thursday',
    date: 'Oct 15',
    tasks: [
      { id: 't9', title: 'Refactor Auth Flow', completed: false },
    ],
  },
  {
    id: '5',
    day: 'Friday',
    date: 'Oct 16',
    tasks: [
      { id: 't10', title: 'Deploy to Staging', completed: false },
      { id: 't11', title: 'Weekly Retrospective', completed: false },
    ],
  },
];

export default function DayTaskTable() {
  const [data, setData] = useState(INITIAL_DAYS_DATA);

  // Toggle task completion status
  const toggleTask = (dayId, taskId) => {
    setData((prevData) =>
      prevData.map((dayItem) => {
        if (dayItem.id === dayId) {
          return {
            ...dayItem,
            tasks: dayItem.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          };
        }
        return dayItem;
      })
    );
  };

  // Render a single Day Column
  const renderDayColumn = ({ item: dayItem }) => (
    <View style={styles.column}>
      {/* Column Header */}
      <View style={styles.columnHeader}>
        <Text style={styles.dayText}>{dayItem.day}</Text>
        <Text style={styles.dateText}>{dayItem.date}</Text>
      </View>

      {/* Column Tasks */}
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}
      >
        {dayItem.tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={[
              styles.taskCard,
              task.completed && styles.taskCardCompleted,
            ]}
            onPress={() => toggleTask(dayItem.id, task.id)}
            activeOpacity={0.7}
          >
            <View style={styles.checkbox}>
              <Text style={styles.checkboxText}>
                {task.completed ? '✓' : ''}
              </Text>
            </View>
            <Text
              style={[
                styles.taskTitle,
                task.completed && styles.taskTitleCompleted,
              ]}
            >
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weekly Task Sheet</Text>

      {/* Horizontal List of Days */}
      <FlatList
        data={data}
        renderItem={renderDayColumn}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={280 + 12} // Column width + margin
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  column: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Shadow for iOS/Android
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  columnHeader: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
  },
  dateText: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  tasksContainer: {
    maxHeight: 400,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  taskCardCompleted: {
    backgroundColor: '#EDF2F7',
    borderColor: '#CBD5E0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#4A5568',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#319795',
  },
  taskTitle: {
    fontSize: 14,
    color: '#2D3748',
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
  },
});