import { View, Text, Image, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import axios from 'axios'
import { loginUser } from "../../services/authApi"
import { useRouter } from "expo-router";


export default function signin() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    try {
      if(!email || !password) {
        setError("Email and Password are required");
        return;
      }
      await loginUser(email, password)
        .then(() => {
          router.push('/(root)/(tabs)/home')
        })
    } catch (err) {
      console.error('Sign-in error:', err)

      const message = axios.isAxiosError(err) ? err.response?.data?.message : "An error occurred during sign-in. Please try again."
      
      setError(message);
    }
  }



  return (
    <KeyboardAvoidingView className="flex-1" behavior='padding'>
      <View className="flex-1 m-4 justify-center">
        <View className='flex-row items-center'>
          <Image
            source={require('../../../assets/icon.png')}
            className="w-16 h-16"
          />

          <Text className='text-4xl font-bold text-blue-500'>DayShed</Text>
        </View>
        <Text className='text-gray-700 mx-2'>Sign in to your account</Text>
        <View className='mt-4 bg-gray-100 px-4 py-7 rounded-lg'>
          {error ? <Text className='text-red-500'>{error}</Text> : null}
          <Text className='text-gray-700 font-semibold'>Email</Text>
          <TextInput
            className='border border-gray-300 rounded-md p-2 mt-1'
            placeholder='Enter Your Email'
            autoComplete='email'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <View className='flex-row justify-between mt-5'>
          <Text className='text-gray-700 font-semibold'>Password</Text>
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Text className='text-blue-500 font-semibold'>
              {isPasswordVisible ? 'Hide Password' : 'Show Password'}
            </Text>
          </Pressable>
          </View>

          <TextInput
            className='border border-gray-300 rounded-md p-2 mt-1'
            placeholder='Enter Your Password'
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
          />
          <Pressable className="items-end mt-2" onPress={() => router.push('/(auth)/forgotPassword')}>
            <Text className='text-blue-500 font-semibold'>Forgot Password?</Text>
          </Pressable>
          <Pressable className='bg-blue-500 rounded-md p-2 mt-7' onPress={handleSignIn}>
            <Text className='text-white text-center font-semibold'>Sign In</Text>
          </Pressable>
        </View>
        <View className='flex-row justify-center mt-4'>
          <Text className='text-gray-700'>Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text className='text-blue-500 font-semibold'>Sign Up</Text> 
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}