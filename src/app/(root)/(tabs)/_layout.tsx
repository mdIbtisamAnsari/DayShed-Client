import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
  <ImageBackground
    source={require('../../../../assets/backgrounds/bg.png')}
    resizeMode="cover"
    style={{ flex: 1 }}
  >

    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
        tabBarActiveTintColor: '#0F172A',
        tabBarInactiveTintColor: '#64748B',
        tabBarActiveBackgroundColor: "transparent",
        
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom + 16,
          
          height: 64,
          borderRadius: 32,
          backgroundColor: '#E2E8F0',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#0000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          paddingHorizontal: 8,
          marginHorizontal: 20,
          
        },
        tabBarItemStyle: {
          height: 50,
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      {/* 1. Home Screen (replaces stream) */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Stream',
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center justify-center">
              <Ionicons
                name={focused ? 'reader' : 'reader-outline'}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* 2. Inbox Screen */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center justify-center">
              <Ionicons
                name={focused ? 'mail' : 'mail-outline'}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />

      {/* 3. Insights Screen */}
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, focused }) => (
            <View className="relative items-center justify-center">
              <Ionicons
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      </Tabs>
  </ImageBackground>
  );
}