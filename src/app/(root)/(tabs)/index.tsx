import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function home() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/home">
        <Text>Go to About</Text>
      </Link>
    </View>
  )
}