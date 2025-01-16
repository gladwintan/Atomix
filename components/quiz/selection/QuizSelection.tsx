import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

import { ExploreCourse, ExploreQuizType, SelectQuizType } from '@/types/type'
import QuizSelectionCard from './QuizSelectionCard'
import { startNewQuiz } from '@/lib/quiz'
import { useUser } from '@clerk/clerk-expo'

const QuizSelection = ({quizSelection, exploreCourse}: {quizSelection: SelectQuizType[], exploreCourse: ExploreCourse[]}) => {

  const { user } = useUser()
  const userClerkId = user?.id

  const [selectedTopic, setSelectedTopic] = useState<string>('Acid-Base Equilibrium')
  const filteredQuizzes = quizSelection.filter(quiz => {
    const course = exploreCourse.find(course => course.course_id === quiz.course_id);
    return course && course?.course_name === selectedTopic;
  })
  
  return (
    <View>
      <FlatList 
      data={filteredQuizzes}
      renderItem={({item}) => {

        return(       
          <QuizSelectionCard item={item} onPress={() => {     
              router.push(`/(root)/quiz/topic/acid-base-equilibrium/quiz-${item.quiz_id}`); startNewQuiz(item.quiz_id, userClerkId) 
            }}/>
        )
      }}
       
      ItemSeparatorComponent={() => <View className='mt-3'/>}
      />
    </View> 
  )
}

export default QuizSelection