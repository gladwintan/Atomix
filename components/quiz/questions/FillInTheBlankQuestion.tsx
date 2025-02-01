import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { QuestionType } from '@/types/type'

const FillInTheBlankQuestion = ({currentQuestion, onPress}:{currentQuestion: QuestionType, onPress: (userAnswer:string) => void}) => {
    
  const [userAnswer, setUserAnswer] = useState('');

  return (
    <View >
      <Text className='justify-center text-[18px] font-sans p-3'>{currentQuestion.question}</Text>
      <TextInput 
        className='outline outline-1 bg-gray-200 p-3 m-3 rounded-[10px]'
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={setUserAnswer}
     />
      <TouchableOpacity className='items-center' onPress={() => onPress(userAnswer.trim().toLowerCase())}>
        <Text>Submit Answer</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FillInTheBlankQuestion