import { Image, View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AnswerVerification from '@/components/questions/AnswerVerification'
import CustomButton from '../../CustomButton'
import { router } from 'expo-router'

const FillInTheBlankQuestion = ({
  options,
  questionWithBlanks,
  answer,
  nextPageUrl,
  imageSrc
} : {
  options: string[],
  questionWithBlanks: { text: string, index: number }[],
  answer: string[],
  nextPageUrl: string,
  imageSrc?: ImageSourcePropType
}) => {
  const [remainingOptions, setRemainingOptions] = useState(options)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])

  const checkAnswer = () => {
    const arr = selectedAnswer.filter((selection, index) => selection == answer[index])
    return arr.length == answer.length
  }

  return (
    <View className='bg-white p-3'>
      {imageSrc && 
        <Image
          source={imageSrc}
          className='self-center w-[350px]'
          resizeMode='contain'
        />
      }
      <View className='flex-row flex-wrap items-center justify-center p-10 gap-y-4'>
        {questionWithBlanks.map((text, index) => (
          text.index == -1 
            ? <Text key={index} className='text-base'> {text.text}</Text>
            : text.index < selectedAnswer.length 
              ? <View key={index} className='flex-row items-center'>
                  <Text className='text-base'>{text.text}</Text>
                  <CustomButton
                    title={selectedAnswer[text.index]}
                    type='answer'
                    textVariant='answer'
                    onPress={() => {
                      setSelectedAnswer(
                        selectedAnswer.filter(selection => selection != selectedAnswer[text.index])
                      )
                      setRemainingOptions([
                        ...remainingOptions,
                        selectedAnswer[text.index]
                      ])
                    }}
                  />
                </View>
              : index == questionWithBlanks.length - 1
                ? <Text key={index} className='text-base'>{text.text}</Text>
                : <Text key={index} className='text-base'>{text.text} ________</Text>
        ))}
      </View>
      <View className='px-10 flex-row flex-wrap gap-x-6 gap-y-4 justify-center'>
        {remainingOptions.map((option, index) => (
          <CustomButton
            key={index}
            title={option}
            type='answer'
            textVariant='answer'
            onPress={() => {
              setSelectedAnswer([
                ...selectedAnswer,
                option
              ]);
              setRemainingOptions(
                remainingOptions.filter(remaining => remaining != option)
              )
            }}
          />
        ))}
      </View>
      {selectedAnswer.length == answer.length && 
        (checkAnswer() ?
          <AnswerVerification 
            correctAnswer={true}
            message='Yay! you are correct'
            onPress={() => {
              setSelectedAnswer([]);
              //@ts-ignore
              router.push(nextPageUrl)
            }}
          />
          :
          <AnswerVerification 
            correctAnswer={false}
            message='Please try again!'
            onPress={() => {
              setSelectedAnswer([]);
              setRemainingOptions(options)
            }}
          />
        )
      }
    </View>
  )
}

export default FillInTheBlankQuestion