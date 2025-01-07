import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { SelectQuizType } from '@/types/type'
import QuizSelectionCard from './QuizSelectionCard'

const QuizSelection = ({quizSelection}: {quizSelection: SelectQuizType[]}) => {
  return (
    <View>
      <FlatList 
      data={quizSelection}
      renderItem={({item}) => {
        if(!item?.quiz_id){
          return null;
        }
        return(
          <QuizSelectionCard item={item} onPress={() => {
            if(item.quiz_id){
              router.push('/quiz/topic/acid-base-equilibrium/quiz 1')
            }
          }}/>
        )
      }}
       
      ItemSeparatorComponent={() => <View className='mt-3'/>}
      />
    </View> 
  )
}

export default QuizSelection