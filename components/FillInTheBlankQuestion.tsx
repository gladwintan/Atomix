import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AnswerVerification from './AnswerVerification'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const FillInTheBlankQuestion = ({
  options,
  questionWithBlanks,
  answer,
  nextPageUrl
} : {
  options: string[],
  questionWithBlanks: string[],
  answer: string[],
  nextPageUrl: string
}) => {
  const [remainingOptions, setRemainingOptions] = useState(options)
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])

  const formattedQuestion = questionWithBlanks.join(" ________ ")

  const checkAnswer = () => {
    const arr = selectedAnswer.filter(selection => answer.includes(selection))
    return arr.length == answer.length
  }

  return (
    <View>
      <View className='flex-row flex-wrap justify-center p-10 space-y-4'>
        {questionWithBlanks.map((text, index) => (
          index < selectedAnswer.length ?
            <View key={index} className='flex-row items-center'>
              <Text className='text-base'>{text}</Text>
              <CustomButton
                title={selectedAnswer[index]}
                type='answer'
                textVariant='answer'
                onPress={() => {
                  setSelectedAnswer(
                    selectedAnswer.filter(selection => selection != selectedAnswer[index])
                  )
                  setRemainingOptions([
                    ...remainingOptions,
                    selectedAnswer[index]
                  ])
                }}
              />
            </View>
            : index == questionWithBlanks.length - 1
              ? <Text key={index} className='text-base'>{text}</Text>
              : <Text key={index} className='text-base'>{text} ________ </Text>
        ))}
        <Text className='text-base p-10 text-center'>
          {formattedQuestion}
        </Text>
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