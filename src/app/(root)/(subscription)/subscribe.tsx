import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

export default function VoiceInputScreen() {
  const [transcript, setTranscript] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Listen for speech recognition results
  useSpeechRecognitionEvent('result', (event) => {
    const recognizedText = event.results[0]?.transcript || '';
    setTranscript(recognizedText);
  });

  // Listen for state changes (start/end)
  useSpeechRecognitionEvent('start', () => setIsRecognizing(true));
  useSpeechRecognitionEvent('end', () => setIsRecognizing(false));

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
      lang: 'en-US',
      interimResults: true, // Show live text as you speak
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Input Demo</Text>
      
      <View style={styles.resultBox}>
        <Text style={styles.transcriptText}>
          {transcript || 'Press the button and speak...'}
        </Text>
      </View>

      <Button
        title={isRecognizing ? 'Stop Listening' : 'Start Listening'}
        onPress={handleToggleListening}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  resultBox: { padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 20, minHeight: 100 },
  transcriptText: { fontSize: 16, color: '#333' },
});