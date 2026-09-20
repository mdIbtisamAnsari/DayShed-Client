import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { Ionicons } from '@expo/vector-icons';


export default function VoiceInputScreen() {
  const [transcript, setTranscript] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [inputText, SetInputText] = useState('')

  // Listen for speech recognition results
  useSpeechRecognitionEvent('result', (event) => {
    const recognizedText = event.results[0]?.transcript || '';
    setTranscript(recognizedText);
  });

  // Listen for state changes (start/end)
  useSpeechRecognitionEvent('start', () => setIsRecognizing(true));
  useSpeechRecognitionEvent('end', () => {
    transcript? SetInputText(inputText+" ") : null 
    SetInputText(inputText + transcript)
    setTranscript('')
    setIsRecognizing(false)
  });

  const handleToggleListening = async () => {
    if (isRecognizing) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    // Request permissions before starting
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      alert('Microphone/Speech permission is required.');
      return;
    }

    // Start recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true, // Show live text as you speak
    });
  };

  return (
    <View className='flex-row items-center'>
      <View className='flex-1'>
        <TextInput value={inputText} onChangeText={(text)=>SetInputText(text)} placeholder="What's on your mind? or tap microphone" className='text-gray-200' placeholderTextColor="gray"></TextInput>
      </View>

      <TouchableOpacity
        className='bg-[#6338ca]'
        onPress={handleToggleListening}
      >
        <Ionicons name="mic-circle" size={28} color="#5c24e6"></Ionicons>
      </TouchableOpacity>
      
    </View>
  );
}


