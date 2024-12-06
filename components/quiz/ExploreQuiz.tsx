import { FlatList, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { useUser } from '@clerk/clerk-expo'
import ExploreQuizCard from './ExploreQuizCard'
import { ExploreQuizType } from '@/types/type'
import { startNewQuiz } from '@/lib/quiz'

const ExploreCourses = ({ exploreQuiz} : { exploreQuiz: ExploreQuizType[]}) => {

  const { user } = useUser()
  const userClerkId = user?.id

  return (
    <FlatList
      data={exploreQuiz}
      renderItem={({ item }) => 
        <ExploreQuizCard 
          quizTopic={item.quiz_topic}
          description={item.description}
          totalquestion={item.total_question }
          completionStatus={item.completionStatus} 
          //@ts-ignore
          onPress={() => {router.push(`/quiz/${item.quiz_topic.split(" ").join("-").toLowerCase()}`); startNewQuiz(item.quiz_topic, userClerkId)}}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View className='pt-4'/>}
      scrollEnabled={false}
    />
  )
}

export default ExploreCourses