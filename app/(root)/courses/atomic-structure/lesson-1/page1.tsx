import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { atomicStructureImages } from '@/constants'
import AnswerVerification from '@/components/AnswerVerification'

const Page1 = () => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [answered, setAnswered] = useState(false)

  return (
    <SafeAreaView className='h-full bg-white'>
      <View className='bg-white'>
        <Image
          source={atomicStructureImages.dOrbitals}
          className='self-center w-[350px]'
          resizeMode='contain'
        />
        <Text className='text-center text-base px-10'>
          The above shows the correct orientation of d-orbitals
        </Text>

        <View className='bg-white flex-row justify-center space-x-5 mt-8'>
          <CustomButton
            title='True'
            type='boolean'
            textVariant='boolean'
            onPress={() => {
              setIsCorrectAnswer(true)
              setAnswered(true)
            }}
          />
          <CustomButton
            title='False'
            type='boolean'
            textVariant='boolean'
            onPress={() => {
              setIsCorrectAnswer(false)
              setAnswered(true)
            }}
          />
        </View>
      </View>
      {answered && 
        (isCorrectAnswer ?
          <AnswerVerification 
            correctAnswer={isCorrectAnswer}
            message='Yay! you are correct'
            nextPageUrl='/(root)/courses/atomic-structure/lesson-1/page2'
            setAnswered={setAnswered}
          />
          :
          <AnswerVerification 
            correctAnswer={isCorrectAnswer}
            message='Please try again!'
            setAnswered={setAnswered}
          />
        )
      }
    </SafeAreaView>
  )
}

export default Page1