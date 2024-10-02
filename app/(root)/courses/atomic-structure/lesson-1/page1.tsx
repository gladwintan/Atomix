import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { atomicStructureImages } from '@/constants'
import BinaryQuestion from '@/components/BinaryQuestion'

const Page1 = () => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [answered, setAnswered] = useState(false)

  return (
    <SafeAreaView className='h-full bg-white'>
      <BinaryQuestion
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/page2'
        imageSrc={atomicStructureImages.dOrbitals}
        question='The above is correct'
        answer={true}
      />
    </SafeAreaView>
  )
}

export default Page1