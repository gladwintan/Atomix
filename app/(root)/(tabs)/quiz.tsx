import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState,useMemo } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { router } from 'expo-router';

import { ExploreCourse, ExploreQuizType, OngoingCourse, OngoingQuiz } from "@/types/type";
import { getQuizByCompletionStatus, startNewQuiz } from "@/lib/quiz";

import SearchBar from '@/components/quiz/main/SearchBar';
import ExploreQuizCard from '@/components/quiz/main/ExploreQuizCard';
import { ActivityIndicator } from 'react-native';


const quiz = () => {
  const { user } = useUser()
  const userClerkId = user?.id

  const [exploreQuiz, setExploreQuiz] = useState<ExploreQuizType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [onGoingQuiz, setOngoingQuiz] = useState<OngoingQuiz[]>([])
  const [completedQuiz, setCompletedQuiz] = useState<OngoingCourse[] | null>(null)

  useEffect(() => {
    if (userClerkId) {
      const fetchQuiz = async () => {
        const fetchData = await getQuizByCompletionStatus(userClerkId)
        setExploreQuiz(fetchData?.exploreQuiz)
        setLoading(false)

        setOngoingQuiz(fetchData?.ongoingQuiz)  
        setCompletedQuiz(fetchData?.completedQuiz)
      }
      fetchQuiz()
    }
  }, [userClerkId])

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  });
  
  const headerStyle = useAnimatedStyle(() => {
    const headerHeight = interpolate(
      scrollY.value,
      [0,150],
      [200, 50],
      'clamp'
    );
    return{
      height: headerHeight,
    }
  });

  const textStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0,76],
      [76,38],
      'clamp'
    );
    return {
      fontSize: fontSize
    };
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuizzes = useMemo(() => {
    return exploreQuiz.filter((item) =>
      item.course_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [exploreQuiz, searchQuery]);

  return (
    <SafeAreaView >
      {loading == true ? <ActivityIndicator /> :  
        <Animated.FlatList 
          data={searchQuery === '' ? exploreQuiz : filteredQuizzes}
          renderItem={({ item }) => 
            <ExploreQuizCard 
              quizTopic={item.course_name}
              description={item.description}
              totalquizzes={item.quizzes}
              completionStatus={item.completionStatus} 
              //@ts-ignore
              onPress={() => {router.push(`/quiz/topic/${item.course_name.split(" ").join("-").toLowerCase()}`); startNewQuiz(item.quiz_id, userClerkId)}}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View className='mt-3'/>}
          ListHeaderComponent={() => 
              <>
                <Animated.View className='flex-1 rounded-br-[20px] rounded-bl-[20px] bg-[#C8DAFF] justify-center items-center' style={[headerStyle]}>
                  <Animated.Text className='font-bold font-sans' style={[textStyle]}>QUIZ</Animated.Text>
                </Animated.View>
                <SearchBar value={searchQuery} onChangeText={setSearchQuery}/>
              </>
            }
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        />}
    </SafeAreaView>
  )
}

export default quiz