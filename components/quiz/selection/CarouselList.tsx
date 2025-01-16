import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, useAnimatedValue, SafeAreaView } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedScrollHandler, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { OngoingQuiz } from '@/types/type';
import { getQuizByCompletionStatus } from '@/lib/quiz';

import CarouselCard from './CarouselCard';
import { useUser } from '@clerk/clerk-expo';


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

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  const { width } = Dimensions.get('window');

  return (
      <View className='items-center'>
        {onGoingQuiz && onGoingQuiz.length > 0 
        ? (<Animated.FlatList
          data={onGoingQuiz || []}
          horizontal
          renderItem={({ item, index }) => {

            const scale = interpolate(
              scrollX.value, 
              [(index - 1) * width,
              index * width,
              (index + 1) * width,], 
              [0.9, 1, 0.9], 
              'clamp'
            );

            return (
              <Animated.View className='bg-[#C8DAFF] h-[200px] w-[375px] rounded-[20px] mt-3 items-center justify-center ' style={[{ transform: [{ scale }] }]}>
                <CarouselCard item={item}/>
              </Animated.View>  
              );
            }}
            onScroll={scrollHandler}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
          />) 
        : (
          <View className='bg-[#C8DAFF] h-[200px] w-[375px] rounded-[20px] mt-3 items-center justify-center'>
            <Text className='font-sans font-bold text-lg'>No Quiz started</Text>
          </View>
          )}
      </View>
  );
};

export default CarouselList