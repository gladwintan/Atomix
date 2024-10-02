import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { updateCourseProgress } from '@/lib/utils'
import { useUser } from '@clerk/clerk-expo'
import BinaryQuestion from '@/components/BinaryQuestion'
import { atomicStructureImages } from '@/constants'

const Page4 = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  return (
    <SafeAreaView className='h-full bg-white'>
      <BinaryQuestion
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/completed'
        imageSrc={atomicStructureImages.dOrbitals}
        question='The above is correct'
        answer={true}
      />
    </SafeAreaView>
  )
}

export default Page4