import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import MultipleResponseQuestion from '@/components/questions/MultipleResponseQuestion'

const options = [
  { option: "s", selected: false },
  { option: "p", selected: false },
  { option: "d", selected: false },
  { option: "f", selected: false }
]

const answer = ["s"]
const question = "Which orbitals are shown above?"

const Page3 = () => {
  return (
    <SafeAreaView className='h-full bg-white'>
      <MultipleResponseQuestion
        options={options}
        answer={answer}
        question={question}
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/page4'
      />
    </SafeAreaView>
  )
}

export default Page3