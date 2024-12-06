import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox  from 'react-native-bouncy-checkbox'

import { QuizType, UserProgress } from '@/types/type';
import { quiz } from '@/courses/AcidBaseQuiz';

const MultipleResponseQuestion = (
{ currentquestion,
  onPress,
}: { 
  currentquestion: QuizType,
  onPress: (selectedAnswer: string) => void,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); 
  const handleAnswerSelection = (id: number) => {
    setSelectedAnswer(id); // Update selected answer state
  };

  useEffect(() => {
    setSelectedAnswer(null)
  }, [currentquestion])

  return (
    <View className='items-center'>
      {currentquestion.options.map((options, index) => ( 
        <TouchableOpacity
          key={index}
          className={selectedAnswer == index ?  'w-11/12 h-[47px] rounded-[10px] items-center border-2 flex-row mt-3 border-[#AFC6F6]' :  'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3'}
          onPress={() => {handleAnswerSelection(index); onPress(options)}} // Set selected answer
        >
          <Text className='text-lg font-light ml-6'>{options}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultipleResponseQuestion