import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const Page3 = () => {
  return (
    <SafeAreaView>
      <Text>page3</Text>
      <CustomButton
        title='next'
        onPress={() => router.replace('/(root)/courses/atomic-structure/lesson-1/page4')}
      />
    </SafeAreaView>
  )
}

export default Page3