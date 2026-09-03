import React from 'react'
import { Slot } from 'expo-router'
import { LoadingProvider } from '../context/LoadingContext';


export default function RootLayout() {
  return (
    <LoadingProvider>
      <Slot />
    </LoadingProvider>
  )
}

