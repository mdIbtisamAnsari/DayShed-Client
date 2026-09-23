import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Keyboard,
  Alert,
  ActivityIndicator,
  Text
} from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { Ionicons } from "@expo/vector-icons";
import { callSendPromptApi } from "@/services/localApi";
import axios from "axios";

export default function VoiceInputScreen() {
  const [transcript, setTranscript] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [inputText, SetInputText] = useState("");
  const [isManualTextWriting, setIsManualTextWriting] = useState(false);
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const submitPrompt = async (textToSubmit: string) => {
    if (!textToSubmit.trim() || isSubmitting) return;
    setIsSubmitting(true);
    inputRef.current?.blur();
    Keyboard.dismiss();
    try {
      const data: string = await callSendPromptApi(textToSubmit);
      SetInputText("");
      setIsManualTextWriting(false);
      setError(null);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "An error occurred during registration. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    if (inputText == "") setIsManualTextWriting(false);
  }, [inputText]);

  const inputRef = useRef<TextInput>(null);
  const bar1 = useRef(new Animated.Value(4)).current;
  const bar2 = useRef(new Animated.Value(4)).current;
  const bar3 = useRef(new Animated.Value(4)).current;

  useSpeechRecognitionEvent("result", (event) => {
    const recognizedText = event.results[0]?.transcript || "";

    setTranscript(transcript + recognizedText);
  });

  useSpeechRecognitionEvent("start", () => setIsRecognizing(true));
  useSpeechRecognitionEvent("end", () => {
    const final = inputText + (inputText ? " " : "") + transcript;
    SetInputText(final);
    setTranscript("");
    setIsRecognizing(false);
    setEnableKeyboard(true);
    if (final.trim()) {
      submitPrompt(final);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    setIsRecognizing(false);
    setTranscript("");
    setEnableKeyboard(true);
  });

  useEffect(() => {
    let animationLoop: Animated.CompositeAnimation;

    if (isRecognizing) {
      const animate = () => {
        const createTiming = (anim: Animated.Value) =>
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 15 + 8,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 4,
              duration: 250,
              useNativeDriver: false,
            }),
          ]);

        animationLoop = Animated.parallel([
          createTiming(bar1),
          Animated.sequence([Animated.delay(100), createTiming(bar2)]),
          Animated.sequence([Animated.delay(200), createTiming(bar3)]),
        ]);

        animationLoop.start(({ finished }) => {
          if (finished && isRecognizing) animate();
        });
      };

      animate();
    } else {
      Animated.parallel([
        Animated.timing(bar1, {
          toValue: 4,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bar2, {
          toValue: 4,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bar3, {
          toValue: 4,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }

    return () => {
      if (animationLoop) animationLoop.stop();
    };
  }, [isRecognizing, bar1, bar2, bar3]);

  const handleToggleListening = async () => {
    setEnableKeyboard(false);
    if (isRecognizing) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      Alert.alert(
        "Permission Required",
        "Microphone access is needed to use voice typing. Please enable it in your settings.",
      );
      return;
    }

    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      continuous: true,
    });
  };

  const handelSendPrompt = () => {
    submitPrompt(inputText);
  };

  return (
    <>
    <View className="flex-row items-center bg-white/10 rounded-2xl px-3 py-1 mx-4 my-2">
      <View className="flex-1 flex-row items-center mr-2">
        <TextInput
          ref={inputRef}
          value={
            inputText + (isRecognizing && transcript ? " " + transcript : "")
          }
          onChangeText={(text) => {
            SetInputText(text);
            setError(null);
          }}
          onKeyPress={() => setIsManualTextWriting(true)}
          placeholder="What's on your mind?"
          className="flex-1 text-white text-base font-normal"
          placeholderTextColor="#9CA3AF"
          showSoftInputOnFocus={enableKeyboard}
          readOnly={!enableKeyboard || isSubmitting}
          onSubmitEditing={() => {
            submitPrompt(inputText);
          }}
        />

        {isRecognizing && (
          <View className="flex-row items-center space-x-1 ml-2 h-6">
            <Animated.View
              style={{
                height: bar1,
                width: 4,
                backgroundColor: "#E5E7EB",
                borderRadius: 2,
              }}
            />
            <Animated.View
              style={{
                height: bar2,
                width: 4,
                backgroundColor: "#E5E7EB",
                borderRadius: 2,
              }}
            />
            <Animated.View
              style={{
                height: bar3,
                width: 4,
                backgroundColor: "#E5E7EB",
                borderRadius: 2,
              }}
            />
          </View>
        )}
      </View>
      {isSubmitting ? (
        <View className="bg-white/20 rounded-full p-2 ml-2 w-10 h-10 items-center justify-center">
          <ActivityIndicator color="#E5E7EB" />
        </View>
      ) : isManualTextWriting ? (
        <TouchableOpacity 
          className="bg-white/20 rounded-full p-2 ml-2 w-10 h-10 items-center justify-center" 
          onPress={handelSendPrompt}
        >
          <Ionicons name="send" size={18} color="#E5E7EB" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          className="bg-white/20 rounded-full p-2 ml-2 w-10 h-10 items-center justify-center" 
          onPress={handleToggleListening}
        >
          {isRecognizing ? (
            <Ionicons name="stop" size={20} color="#E5E7EB" />
          ) : (
            <Ionicons name="mic" size={20} color="#E5E7EB" />
          )}
        </TouchableOpacity>
      )}
      </View>
      {error ? <Text className="text-red-400 mx-5 mt-1 text-sm">{error || "Something went wrong"}</Text> : null}
    </>
  );
}
