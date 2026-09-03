import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { submitOtpAndRegisterUser, resendOtp } from "../../services/authApi"
import axios from 'axios'


export default function otp() {

    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const router = useRouter();

    const { email, name, password } = useLocalSearchParams<{
        email: string;
        name: string;
        password: string;
    }>();

    const handleSubmitOtpAndRegisterUser = async () => {
        try {
            await submitOtpAndRegisterUser(name, email, password, otp)
                .then(() => {
                    router.push('/(root)/(tabs)/home')
                })
        } catch (error) {
            const message = axios.isAxiosError(error) ? error.response?.data?.message : "An error occurred during registration. Please try again.";
            setError(message);
        }
    }


    const handlepushToSignUp = () => {
        router.push({
            pathname: '/(auth)/signup',
            params: { email, name, password }
        });
    }


    return (
        <KeyboardAvoidingView className="flex-1 bg-slate-200" behavior='padding'>

            <View className="flex-1 m-4 justify-center" >
                <View className='flex-row items-center'>
                    <Image
                        source={require('../../../assets/icon.png')}
                        className="w-16 h-16"
                    />

                    <Text className='text-4xl font-bold text-blue-500'>DayShed</Text>
                </View>
                <View className='mt-4 bg-gray-100 px-4 py-7 rounded-lg'>
                {error ? <Text className='text-red-500 mt-3'>{error}</Text> : null}
                <Text className='text-gray-700 mt-3' >Enter the OTP sent to your email</Text>
                <TextInput
                    className='border border-gray-300 rounded-md p-2 mt-1'
                    placeholder='Enter OTP'
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType='number-pad'
                />

                <View className='flex-row justify-between mt-3'>
                    <Pressable className='text-blue-500 font-semibold' onPress={() => resendOtp(email)}>
                        <Text className='text-blue-500 font-semibold'>Resend OTP</Text>
                    </Pressable>
                    <Pressable className='text-gray-700' onPress={handlepushToSignUp}>
                        <Text className='text-blue-500 font-semibold' >Change Email</Text>
                    </Pressable>
                </View>
                <Pressable className='bg-blue-500 rounded-md p-2 mt-7' onPress={handleSubmitOtpAndRegisterUser}>
                    <Text className='text-white text-center font-semibold'>Submit</Text>
                </Pressable>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}