import { Slot } from 'expo-router'
import React from 'react'
import { ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function AuthLayout() {
  return (
  <ImageBackground
    source={require('../../../../assets/backgrounds/bg.png')}
    resizeMode="cover"
    style={{ flex: 1 }}
    >
    <SafeAreaView className='flex-1'>
        <Slot/>
      </SafeAreaView>
    </ImageBackground>
    
  )
}