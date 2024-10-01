import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const Page2 = () => {
  return (
    <SafeAreaView>
      <Text>page2</Text>
      <CustomButton
        title='next'
        onPress={() => router.push('/(root)/courses/atomic-structure/lesson-1/page3')}
      />
    </SafeAreaView>
  )
}

export default Page2