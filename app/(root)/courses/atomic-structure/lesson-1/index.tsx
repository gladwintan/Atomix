import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const Lesson1 = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <Text>Lesson 1</Text>
      <CustomButton
        title='next'
        onPress={() => router.push('/(root)/courses/atomic-structure/lesson-1/page1')}
      />
    </SafeAreaView>
  )
}

export default Lesson1