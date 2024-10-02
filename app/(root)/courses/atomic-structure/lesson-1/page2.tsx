import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import FillInTheBlankQuestion from '@/components/FillInTheBlankQuestion'

const Page2 = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <FillInTheBlankQuestion
        options={["group", "period", "decreases", "increases"]}
        questionWithBlanks={["Down the", ", size of atomic orbital", "."]}
        answer={["group", "increases"]}
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/page3'
      />
    </SafeAreaView>
  )
}

export default Page2