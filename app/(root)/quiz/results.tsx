import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useUser } from '@clerk/clerk-expo'
import { quiz } from '@/courses/AcidBaseQuiz'
import { updateQuizProgress } from '@/lib/quiz'

const results = () => {
  const { score, topic, answer, totalQuestions } = useGlobalSearchParams();
  const scoreInt = score ? parseInt(score as string, 10) : 0;
  const totalQuestionsInt = totalQuestions ? parseInt(totalQuestions as string, 10): 0;
  console.log(score,topic,answer,totalQuestions)
  console.log(typeof answer)
  const { user } = useUser()
  const userClerkId = user?.id

  let answerArray: any = null;
    if (typeof answer === 'string') {
      answerArray = JSON.parse(answer);
    } else if (Array.isArray(answer)) {
      answerArray = JSON.parse(answer[0]);
    }
  console.log(typeof answerArray)
  console.log(answerArray)
    return (
    <SafeAreaView>
      <ScrollView>

      <Text className='text-[25px] font-bold self-center'>You scored {scoreInt} out of {totalQuestionsInt}</Text>

      {quiz.map((question, questionindex) => {
        const userAnswer = answerArray ? answerArray[questionindex] : [];
        const answerStyle = 'p-3 font-light text-md'

        return(
          question.questionType === 'Multiple Choice' || question.questionType === 'Binary'
          ? (<View key={questionindex} className='items-center mt-3'>
            <Text className='font-medium ml-3 mt-3 text-lg'>{question.question}</Text>

            {question.options.map((option, optionindex) => { 
              const isSelected = userAnswer.userAnswer === option;
              const isCorrect = userAnswer.userAnswer === question.correctAnswer && isSelected;
              const isIncorrect = userAnswer.userAnswer !== question.correctAnswer && isSelected
              
              
              return(
                <View key={optionindex} className={`w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3 ${
                  isCorrect
                  ? 'bg-[#95f671]'
                  : isIncorrect 
                    ? 'bg-[#f68181]'
                    : 'bg-transparent'
                }`}>
                  <Text className='text-lg font-light ml-6'>{option}</Text>
                </View>
              )
            })}
            <Text className={`${answerStyle}`}>Answer: {question.correctAnswer}</Text>
            <Text className={`${answerStyle}`}>Explaination: {question.explanation}</Text>
          </View>)
          : (
            <View key={questionindex} className='items-center mt-3'>
              <Text className='font-light text-lg p-3'>{question.question}</Text>
              <Text className='text-2xl font-medium p-3'>Your Answer: {userAnswer.userAnswer}</Text>
              <Text className={`${answerStyle}`}>Answer: {question.correctAnswer} </Text>
              <Text className={`${answerStyle}`}>Explaination: {question.explanation}</Text>
            </View>
          )
        )
      })}

      <TouchableOpacity 
        className='w-11/12 h-[47px] rounded-[10px] self-center items-center justify-center mt-3 bg-[#A8C4FF]' 
        onPress={() => {updateQuizProgress(totalQuestionsInt, scoreInt, userClerkId); router.replace('/quiz') }}>
        <Text>Finish</Text>
      </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  ) 
}

export default results