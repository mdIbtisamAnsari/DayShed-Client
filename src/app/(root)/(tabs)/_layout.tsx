import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {

  return (
    <SafeAreaView>
      <Slot/>
    </SafeAreaView>
  )
}