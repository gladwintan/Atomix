import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { updateCourseProgress } from '@/lib/utils'
import { useUser } from '@clerk/clerk-expo'

const Page4 = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  return (
    <SafeAreaView>
      <Text>page4</Text>
      <CustomButton
        title='next'
        onPress={() => {
          updateCourseProgress("Atomic Structure", 1, userClerkId)
          router.replace('/(root)/courses/atomic-structure')
        }}
      />
    </SafeAreaView>
  )
}

export default Page4