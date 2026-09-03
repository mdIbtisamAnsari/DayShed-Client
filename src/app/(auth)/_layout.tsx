import { Slot } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../../../global.css"

export default function AuthLayout() {
    return (
        <SafeAreaView className="flex-1 bg-slate-200">
            <Slot />
        </SafeAreaView>
    )
}