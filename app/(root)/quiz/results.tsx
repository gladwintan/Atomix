import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useUser } from '@clerk/clerk-expo'
import { quiz } from '@/courses/AcidBaseQuiz'
import { updateQuizProgress } from '@/lib/quiz'

const results = () => {
  const { score, topic, answer, totalQuestions, quizId, progress } = useGlobalSearchParams();
  const scoreInt = score ? parseInt(score as string, 10) : 0;
  const totalQuestionsInt = totalQuestions ? parseInt(totalQuestions as string, 10): 0;
  const quizIdInt = score ? parseInt(quizId as string, 10) : 0;
  const progressInt = score ? parseInt(progress as string, 10) : 0;

  const { user } = useUser()
  const userClerkId = user?.id

  let answerArray: any = null;
    if (typeof answer === 'string') {
      answerArray = JSON.parse(answer);
    } else if (Array.isArray(answer)) {
      answerArray = JSON.parse(answer[0]);
    }
  
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
                    : question.correctAnswer == option && 'bg-[#95f671]'
                }`}>
                  <Text className='text-lg font-light ml-6'>{option}</Text>
                </View>
              )
            })}
            <View className='w-11/12'>
              <Text className={`${answerStyle}`}>Explaination: {question.explanation}</Text>
            </View>
            <View className='bg-black h-[2px] w-4/5'></View>
          </View>)
          : (
            <View key={questionindex} className='items-center mt-3'>
              <Text className='font-medium ml-3 mt-3 text-lg'>{question.question}</Text>
              
              <View className='bg-[#FF4646] opacity-50 rounded-[10px] flex-1'>  
                <Text className='text-2xl font-medium p-3'>Your Answer: {userAnswer.userAnswer}</Text>
              </View>
              
              <Text className={`${answerStyle}`}>Answer: {question.correctAnswer} </Text>
              <View className='w-11/12'>
                <Text className={`${answerStyle}`}>Explaination: {question.explanation}</Text>
              </View>
              <View className='bg-black h-[2px] w-4/5'></View>
            </View>
          )
        )
      })}

      <TouchableOpacity 
        className='w-11/12 h-[47px] rounded-[10px] self-center items-center justify-center mt-3 bg-[#A8C4FF]' 
        onPress={() => {updateQuizProgress(scoreInt, progressInt, quizIdInt, userClerkId); router.replace('/quiz') }}>
        <Text>Finish</Text>
      </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  ) 
}

export default results