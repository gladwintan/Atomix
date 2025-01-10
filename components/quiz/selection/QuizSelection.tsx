import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { ExploreCourse, ExploreQuizType, SelectQuizType } from '@/types/type'
import QuizSelectionCard from './QuizSelectionCard'
import { quiz } from '@/courses/AcidBaseQuiz'

const QuizSelection = ({quizSelection, exploreCourse}: {quizSelection: SelectQuizType[], exploreCourse: ExploreCourse[]}) => {

  const getQuizRoute = (quizId: number) => {
    const selectedQuiz = quizSelection.find(quiz => quiz.quiz_id === quizId);
    if (selectedQuiz) {
      return `/quiz/topic/${selectedQuiz.course_name.split(' ').join('-').toLowerCase()}/quiz-${quizId}`;
    }
    return '';
  };

  const filteredQuizSelection = quizSelection.filter(item => 
    exploreCourse.some(course => course.id === item.course_id)
  );

  return (
    <View>
      <FlatList 
      data={filteredQuizSelection}
      renderItem={({item}) => {
        const quizRoute = getQuizRoute(item.quiz_id);

        return(       
          <QuizSelectionCard item={item} onPress={() => {
            if (quizRoute) {
              router.push(quizRoute); // Navigate using dynamic route
            }}}/>
        )
      }}
       
      ItemSeparatorComponent={() => <View className='mt-3'/>}
      />
    </View> 
  )
}

export default QuizSelection