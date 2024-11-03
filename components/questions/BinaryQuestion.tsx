import { View, Text, SafeAreaView, Image, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Href, router } from 'expo-router'
import { atomicStructureImages } from '@/constants'
import AnswerVerification from '@/components/questions/AnswerVerification'

const BinaryQuestion = ({
  nextPageUrl,
  question,
  answer,
  imageSrc
} : {
  nextPageUrl: string,
  question: string,
  answer: boolean,
  imageSrc?: ImageSourcePropType,
}) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [answered, setAnswered] = useState(false)

  return (
    <View className='bg-white p-2'>
      <View>
        {imageSrc && 
          <Image
            source={imageSrc}
            className='self-center w-[320px] h-[280px]'
            resizeMode='contain'
          />
        }
        <Text className='text-center text-base font-medium px-10 mt-8'>
          {question}
        </Text>

        <View className='bg-white flex-row justify-center space-x-5 mt-6'>
          <CustomButton
            title='True'
            type='boolean'
            textVariant='boolean'
            onPress={() => {
              setIsCorrectAnswer(answer)
              setAnswered(true)
            }}
          />
          <CustomButton
            title='False'
            type='boolean'
            textVariant='boolean'
            onPress={() => {
              setIsCorrectAnswer(!answer)
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
            onPress={() => {
              setAnswered(false);
              //@ts-ignore
              router.push(nextPageUrl)
            }}
          />
          :
          <AnswerVerification 
            correctAnswer={isCorrectAnswer}
            message='Please try again!'
            onPress={() => {
              setAnswered(false);
            }}
          />
        )
      }
    </View>
  )
}

export default BinaryQuestion