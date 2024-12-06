import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { quiz } from '@/courses/AcidBaseQuiz'
 
interface ResultProps {
  score: number;
  totalQuestions: number;
  userAnswers: string[];
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, userAnswers }) => {
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-[34px] font-bold mb-20'>
        You scored {score} out of {totalQuestions}
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontSize: 16,
    marginVertical: 5,
    color: '',
    fontWeight: 'bold'
  },
  correctOption: {
    fontSize: 16,
    color: 'green', // Correct answer is highlighted in green
    fontWeight: 'bold',
    marginVertical: 5
  },
  incorrectOption: {
    fontSize: 16,
    color: 'red', // Incorrect answer is highlighted in red
    fontWeight: 'bold',
    marginVertical: 5
  },
});

export default Result;