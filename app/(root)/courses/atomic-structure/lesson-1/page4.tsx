import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
const Page4 = () => {
  return (
    <SafeAreaView>
      <Text>page4</Text>
      <CustomButton
        title='next'
        onPress={() => router.push('/(root)/courses/atomic-structure/lesson-1/page1')}
      />
    </SafeAreaView>
  )
}

export default Page4