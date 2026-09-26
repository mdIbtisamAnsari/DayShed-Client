import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChartKitProvider, createChartPreset, LineChart } from "react-native-chart-kit/v2";

interface task {
  id: string;
  title: string;
  time: string;
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
  { date: "04-01", productivity: 0.5 },
  { date: "05-01", productivity: 0.55 },
  { date: "06-01", productivity: 0.55 },
  { date: "07-01", productivity: 0.25 },
];

const INITIAL_DAYS_DATA: dayData[] = [
  {
    id: '1',
    date: 'Oct 12',
    tasks: [
      { id: 't1', title: 'Team Sync Meeting', time: '12:10' },
      { id: 't2', title: 'Review PR #204', time: '12:15' },
      { id: 't3', title: 'Design System Update', time: '12:30' },
      { id: 't4', title: 'Design Update', time: '12:50' },
    ],
  },
  {
    id: '2',
    date: 'Oct 13',
    tasks: [
      { id: 't4', title: 'Client Presentation', time: '12:10' },
      { id: 't5', title: 'Database Optimization', time: '12:10' },
    ],
  },
  {
    id: '3',
    date: 'Oct 14',
    tasks: [
      { id: 't6', title: 'Sprint Planning', time: '12:10'},
      { id: 't7', title: 'Update Documentation', time: '12:10' },
      { id: 't8', title: 'User Testing', time: '12:10' },
    ],
  },
  {
    id: '4',
    date: 'Oct 15',
    tasks: [
      { id: 't9', title: 'Refactor Auth Flow', time: '12:10' },
    ],
  },
  {
    id: '5',
    date: 'Oct 16',
    tasks: [
      { id: 't10', title: 'Deploy to Staging', time: '12:10' },
      { id: 't11', title: 'Weekly Retrospective', time: '12:10' },
    ],
  },
];


export default function Insights() {
  const [data, setData] = useState(INITIAL_DAYS_DATA);

  const renderDayColumn = ({ item: dayItem }:{item :dayData}) => (
    <View className='bg-slate-500 mx-3'>
      <View>
        <Text >{dayItem.date}</Text>
      </View>

      {/* Column Tasks */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {dayItem.tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            activeOpacity={0.7}
          >
            <Text>
              {task.time}
            </Text>
            <Text>
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );


  
  return (
    <SafeAreaView className='flex-1'>
      <View className='px-4 pt-5'>
        <Text className='text-3xl font-bold text-gray-200 mb-5'>Insights</Text>
        <ChartKitProvider mode="dark" preset="acme" presets={{acme}}>
          <LineChart
            data={datap}
            xKey="date"
            yKey="productivity"
            width={320}
            height={180}
            curve="monotone"
            areaFill={{ fromOpacity: 0.09, toOpacity: 0.05 }}
            area
          />
        </ChartKitProvider>
      </View>
      <View className='px-4'>
        <Text className='text-2xl font-bold text-gray-200 my-5'>Upcoming Schedule</Text>
        <FlatList
          data={data}
          renderItem={renderDayColumn}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={280 + 12} // Column width + margin
          decelerationRate="fast"
        />
      </View>
    </SafeAreaView>
  )
}

const acme = createChartPreset({
  light: {
    background: "#ffffff",
    grid: "#e5edf7",
    series: ["#155eef", "#12b76a"]
  },
  dark: {
    background: "#07111f",
    plotBackground: "#0b1627cc",
    grid: "#1d3554cc",
    series: ["#60a5fa", "#34d399"]
  }
});