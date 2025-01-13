import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox  from 'react-native-bouncy-checkbox'

import { QuestionType, UserProgress } from '@/types/type';
import { quiz } from '@/courses/AcidBaseQuiz';

const MultipleResponseQuestion = (
{ currentQuestion, onPress } 
: 
{ currentQuestion: QuestionType, onPress: (selectedAnswer: string) => void }
) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); 
  const handleAnswerSelection = (id: number) => {
    setSelectedAnswer(id); 
  };

  useEffect(() => {
    setSelectedAnswer(null)
  }, [currentQuestion])

  return (
    <View className='items-center'>
      <Text className='justify-center text-[18px] font-sans p-3'>{currentQuestion.question}</Text>
      {currentQuestion.options.map((options, index) => ( 
        <TouchableOpacity
          key={index}
          className={selectedAnswer == index ?  'w-11/12 h-[47px] rounded-[10px] items-center border-2 flex-row mt-3 border-[#AFC6F6]' :  'w-11/12 h-[47px] rounded-[10px] items-center border-2 border-black flex-row mt-3'}
          onPress={() => {handleAnswerSelection(index); onPress(options)}} 
        >
          <Text className='text-lg font-light ml-6'>{options}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultipleResponseQuestion