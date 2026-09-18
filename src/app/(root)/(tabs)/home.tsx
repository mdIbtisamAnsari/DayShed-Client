import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function home() {
  const dateva = new Date()
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  useEffect(() => {
    switch (dateva.getDay()) {
      case 0:
        setDay('Sunday')
        break;
      case 1:
        setDay('Monday') 
        break;
      case 2:
        setDay('Tuesday')
        break;
      case 3:
        setDay('Wednesday')
        break;
      case 4:
        setDay('Thursday')
        break;
      case 5:
        setDay('Friday')
        break;
      case 6:
        setDay('Saturday')
        break;
    }
    switch (dateva.getMonth()) {
      case 0:
        setMonth('January')
        break;
      case 1:
        setMonth('February')
        break;
      case 2:
        setMonth('March')
        break;
      case 3:
        setMonth('April')
        break;
      case 4:
        setMonth('May')
        break;
      case 5:
        setMonth('June')
        break;
      case 6:
        setMonth('July')
        break;
      case 7:
        setMonth('August')
        break;
      case 8:
        setMonth('September')
        break;
      case 9:
        setMonth('October')
        break;
      case 10:
        setMonth('November')
        break;
      case 11:
        setMonth('December')
        break;
    }
    
    setDate(`${dateva.getSeconds()}`)
    },[dateva.getSeconds()])
  return (
      <SafeAreaView className='flex-1 bg-transparent'>
        <View className='flex-1 py-4 px-4'>
          <Text className='text-white text-2xl font-bold'>
            DayDhed
        </Text>
        <Text className='text-white text-lg'>
          {day} {month} {date}
        </Text>
        </View>
      </SafeAreaView>

  )
}
