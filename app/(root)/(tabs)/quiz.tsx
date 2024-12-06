import { View, Text } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'

import { ExploreCourse, ExploreQuizType, OngoingCourse, OngoingQuiz } from "@/types/type";
import { getQuizByCompletionStatus, startNewQuiz } from "@/lib/quiz";
import ExploreQuiz from "@/components/quiz/ExploreQuiz";
import { SafeAreaView } from 'react-native-safe-area-context';
import CarouselList from '@/components/quiz/CarouselList';
import { NavigationContainer } from '@react-navigation/native';


const quiz = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  const [loading, setLoading] = useState(true)
  const [ongoingQuiz, setOngoingQuiz] = useState<OngoingQuiz[]>([])
  const [exploreQuiz, setexploreQuiz] = useState<ExploreQuizType[]>([])

  const [completedQuiz, setCompletedQuiz] = useState<OngoingCourse[] | null>(null)
  const [showCompletedQuiz, setShowCompletedQuiz] = useState(false)

  useEffect(() => {
    if (userClerkId) {
      const fetchQuiz = async () => {
        const fetchData = await getQuizByCompletionStatus(userClerkId)
        setexploreQuiz(fetchData?.exploreQuiz)
        setOngoingQuiz(fetchData?.ongoingQuiz)
        setCompletedQuiz(fetchData?.completedQuiz)
        setLoading(false)
      }
      fetchQuiz()
    }
  }, [userClerkId])

  return (
    <SafeAreaView>
        <CarouselList OngoingQuiz={ongoingQuiz} />
        <ExploreQuiz exploreQuiz={exploreQuiz}/>
    </SafeAreaView>
  )
}

export default quiz