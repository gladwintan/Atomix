import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import FillInTheBlankQuestion from '@/components/questions/FillInTheBlankQuestion'

const options = ["group", "period", "decreases", "increases"]
const question = [
  { text: "Down the", index: 0 },
  { text: ",", index: -1 },
  { text: "size of atomic orbital", index: 1 },
  { text: ".", index: -1 },
  { text: "Across the", index: 2 },
  { text: ",", index: -1 },
  { text: "size of atomic orbital", index: 3 },
  { text: ".", index: -1 }
]

const answer = ["group", "increases", "period", "decreases"]

const Page2 = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <FillInTheBlankQuestion
        options={options}
        questionWithBlanks={question}
        answer={answer}
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/page3'
      />
    </SafeAreaView>
  )
}

export default Page2