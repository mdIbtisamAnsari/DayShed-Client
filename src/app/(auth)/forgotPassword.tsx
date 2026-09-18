import { View, Text, KeyboardAvoidingView, Image, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getOtp, submitNewPasswordWithOtp } from "../../services/authApi"
import axios from 'axios';
import { useRouter } from "expo-router";


export default function forgotPassword() {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string>('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setContirmNewPassword] = useState('')

  const [sentOtp, setSentOtp] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)


  const router = useRouter();

  const handleGetOtp = async () => {
    try {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      const response = await getOtp(email);
      setSentOtp(true);
      console.log(response);
    } catch (error) {
      console.error(error);
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred while requesting OTP. Please try again."
      setError(message);
    }
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async () => {
    try {
      if (!otp || !newPassword || !confirmNewPassword) {
        setError('Please fill in all fields.');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError('Passwords do not match.');
        return;
      }
      const response = await submitNewPasswordWithOtp(otp, email, newPassword);
      console.log(response);
      router.replace('/(root)/(tabs)/home');

    } catch (error) {
      console.error(error);
      const message = axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred while requesting OTP. Please try again."
      setError(message);
    }
  }

  useEffect(() => {
    setError("")
  }, [email, otp, newPassword, confirmNewPassword])

  return (
    <KeyboardAvoidingView className="flex-1" behavior='padding'>
      <ScrollView className="flex-1">
        <View className="flex-1 m-4 mt-8" >

        <View className="flex">
          <Text className="text-5xl font-bold text-slate-50">DayShed -</Text>
          <Text className="text-4xl font-bold text-slate-50 mt-3">Forgot Password ?</Text>
        </View>

        <Text className='text-gray-100 text-xl mt-5'></Text>
        {error ? <Text className='text-red-500'>{error}</Text> : null}
        {!sentOtp && (
          <View className=''>
            <Text className='text-gray-100 text-xl'>Enter Your Registered Email</Text>

            <View className='mt-2'>
              <TextInput
                className='
                bg-[#434D56]
                rounded-xl
                border-2
                border-[#434D56]
                px-3
                text-lg
                focus:border-blue-800/80
                text-white'
                placeholder='Enter Your Email'
                placeholderTextColor="#C1C1C1"
                autoComplete='email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <Pressable
                className='bg-blue-500 rounded-full py-2 mt-10'
                onPress={handleGetOtp}
              >
                <Text className='text-gray-100 text-2xl text-center font-semibold'>Get OTP</Text>
              </Pressable>
            </View>
          </View>
        )}

        {sentOtp && (
          <View className='mt-4 px-4 py-2 rounded-lg'>
            <Text className='text-green-500 mt-3'>OTP sent successfully!</Text>
            <View className='flex-row justify-between mt-3'>
              <Text className='text-gray-100 text-xl'>Enter OTP</Text>
              <Pressable className='text-blue-500 font-semibold' onPress={() => setSentOtp(false)}>
                <Text className='text-blue-500 font-semibold'>Change Email</Text>
              </Pressable>
            </View>
            <TextInput
              className='
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              text-white mb-3'
              placeholder='Enter OTP'
              value={otp}
              maxLength={6}
              onChangeText={setOtp}
              keyboardType='number-pad'
            />
            <View className='flex-row justify-between'>
              <Text className='text-gray-100 text-xl'>New Password</Text>
              <Pressable onPress={handleShowPassword}>
                {!isPasswordVisible && <Text className='mt-2 font-semibold text-blue-500'>Show Password</Text>}
                {isPasswordVisible && <Text className='mt-2 font-semibold text-blue-500'>Hide Password</Text>}
              </Pressable>
            </View>
            <TextInput
              className='
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              text-white mb-3'
              placeholder='Enter New Password'
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize='none'
            />
            <Text className='text-gray-100 text-xl'>Confirm New Password</Text>
            <TextInput
              className='
              bg-[#434D56]
              rounded-xl
              border-2
              border-[#434D56]
              px-3
              text-lg
              focus:border-blue-800/80
              text-white mb-3'
              placeholder='Confirm New Password'
              value={confirmNewPassword}
              onChangeText={setContirmNewPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize='none'
            />

            <Pressable className='bg-blue-500 rounded-full py-2 mt-10' onPress={handleSubmit}>
              <Text className='text-gray-100 text-2xl text-center font-semibold'>Submit</Text>
            </Pressable>

          </View>)}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

