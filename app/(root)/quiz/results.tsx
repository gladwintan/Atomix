import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

import { quiz } from '@/courses/AcidBaseQuiz'
import { updateQuizProgress } from '@/lib/quiz'

const results = () => {
  const { Score, Topic, Answer, Totalquestions } = useGlobalSearchParams();
  const Score1 = Score ? parseInt(Score as string, 10) : 0;
  const Totalquestions1 = Totalquestions ? parseInt(Totalquestions as string, 10): 0;

  const { user } = useUser()
  const userClerkId = user?.id

  let Answer1: any = null;
    if (typeof Answer === 'string') {
        Answer1 = JSON.parse(Answer);
    } else if (Array.isArray(Answer)) {
        Answer1 = JSON.parse(Answer[0]);
    }
    return (
    <SafeAreaView>
      <Text className='text-[25px] font-bold self-center'>You scored {Score1} out of {Totalquestions1}</Text>

      {quiz.map((question, index) => {
        const userAnswer = Answer1 ? Answer1[index] : [];

        return(
          <View key={index} className='items-center mt-3'>
            <Text key={index} className='font-medium ml-3 mt-3 text-lg'>{question.text}</Text>

            {question.options.map((options, optionsindex) => { 
              return(
                <View key={optionsindex} className={userAnswer.userAnswer == options && userAnswer.userAnswer == question.correctAnswer 
                  ? 'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3 bg-[#95f671]' 
                  : userAnswer.userAnswer == options && userAnswer.userAnswer != question.correctAnswer 
                    ? 'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3 bg-[#f68181]' 
                    : question.correctAnswer == options 
                      ? 'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3 bg-[#95f671]'
                      : 'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3'}>
                  <Text key={optionsindex} className='text-lg font-light ml-6'>{options}</Text>
                </View>
              )
            })}
          </View>
        )
      })}
      <TouchableOpacity 
        className='w-11/12 h-[47px] rounded-[10px] self-center items-center justify-center mt-3 bg-[#A8C4FF]' 
        onPress={() => {updateQuizProgress(Totalquestions1, Score1, userClerkId); router.replace('/quiz/leaderboard') }}>
        <Text>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  ) 
}

export default results