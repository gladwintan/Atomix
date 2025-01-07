import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { router } from 'expo-router'

import { useUser } from '@clerk/clerk-expo'
import CarouselList from '@/components/quiz/selection/CarouselList'
import QuizSelection from '@/components/quiz/selection/QuizSelection'

import { OngoingQuiz, SelectQuizType } from '@/types/type'
import { ExploreQuizType } from '@/types/type'
import { selectQuiz } from '@/lib/quiz'


const index = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  const [noQuizStarted, setNoQuizStarted] = useState<boolean>()
  const [onGoingQuiz, setOngoingQuiz] = useState<OngoingQuiz[]>([])
  const [exploreQuiz, setExploreQuiz] = useState<ExploreQuizType[]>([])
  const [quizSelection, setQuizSelection] = useState<SelectQuizType[]>([])
  
  useEffect(() => {
    if (userClerkId) {
      const fetchQuiz = async () => {
        const fetchData = await selectQuiz(userClerkId)     
        setQuizSelection(fetchData?.selectQuiz)   
      }
      fetchQuiz();
    }
  }, [userClerkId]);
  console.log(exploreQuiz)

  return (
    <SafeAreaView>
      <CarouselList />
      <Text className='mt-16 mb-3 ml-10'>Start Quiz</Text>
      <View className='items-center'>
        <QuizSelection quizSelection={quizSelection} />
      </View>
    </SafeAreaView>
  )
}

export default index