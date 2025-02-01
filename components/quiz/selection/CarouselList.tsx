import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, useAnimatedValue, SafeAreaView, FlatList } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedScrollHandler, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { OngoingQuiz } from '@/types/type';
import { getQuizByCompletionStatus } from '@/lib/quiz';

import CarouselCard from './CarouselCard';
import { useUser } from '@clerk/clerk-expo';
import Carousel from 'react-native-snap-carousel';


const CarouselList = () => {
  
  const { user } = useUser()
  const userClerkId = user?.id

  const [noQuizStarted, setNoQuizStarted] = useState<boolean>()
  const [onGoingQuiz, setOngoingQuiz] = useState<OngoingQuiz[]>([])

  useEffect(() => {
    if (userClerkId) {
      const fetchQuiz = async () => {
        const fetchData = await getQuizByCompletionStatus(userClerkId)
        setNoQuizStarted(fetchData?.noQuizStarted)
        setOngoingQuiz(fetchData?.ongoingQuiz)  
      }
      fetchQuiz();
    }
  }, [userClerkId]);

  return (
      <View className='items-center'>
        {onGoingQuiz && onGoingQuiz.length > 0
        ? (<Carousel 
          data={onGoingQuiz}
          layout={'default'}
          renderItem={(item) => {
            return(
              <CarouselCard item={item.item}/>
            )}}
          sliderWidth={450}
          sliderHeight={450}
          itemWidth={350}
          itemHeight={350}
          />
        ) 
        : (
          <View className='bg-[#C8DAFF] h-[200px] w-[375px] rounded-[20px] mt-3 items-center justify-center'>
            <Text className='font-sans font-bold text-lg'>No Quiz started</Text>
          </View>
          )}
      </View>
  );
};

export default CarouselList