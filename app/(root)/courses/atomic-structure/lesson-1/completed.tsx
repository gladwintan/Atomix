import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { updateCourseProgress } from '@/lib/utils'

const CompletedPage = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  return (
    <SafeAreaView className='h-full bg-white'>
      <CustomButton
        title='return to course page'
        onPress={() => {
          updateCourseProgress("Atomic Structure", 1, userClerkId)
          router.replace('/(root)/courses/atomic-structure')
        }}
      />
    </SafeAreaView>
  )
}

export default CompletedPage